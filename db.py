from sqlmodel import SQLModel, create_engine, Session
import models

ENGINE = create_engine("sqlite:///iou.db", echo=False)

def create_tables():
    SQLModel.metadata.create_all(ENGINE)

def get_session():
    return Session(ENGINE)