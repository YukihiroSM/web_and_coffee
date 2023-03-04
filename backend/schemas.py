from typing import List, Union, Optional
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

class AchievementItem(BaseModel):
    title: str

class PortfolioItem(BaseModel):
    description: str
    link: str

class Portfolio(BaseModel):
	items: List[PortfolioItem]
	show: bool = False
        
class FeedbackItem(BaseModel):
    score: int
    comment: Optional[str]

class ProjectItem(BaseModel):
    title: str
    requirements: List[str]
    feedback: FeedbackItem
    status: str
    rating: int
    description: str
    how_to_apply: str


class UserItem(BaseModel):
    username: str
    first_name: str
    last_name: str
    status: str
    register_datetime: date
    resume: ResumeItem
    skills: List[str]
    portfolio: Portfolio

class User2project(BaseModel):
    project_id: str
    user_id: str
    

