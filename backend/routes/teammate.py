from fastapi import APIRouter, Request

router = APIRouter(prefix="/api/team")


@router.get('/')
def find_team(skills: [str], request: Request):
    # find in database users by the same skills
    # workaround for now, get all users and check check skills
    result = []
    users = request.app.database.users.find_all()
    for user in users:
        proposed_skills = user.get_skills()
        matches = compare_skills(skills, proposed_skills)
        if matches > 0:
            result.append(tuple(matches, user))

    result.sort(reverse=True)
    return result


def compare_skills(given, proposed):
    number = 0
    for skill in proposed:
        number += 1 if skill in given else 0
    return number
