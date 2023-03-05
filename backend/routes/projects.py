from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

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
    request.app.database.users.insert_one(project_query)
    collect_stats(user_query["username"], request)
    project = request.app.database.projects.insert_one(project_query)
    trigger_events(project, request)
    return JSONResponse({"id": str(project["_id"])}, status_code=201)


def trigger_events(project: ProjectItem, request: Request):
    skills = project['skills']
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
        achievement = Achievement(username, 1)
    else:
        achievement.number += 1
    achievement_query = jsonable_encoder(achievement)
    request.app.database.achievements.insert_one(achievement_query)


@router.post("/${project_id}")
async def delete_project(project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project_query = jsonable_encoder(project_data)
    if project_query['admin'] != user_query['username']:
        return {"message": "You have no rights to change status of project. You have to be admin for that!"}

    project_query['status'] = 'CANCELLED'

    request.app.database.users.update_one(project_query)
    project = request.app.database.users.find_one(project_query)
    return JSONResponse({"id": str(project["_id"])}, status_code=200)

@router.post("/${project_id}")
async def get_project_info(project_data: ProjectItem, request: Request):
    project_query = jsonable_encoder(project_data)
    pr2us = request.app.database.user2project.find_one(project_query["title"])

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

@router.post("/${project_id}/apply_to_project")
async def apply_to_project(project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    project_query = jsonable_encoder(project_data)

    proj_and_user_query = {"username": decoded_jwt["username"], "title": project_query["title"], "approved":False}
    request.app.database.user2project.insert_one(proj_and_user_query)

    send_verification_email(project_query["admin"], decoded_jwt["username"])

    resp = {
        "user": decoded_jwt["username"],
        "project": project_query["title"]
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

    send_verification_email(newuser_query["username"], newuser_query["username"])

    resp = {
        "user": decoded_jwt["username"],
        "project": project_query["title"]
    }
    return JSONResponse(resp, status_code=200)

@router.post('/verify/<token>')
def confirm_application(request: Request, project_data: ProjectItem, token: str):
    project_query = jsonable_encoder(project_data)
    username = confirm_token(token)

    user_projects = request.app.database.user2project.find_one(username)

    for project in user_projects:
        if project.title == project_query["title"]:
            project.approved = True
            request.app.database.user2project.update_one(project)
    resp = {
        "data": user_projects,
        "username": username
    }
    return JSONResponse(resp, status_code=200)



