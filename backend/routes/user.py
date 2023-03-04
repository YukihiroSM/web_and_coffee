import hashlib
import pickle
from datetime import date

from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import jwt_auth
from schemas import AuthItem, UserItem, User2project

router = APIRouter(prefix="/api/user")


@router.post("/login")
@router.options("/login")
async def login_user(login_data: AuthItem, request: Request):
    user_query = jsonable_encoder(login_data)
    username_query = {"username": user_query["username"]}
    user = request.app.database.users.find_one(username_query)
    if user:
        if jwt_auth.verify_password(user["password"], user_query["password"]):
            encoded_jwt = jwt_auth.get_encoded_jwt(user_query)
            set_jwt = {"$set": {"token": encoded_jwt}}
            request.app.database.users.update_one(user_query, set_jwt)
            return JSONResponse({'token': encoded_jwt, "id": str(user["_id"])},
                                status_code=200)
        else:
            return JSONResponse({'message': 'Login failed. Wrong password.'}, status_code=400)
    else:
        return JSONResponse({'message': 'Login failed. User not found.'}, status_code=404)


@router.post("/register")
@router.options("/register")
async def register_user(register_data: AuthItem, request: Request):
    user_query = jsonable_encoder(register_data)
    existing_user = request.app.database.users.find_one({"username": user_query["username"]})
    if existing_user:
        return {"message": "User already exists"}

    hashed_password = hashlib.sha256(user_query["password"].encode()).hexdigest()
    encoded_jwt = jwt_auth.get_encoded_jwt(user_query)

    user_query["password"] = hashed_password
    user_query["token"] = encoded_jwt

    request.app.database.users.insert_one(user_query)
    user = request.app.database.users.find_one(user_query)
    return {'token': encoded_jwt, "id": str(user.get("_id"))}


@router.post("/logout")
@router.options("/logout")
async def logout_user(request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            decoded_jwt = jwt_auth.decode_jwt(authorization)
            user_query = {"username": decoded_jwt["username"]}
            request.app.database.users.update_one(user_query, {"$unset": {"token": ""}})
            return {"token": decoded_jwt}
        except Exception:
            return JSONResponse({"message": "Logout failed"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)


@router.post("/resume")
async def create_user_resume():
    pass

@router.get("/open_to_work")
def get_users_to_hire(request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            user_query = {"status": "true"}  # FIXME can be another value
            users = request.app.database.users.find_all(user_query)
            return {"users": users}
        except Exception:
            return JSONResponse({"message": "Logout failed"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)


@router.post("/userinfo")
async def add_userinfo(user_data: UserItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    auth_query = {"username": decoded_jwt["username"]}

    user_query = jsonable_encoder(user_data)
    user_query["username"]= auth_query["username"]
    user_query['register_datetime'] = date.today()
    
    request.app.database.users.insert_one(user_query)
    user = request.app.database.users.find_one(user_query)
    return JSONResponse({"token": authorization, "id": str(user["_id"])}, status_code=200)


@router.post("/${id}/projects")
async def user_projects(user_data: UserItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    result = []
    user_query = jsonable_encoder(user_data)
    us2pr = request.app.database.user2project.find_all(user_query)
    for item in us2pr:
        project_title = item.title
        project_query = {"title":project_title }
        project = request.app.database.projects.find_one(project_query) 
        result.append(project)
    user = request.app.database.users.find_one(user_query)

    resp = {"projects": result,
            "token": authorization, 
            "id": str(user["_id"])}
    return JSONResponse(resp, status_code=200)