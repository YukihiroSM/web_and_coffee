from typing import List, Union
from datetime import date
from pydantic import BaseModel


class AuthItem(BaseModel):
    username: str
    password: str


class ExperienceItem(BaseModel):
    company: str
    position: str
    start: date
    end: date
    employment: str
    place: str
    description: str


class EducationItem(BaseModel):
    title: str
    degree: str
    place: str
    start: str
    end: str


class ResumeItem(BaseModel):
    about: str
    skills: List[str]
    experience: List[ExperienceItem]
    education: List[EducationItem]
    contact: str
