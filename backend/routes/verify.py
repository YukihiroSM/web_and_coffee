from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from utils import confirm_token

router = APIRouter(prefix='/verify')


@router.get('/')
def confirm_application(token: str, request: Request):
    value = confirm_token(token).split("~")
    username = value[0]
    project_id = value[1]

    user_projects = request.app.database.user2project.find()

    for project in user_projects:
        if project['username'] == username:
            request.app.database.user2project.update_one(
                {"_id": project["_id"]},
                {"$set": {"approved": True}}
            )
    resp = {
        "data": user_projects,
        "username": username
    }
    return JSONResponse(jsonable_encoder(resp), status_code=200)



