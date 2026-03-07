
from fastapi import APIRouter

router = APIRouter(prefix="/hemocentros", tags=["Hemocentros"])

@router.get("/")
def listar():
    return [
        {"nome": "Hemocentro São Paulo", "lat": -23.5505, "lng": -46.6333},
        {"nome": "Hemocentro Campinas", "lat": -22.9056, "lng": -47.0608},
    ]
