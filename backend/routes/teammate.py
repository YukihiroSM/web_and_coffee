from typing import List

from fastapi import APIRouter, Request

from utils import compare_skills

router = APIRouter(prefix="/api")


# FIXME (in the future) this method sucks
@router.get('/search_for_members')
def find_team(skills: List[str], request: Request):
    return find(skills, request)


@router.get('/{project_id}/search_for_members')
def find_team_by_project_id(project_id: str, request: Request):
    project_query = {"_id": project_id}
    project = request.app.database.projects.find_one(project_query)

    skills = project['skills']
    return find(skills, request)


def find(skills, request: Request):
    result = []
    users = request.app.database.users.find_all()
    for user in users:
        proposed_skills = user['skills']
        matches = compare_skills(skills, proposed_skills)
        if matches > 0:
            result.append((matches, user))

    result.sort(reverse=True)
    return result
