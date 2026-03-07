
from fastapi import APIRouter

router = APIRouter(prefix="/doacoes", tags=["Doações"])

@router.get("/ranking")
def ranking():
    return [
        {"nome": "João", "doacoes": 12},
        {"nome": "Maria", "doacoes": 9},
        {"nome": "Pedro", "doacoes": 7},
    ]
