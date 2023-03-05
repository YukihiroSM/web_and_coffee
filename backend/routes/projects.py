from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from bson.objectid import ObjectId


import jwt_auth
from schemas import ProjectItem, Achievement, UserItem
from services.subscription.trigger import send_notifications_on_event

from services.email.send_email import send_verification_email
from utils import confirm_token

router = APIRouter(prefix="/api/project")


@router.post("/")
async def create_project(project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project_query = jsonable_encoder(project_data)

    existing_project = request.app.database.projects.find_one({"title": project_query["title"]})
    if existing_project:
        return {"message": "Project already exists"}
    project_query['status'] = 'NOT STARTED'

    project_query["admin"] = user_query["username"]
    project_query["skills"] = project_data.requirements
    request.app.database.projects.insert_one(project_query)
    # collect_stats(user_query["username"], request)
    # trigger_events(project_query, request)
    return JSONResponse({"id": str(project_query["_id"]), "title": project_query["title"]}, status_code=201)


def trigger_events(project: ProjectItem, request: Request):
    skills = project['requirements']
    subscriptions = request.app.database.subscriptions.find()
    emails = []
    for subscription in subscriptions:
        uni = skills.union(subscription["skills"])
        if len(uni) > 0:
            emails.append(subscription["user_email"])
    send_notifications_on_event(project, emails)


def collect_stats(username: str, request: Request):
    achievement = request.app.database.achievements.find_one({"username": username})
    if achievement is None:
        achievement = Achievement(username=username, number=1)
        achievement = jsonable_encoder(achievement)
        request.app.database.achievements.insert_one(achievement)
    else:
        achievement["number"] += 1
        request.app.database.achievements.update({"username": username}, {"number": achievement["number"]})


@router.delete("/{project_id}")
async def delete_project(project_id: str, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project = request.app.database.projects.find_one({"_id": ObjectId(project_id)})
    if project["admin"] != user_query['username']:
        return {"message": "You have no rights to change status of project. You have to be admin for that!"}

    request.app.database.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": {"status": "CANCELLED"}}
    )
    project = request.app.database.projects.find_one({"_id": ObjectId(project_id)})
    return JSONResponse({"id": str(project["_id"])}, status_code=200)


@router.get("/${project_id}")
async def get_project_info(project_data: ProjectItem, request: Request):
    project_query = jsonable_encoder(project_data)
    pr2us = request.app.database.user2project.find_one(project_query["title"])

    if pr2us is None:
        return JSONResponse({"message": "Entity was not found."}, status_code=404)

    members = []
    for item in pr2us:
        if item.approved:
            user_query = {"username": item.username}
            user = request.app.database.users.find_one(user_query) 
            members.append(user)
        
    resp = {"members": members,
            "project": project_query["title"]}
    return JSONResponse(resp, status_code=200)


@router.get("/get_projects")
async def show_projects(request: Request,
                       page: int = 0, perPage: int = 12):

    data = request.app.database.projects.find()
    data_to_process = data[page * perPage: (page + 1) * perPage]

    resp = {
        "data": data_to_process,
        "metadata": {"total": len(data)}
    }
    return JSONResponse(resp, status_code=200)


@router.patch("/${project_id}")
async def change_status(status: str, project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project_query = jsonable_encoder(project_data)
    if project_query['admin'] != user_query['username']:
        return {"message": "You have no rights to change status of project. You have to be admin for that!"}
    
    project_query['status']= status

    request.app.database.users.update_one(project_query)
    project = request.app.database.projects.find_one(project_query)
    return JSONResponse({"token": decoded_jwt, "id": str(project["_id"])},status_code=200)


@router.post("/{project_id}/apply_to_project")
async def apply_to_project(project_id: str, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)

    project = request.app.database.projects.find_one({"_id": ObjectId(project_id)})

    proj_and_user_query = {
        "username": decoded_jwt["username"],
        "title": project["title"],
        "approved": False
    }
    request.app.database.user2project.insert_one(proj_and_user_query)

    await send_verification_email(project["admin"], decoded_jwt["username"], project["_id"], request)

    resp = {
        "user": decoded_jwt["username"],
        "project": project["title"]
    }
    return JSONResponse(resp, status_code=200)


@router.post("/${project_id}/invite_to_project")
async def add_member(user2invite: UserItem, project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)

    user_query = {"username": decoded_jwt["username"]}
    project_query = jsonable_encoder(project_data)
    newuser_query = jsonable_encoder(user2invite)

    if project_query['admin'] != user_query['username']:
        return {"message": "You have no rights to invite users to project. You have to be admin for that!"}

    proj_and_user_query = {"username": newuser_query["username"], "title": project_query["title"], "approved":False}
    request.app.database.user2project.insert_one(proj_and_user_query)

    await send_verification_email(newuser_query["username"], newuser_query["username"], project_query["_id"], request)

    resp = {
        "user": decoded_jwt["username"],
        "project": project_query["title"]
    }
    return JSONResponse(resp, status_code=200)

