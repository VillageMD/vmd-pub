from pydantic import BaseModel
from sqlmodel import Field, SQLModel

class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    
class Iou(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    lender_id: int = Field(default=None, foreign_key="user.id")
    borrower_id: int = Field(default=None, foreign_key="user.id")
    amount: int