from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder


import jwt_auth
from schemas import ResumeItem

router = APIRouter(prefix='/api/user')


@router.post('/create_resume')
def create_resume(resume: ResumeItem, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            decoded_jwt = jwt_auth.decode_jwt(authorization)
            resume.username = decoded_jwt["username"]
            resume_query = jsonable_encoder(resume)
            request.app.database.resumes.insert_one(resume_query)
            return JSONResponse({"message": "Resume was created successfully"}, status_code=201)
        except Exception:
            return JSONResponse({"message": "Error occurred"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)


@router.get('/get_resume')
def create_resume(request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            decoded_jwt = jwt_auth.decode_jwt(authorization)
            resume_query = {"username": decoded_jwt["username"]}
            resume = request.app.database.resumes.find_one(resume_query)
            resume.pop("_id")
            return JSONResponse(jsonable_encoder(resume), status_code=201)
        except Exception:
            return JSONResponse({"message": "Error occurred"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)