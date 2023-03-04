from typing import List, Union

from pydantic import BaseModel


class AuthItem(BaseModel):
    username: str
    password: str