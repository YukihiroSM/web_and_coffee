from datetime import date
from typing import List, Optional

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
    admin: str
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
    position: str


class User2project(BaseModel):
    title: str
    username: str
    approved: bool = False


class Achievement(BaseModel):
    username: str
    number: int


class Subscription(BaseModel):
    user_email: str
    skills: List[str]

class Blog(BaseModel):
    title: str
    author: str
    content: str
    topics: List[str]
