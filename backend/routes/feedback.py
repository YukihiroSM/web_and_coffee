from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from schemas import FeedbackItem

router = APIRouter(prefix='/api/feedback')


@router.get('/{project_id}')
def get_feedback_by_project(project_id: str, request: Request):
    feedback_query = {"project_id": project_id}
    feedbacks = request.app.database.feedbacks.find_all(feedback_query)
    return feedbacks


@router.post('/')
def create_feedback(feedback: FeedbackItem, request: Request):
    feedback_query = jsonable_encoder(feedback)
    request.app.database.feedbacks.insert_one(feedback_query)
    return JSONResponse({"message": "Feedback was created successfully."})
