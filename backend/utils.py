from itsdangerous import URLSafeTimedSerializer

def compare_skills(given, proposed):
    number = 0
    for skill in proposed:
        number += 1 if skill in given else 0
    return number


def compare_name(given, propose):
    # implement comparison with 2-3 letters wrong (Levenshtain dist or so)
    return given==propose

def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer('SECRET_KEY')
    return serializer.dumps(email, salt='SECURITY_PASSWORD_SALT')

def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer('SECRET_KEY')
    try:
        email = serializer.loads(
            token,
            salt='SECURITY_PASSWORD_SALT',
            max_age=expiration
        )
    except:
        return False
    return email
