from typing import List

from fastapi import APIRouter, Request

from schemas import UserItem
from utils import compare_skills

router = APIRouter(prefix="/api/team")


# Note: it shouldn't be authorized request
# it means not registered user could search teammates,
# but only registered do some operations
@router.get('/')
def find_team(skills: [str], request: Request):
    # find in database users by the same skills
    # workaround for now, get all users and check check skills
    result = []
    users: [UserItem] = request.app.database.users.find_all()
    for user in users:
        user_properties = ...  # (**user.dict())
        proposed_skills: List[str] = user_properties['skills']
        matches = compare_skills(skills, proposed_skills)
        if matches > 0:
            result.append(tuple(matches, user))

    result.sort(reverse=True)
    return result
