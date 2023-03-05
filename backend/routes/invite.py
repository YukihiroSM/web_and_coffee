from fastapi import APIRouter
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from starlette.responses import JSONResponse

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


# @router.get("/invite")
# async def simple_send() -> JSONResponse:
#     html = """<p>Hi this test mail, thanks for using Fastapi-mail</p> """

#     message = MessageSchema(
#         subject="Fastapi-Mail module",
#         recipients=["dima.omelyan03@gmail.com"],
#         body=html,
#         subtype=MessageType.html)

#     fm = FastMail(conf)
#     await fm.send_message(message)
#     return JSONResponse(status_code=200, content={"message": "email has been sent"})
