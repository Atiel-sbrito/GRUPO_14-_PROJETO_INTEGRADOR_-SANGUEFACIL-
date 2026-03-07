
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import users, hemocentros, doacoes, campanhas
from database import criar_tabela_avaliacoes

app = FastAPI(title="SangueFácil API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(hemocentros.router)
app.include_router(doacoes.router)
app.include_router(campanhas.router)

@app.get("/")
def root():
    return {"message": "SangueFácil API funcionando"}
