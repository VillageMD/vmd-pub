from typing import List
from fastapi import FastAPI
from sqlmodel import select

from db import get_session
from models import User

app = FastAPI()

@app.get("/users")
def list_users() -> List[User]:
    """
    list all users
    """
    with get_session() as sess:
        stmt = select(User)
        return sess.exec(stmt).all()

@app.get("/users/{user_id}")
def get_user(user_id: int) -> User:
    """
    display a single user with ious related to them
    """
    with get_session() as sess:
        stmt = select(User).where(User.id == user_id)
        return sess.exec(stmt).first()

# @app.post("/iou")
# def create_iou(iou: IouIn) -> Iou:
#     ...