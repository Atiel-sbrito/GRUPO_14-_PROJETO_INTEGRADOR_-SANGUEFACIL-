
from fastapi import APIRouter

router = APIRouter(prefix="/campanhas", tags=["Campanhas"])

@router.get("/")
def listar():
    return [
        {"hospital": "Hospital Central", "campanha": "Doe Sangue Salve Vidas"},
        {"hospital": "Hospital Vida", "campanha": "Campanha Julho Vermelho"},
    ]
