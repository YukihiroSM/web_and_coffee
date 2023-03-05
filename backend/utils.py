from itsdangerous import URLSafeTimedSerializer
from Levenshtein import distance as lev


def compare_skills(given, proposed):
    number = 0
    for skill in proposed:
        number += 1 if skill in given else 0
    return number


def compare_name(given, propose):
    return lev(given,propose) < 3


def generate_confirmation_token(email, project_id):
    serializer = URLSafeTimedSerializer('SECRET_KEY')
    return serializer.dumps(email + "~" + str(project_id), salt='SECURITY_PASSWORD_SALT')


def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer('SECRET_KEY')
    try:
        value = serializer.loads(
            token,
            salt='SECURITY_PASSWORD_SALT',
            max_age=expiration
        )
    except:
        return False
    return value
