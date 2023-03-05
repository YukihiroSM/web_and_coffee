from typing import List

from fastapi import APIRouter, Request

from schemas import ProjectItem
from utils import compare_skills, compare_name

router = APIRouter(prefix="/api/projects")


@router.get("/skills")  # FIXME fix endpoint
def search_by_skills(skills: List[str], request: Request):
    projects: List[ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_skills = project["skills"]
        matches = compare_skills(skills, project_skills)
        if matches > 0:
            result.append((matches, project))

    result.sort(reverse=True)  # FIXME check if we can sort tuples
    return result


@router.get("/name")  # FIXME fix endpoint
def search_by_name(name: str, request: Request):
    projects: List[ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_name = project["name"]
        matches = compare_name(name, project_name)
        if matches > 0:
            result.append((matches, project))

    result.sort(reverse=True)
    return result


@router.get("/score")  # FIXME fix endpoint
def search_by_score(score: int, request: Request):
    projects: List[ProjectItem] = request.app.database.projects.find_all()
    result = []
    for project in projects:
        project_score = project["score"]
        if project_score >= score:
            result.append(project)

    result.sort(reverse=True)
    return result
