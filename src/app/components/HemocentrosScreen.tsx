import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface HemocentrosScreenProps {
  onVoltar?: () => void;
  onAgendar?: (hemocentro: string) => void;
}

interface Hemocentro {
  id: number;
  nome: string;
  distancia: string;
}

export default function HemocentrosScreen({ onVoltar, onAgendar }: HemocentrosScreenProps) {
  const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchHemocentros() {
      try {
        const response = await fetch("http://localhost:3001/api/hemocentros");
        if (!response.ok) {
          setErrorMessage("Falha ao carregar hemocentros.");
          return;
        }
        const data = await response.json();
        setHemocentros(data);
      } catch (_error) {
        setErrorMessage("Nao foi possivel conectar ao backend.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHemocentros();
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header com botão voltar */}
      <div className="p-6 border-b">
        <button 
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontWeight: 400 }}
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className="container mx-auto px-6 py-8">
        {/* Título */}
        <h1 
          className="text-4xl text-gray-900"
          style={{ fontWeight: 700 }}
        >
          Hemocentros próximos
        </h1>

        {/* Texto secundário */}
        <p 
          className="text-lg text-gray-600 mt-3"
          style={{ fontWeight: 400 }}
        >
          Agende sua doação de forma rápida e segura.
        </p>

        {/* Loading state */}
        {isLoading ? (
          <div className="mt-[30px] text-center">
            <p className="text-gray-600" style={{ fontWeight: 400 }}>
              Carregando hemocentros...
            </p>
          </div>
        ) : null}

        {/* Error state */}
        {errorMessage ? (
          <div className="mt-[30px]">
            <p className="text-red-600" style={{ fontWeight: 400 }}>
              {errorMessage}
            </p>
          </div>
        ) : null}

        {/* Lista de Hemocentros - 30px de espaçamento do título */}
        {!isLoading && !errorMessage ? (
          <div className="mt-[30px] space-y-5">
            {hemocentros.map((hemocentro) => (
            <Card key={hemocentro.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 
                      className="text-xl text-gray-900 mb-2"
                      style={{ fontWeight: 400 }}
                    >
                      {hemocentro.nome}
                    </h3>
                    <p 
                      className="text-gray-500"
                      style={{ fontWeight: 400 }}
                    >
                      📍 {hemocentro.distancia}
                    </p>
                  </div>
                  <Button
                    onClick={() => onAgendar?.(hemocentro.nome)}
                    className="bg-[#FBC02D] hover:bg-[#F9A825] text-white px-6 py-5"
                    style={{ fontWeight: 500 }}
                  >
                    Agendar Doação
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        ) : null}
      </main>
    </div>
  );
}
