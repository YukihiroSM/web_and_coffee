import os

import certifi
import pymongo.errors
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from routes import user

ca = certifi.where()

SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

app = FastAPI()
app.include_router(user.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(
        'mongodb+srv://cooking-db-admin:lh5zLcAz3HYIOwWD@cookingprocluster.jwyfoeq.mongodb.net/?retryWrites=true&w=majority',
        tlsCAFile=ca
    )
    app.database = app.mongodb_client.pm_db


@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()


@app.get("/health")
def health():
    return {"status": "ok"}
