from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

import jwt_auth

router = APIRouter(prefix='/api/achievement')


@router.get('/')
def get_achievements(request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            decoded_jwt = jwt_auth.decode_jwt(authorization)
            user_query = {"username": decoded_jwt["username"]}
            achievements = request.app.database.achievements.find_all(user_query)
            return {"achievements": achievements}
        except Exception:
            return JSONResponse({"message": "Logout failed"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)
