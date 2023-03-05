from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

# from dotenv import load_dotenv
# load_dotenv('.env')


# class Envs:
#     MAIL_USERNAME = os.getenv('MAIL_USERNAME')
#     MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
#     MAIL_FROM = os.getenv('MAIL_FROM')
#     MAIL_PORT = int(os.getenv('MAIL_PORT'))
#     MAIL_SERVER = os.getenv('MAIL_SERVER')
#     MAIL_FROM_NAME = os.getenv('MAIN_FROM_NAME')


conf = ConnectionConfig(
    MAIL_USERNAME="username",
    MAIL_PASSWORD="aatvetouqlositsj",
    MAIL_FROM="omeluan.dima@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="mail server",
    MAIL_FROM_NAME="Desired Name",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)


# def send_email_background(background_tasks: BackgroundTasks, subject: str, email_to: str, body: dict):
#     message = MessageSchema(
#         subject=subject,
#         recipients=[email_to],
#         body=body,
#         subtype='html',
#     )

#     fm = FastMail(conf)

#     background_tasks.add_task(
#         fm.send_message, message, template_name='email.html')

def send_verification_email(email_receiver, applicant_email):
    pass
#     token = generate_confirmation_token(user_email)
#     confirm_url = url_for('auth.confirm_email', token=token, _external=True)
#     html = render_template('verify_email.html', confirm_url=confirm_url)
#     subject = "Please confirm your email"
#     send_email(user_email, subject, html)

# def send_email(to, subject, template):
#     mail.init_app(current_app)
#     msg = Message(subject, recipients=[to], html=template, sender=current_app.config['MAIL_USERNAME'])
#     mail.send(msg)
#     print("sent email to "+str(to))