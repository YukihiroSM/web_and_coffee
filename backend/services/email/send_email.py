from fastapi import APIRouter, Request
from fastapi.encoders import jsonable_encoder
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from starlette.responses import JSONResponse
from schemas import ProjectItem

# from dotenv import load_dotenv
# load_dotenv('.env')

from utils import generate_confirmation_token

conf = ConnectionConfig(
    MAIL_SERVER = 'smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USERNAME= "noreply.test222@gmail.com",
    MAIL_PASSWORD= "ibxgnthlisddcbty",
    MAIL_STARTTLS = False,
    MAIL_SSL_TLS = True,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True,
    MAIL_FROM = "noreply.test222@gmail.com"
)

router = APIRouter()

async def send_verification_email(email_receiver, applicant_email, request: Request):
    token = generate_confirmation_token(applicant_email)
    url = request.url._url.split("/")[:3]
    confirm_url = '/'.join(url)+f'/verify/{token}'

    print('/'.join(x))

    html = """<p>Hi! Follow the link below to confirm membership of {applicant_email} in the project.</p> 
            <p><a href= {confirm_url}> {confirm_url}</a></p>"""


    message = MessageSchema(
        subject="Application Confirmation",
        recipients=[email_receiver],
        body=html,
        subtype=MessageType.html,
        )

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})


async def send_project_email(project: ProjectItem, email: str):
    project_query = jsonable_encoder(project)
    title = project_query['title']
    description = project_query['description']
    html = """<p>Hi! There is a new project {title}, which matches your skills! Consider joining it :)
            Description: {description}"""
    
    message = MessageSchema(
        subject="New Project",
        recipients=[email],
        body=html,
        subtype=MessageType.html,
        )

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})
    
