from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import jwt_auth
from schemas import ProjectItem, Blog
from utils import confirm_token

router = APIRouter(prefix="/api/blogs")

@router.post("/")
async def publish_post(blog_data: Blog, request: Request):
    authorization = jwt_auth.get_authorisation(request)
    decoded_jwt = jwt_auth.decode_jwt(authorization)
    user_query = {"username": decoded_jwt["username"]}

    blog_query = jsonable_encoder(blog_data)

    existing_post = request.app.database.projects.find_one({"title": blog_query["title"]})
    if existing_post:
        return {"message": "Blog name already exists"}
    
    blog_query["author"] = user_query["username"]
    request.app.database.users.insert_one(blog_query)
    
    return JSONResponse({"blog": blog_query}, status_code=201)


@router.get("/")
async def show_blogs(request: Request,
                       page: int = 0, perPage: int = 12):

    data = request.app.database.blog.find()
    data_to_process = data[page * perPage: (page + 1) * perPage]

    resp = {
        "data": data_to_process,
        "metadata": {"total": len(data)}
    }
    return JSONResponse(resp, status_code=200)

@router.get("/${blog_id}")
async def get_blog_info(blog_title: Blog, request: Request):
    blog = request.app.database.blog.find_one(blog_title)

    resp = {"blog": blog}
    return JSONResponse(resp, status_code=200)