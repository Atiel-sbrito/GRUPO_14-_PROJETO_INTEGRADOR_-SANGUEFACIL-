
from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
def register():
    return {"message": "Usuário registrado"}

@router.post("/login")
def login():
    return {"token": "fake-jwt-token"}
