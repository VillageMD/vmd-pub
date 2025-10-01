from fastapi.testclient import TestClient
import pytest
from sqlmodel import MetaData, Session, select, text

from sqlmodel import SQLModel, create_engine

from db import ENGINE, get_session
from main import app
from models import Iou, User

TEST_CLIENT = TestClient(app)

@pytest.fixture(autouse=True, scope="session")
def db_lifecycle():
    SQLModel.metadata.create_all(ENGINE)
    yield
    SQLModel.metadata.drop_all(ENGINE)

@pytest.fixture(autouse=True, scope="function")
def db_cleaner():
    yield
    with ENGINE.connect() as connection:
        with connection.begin() as transaction:
            try:
                # Disable foreign key constraints for SQLite
                connection.execute(text("PRAGMA foreign_keys = OFF;"))

                # Reflect the database schema
                metadata = MetaData()
                metadata.reflect(bind=ENGINE)

                tables = reversed(metadata.sorted_tables)

                for table in tables:
                    connection.execute(table.delete())
                    print(f"Truncated table: {table.name}")

                connection.execute(text("PRAGMA foreign_keys = ON;"))
            
            except Exception as e:
                print(f"An error occurred: {e}")
                transaction.rollback()
                raise
            else:
                transaction.commit()

async def test_list_users():
    user = User(name="PersonA")
    with get_session() as sess:
        sess.add(user)
        sess.commit()
        sess.refresh(user)

    resp = TEST_CLIENT.get("/users")

    assert resp.json() == {
        "users": [
            user.model_dump()
        ]
    }


def test_get_user():
    user = User(name="PersonA")
    with get_session() as sess:
        sess.add(user)
        sess.commit()
        sess.refresh(user)
    
    resp = TEST_CLIENT.get(f"/users/{user.id}")
    assert resp.json() == {
        "user": {
            **user.model_dump(),
            "credits": [],
            "debts": []
        }
    }

def test_create_iou():
    user1 = User(name="PersonA")
    user2 = User(name="PersonB")
    loan_amount = 1
    with get_session() as sess:
        sess.add_all([user1, user2])
        sess.commit()
        sess.refresh(user1)
        sess.refresh(user2)

    iou_in = Iou(
        lender=user1,
        borrower=user2,
        amount=loan_amount
    )
    TEST_CLIENT.post("/iou", data=iou_in.model_dump())
    user1_resp = TEST_CLIENT.get(f"/users/{user1.id}")
    user2_resp = TEST_CLIENT.get(f"/users/{user2.id}")

    assert user1_resp.json() == {
        "user": {
            **user1.model_dump(),
            "credits": [
                {
                    "borrower_id": user2.id,
                    "amount": loan_amount
                }
            ],
            "debts": [],
        }
    }
    
    user2_resp.json() == {
        "user": {
            **user2.model_dump(),
            "credits": [],
            "debts": [
                {
                    "lender_id": user1.id,
                    "amount": loan_amount
                }
            ],
        }
    }