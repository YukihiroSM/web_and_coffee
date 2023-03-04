from fastapi import APIRouter, Request

from schemas import ProjectItem
from utils import compare_skills, compare_name

router = APIRouter(prefix="/api/projects/")


@router.get("/skills")
def search_by_skills(skills: [str], request: Request):
    projects: [ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_skills = ...  # get skills from project
        matches = compare_skills(skills, project_skills)
        if matches > 0:
            result.append((matches, project))

    result.sort(reverse=True)
    return result


@router.get("/name")
def search_by_name(name: str, request: Request):
    projects: [ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_name = ...  # get name from project
        matches = compare_name(name, project_name)
        if matches > 0:
            result.append((matches, project))

    result.sort(reverse=True)
    return result


@router.get("/score")
def search_by_score(score: int, request: Request):
    projects: [ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_score = ...  # get score from project
        if project_score >= score:
            result.append(project)

    result.sort(reverse=True)
    return result
