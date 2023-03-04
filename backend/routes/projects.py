from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from schemas import ProjectItem, FeedbackItem
import jwt_auth

router = APIRouter(prefix="/api/project")

@router.post("/create")
@router.options("/create")
async def create_project(project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project_query = jsonable_encoder(project_data)

    existing_project = request.app.database.users.find_one({"title": project_query["title"]})
    if existing_project:
        return {"message": "Project already exists"}
    project_query['status']= 'NOT STARTED'
    
    project_query["admin"] = user_query["username"]
    request.app.database.users.insert_one(project_query)
    project = request.app.database.users.find_one(project_query)
    return JSONResponse({"id": str(project["_id"])},status_code=200)

@router.post("/[project_id]/delete")
@router.options("/delete")

async def delete_project(project_data: ProjectItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    project_query = jsonable_encoder(project_data)
    if project_query['admin'] != user_query['username']:
        return {"message": "You have no rights to change status of project. You have to be admin for that!"}
    
    project_query['status']= 'CANCELLED'

    request.app.database.users.insert_one(project_query)
    project = request.app.database.users.find_one(project_query)
    return JSONResponse({"id": str(project["_id"])},status_code=200)
