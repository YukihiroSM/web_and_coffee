from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import jwt_auth

router = APIRouter(prefix='/api/achievement')


@router.get('/')
def get_achievements(request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            decoded_jwt = jwt_auth.decode_jwt(authorization)
            username = decoded_jwt["username"]
            data = request.app.database.achievements.find_one({"username": username})
            response = {"data": data["number"]}
            return JSONResponse(jsonable_encoder(response), status_code=200)
        except Exception:
            return JSONResponse({"message": "Error occurred"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)
