from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import jwt_auth
from schemas import Subscription

router = APIRouter(prefix='/api/subscribe')


@router.post('/')
def subscribe(subscription: Subscription, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    if authorization:
        try:
            subscription_query = jsonable_encoder(subscription)
            request.app.database.subscriptions.insert_one(subscription_query)
            return {"message": "User was subscribed successfully."}
        except Exception:
            return JSONResponse({"message": "Logout failed"}, status_code=500)
    else:
        return JSONResponse({"message": "User not authorised!"}, status_code=401)

