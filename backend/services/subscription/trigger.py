from typing import List

from schemas import ProjectItem
from services.email.send_email import send_project_email


async def send_notifications_on_event(project: ProjectItem, emails: List[str]):
    for email in emails:
        await send_project_email(project, email)