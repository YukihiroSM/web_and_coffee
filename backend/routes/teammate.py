from typing import List

from fastapi import APIRouter, Request

from utils import compare_skills

router = APIRouter(prefix="/api/team")


# FIXME (in the future) this method sucks
@router.get('/')
def find_team(skills: List[str], request: Request):
    result = []
    users = request.app.database.users.find_all()
    for user in users:
        proposed_skills = user['skills']
        matches = compare_skills(skills, proposed_skills)
        if matches > 0:
            result.append((matches, user))

    result.sort(reverse=True)
    return result
