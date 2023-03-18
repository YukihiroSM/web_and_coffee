import certifi
import pymongo.errors
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from routes import invite, projects, achievements, feedback, resume, search, subscription, teammate, verify
from routes import user
from services.pdf import save_pdf

ca = certifi.where()

SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(invite.router)
app.include_router(save_pdf.router)
app.include_router(projects.router)
app.include_router(achievements.router)
app.include_router(feedback.router)
app.include_router(resume.router)
app.include_router(search.router)
app.include_router(subscription.router)
app.include_router(teammate.router)
app.include_router(verify.router)





@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(
        'mongodb+srv://cooking-db-admin:lh5zLcAz3HYIOwWD@cookingprocluster.jwyfoeq.mongodb.net/?retryWrites=true&w=majority',
        tlsCAFile=ca
    )
    app.database = app.mongodb_client.pm_db
    try:
        app.database.create_collection("users")
    except pymongo.errors.CollectionInvalid:
        pass
    try:
        app.database.create_collection("projects")
    except pymongo.errors.CollectionInvalid:
        pass

    try:
        app.database.create_collection("achievements")
    except pymongo.errors.CollectionInvalid:
        pass


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/health")
def health():
    return {"status": "ok"}
