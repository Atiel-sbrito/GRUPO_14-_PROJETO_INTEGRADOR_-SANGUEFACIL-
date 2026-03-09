import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface HemocentrosScreenProps {
  doadorToken?: string;
  onVoltar?: () => void;
  onAgendar?: (hemocentro: string) => void;
}

interface Hemocentro {
  id: number;
  nome: string;
  distancia: string;
}

interface MeuAgendamento {
  id: number;
  hemocentro: string;
  data: string;
  horario: string;
}

export default function HemocentrosScreen({ doadorToken, onVoltar, onAgendar }: HemocentrosScreenProps) {
  const [hemocentros, setHemocentros] = useState<Hemocentro[]>([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState<MeuAgendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [meuNome, setMeuNome] = useState("");

  useEffect(() => {
    const rawDoador = localStorage.getItem("doador_data");
    if (rawDoador) {
      try {
        const doador = JSON.parse(rawDoador);
        setMeuNome(doador?.nome || "");
      } catch {
        setMeuNome("");
      }
    }

    async function fetchHemocentros() {
      try {
        const [hemocentrosRes, meusRes] = await Promise.all([
          fetch("http://localhost:3001/api/hemocentros"),
          fetch("http://localhost:3001/api/doadores/me/agendamentos", {
            headers: { Authorization: `Bearer ${doadorToken || ""}` },
          }),
        ]);

        if (!hemocentrosRes.ok) {
          setErrorMessage("Falha ao carregar hemocentros.");
          return;
        }

        const data = await hemocentrosRes.json();
        setHemocentros(data);

        if (meusRes.ok) {
          const meusData = await meusRes.json();
          setMeusAgendamentos(Array.isArray(meusData) ? meusData : []);
        }
      } catch (_error) {
        setErrorMessage("Nao foi possivel conectar ao backend.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHemocentros();
  }, [doadorToken]);

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

        {meuNome ? (
          <p className="text-sm text-gray-500 mt-2" style={{ fontWeight: 400 }}>
            Logado como: {meuNome}
          </p>
        ) : null}

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

        {!isLoading && !errorMessage ? (
          <div className="mt-10">
            <h2 className="text-2xl text-gray-900 mb-3" style={{ fontWeight: 700 }}>
              Meus Agendamentos
            </h2>

            {meusAgendamentos.length === 0 ? (
              <p className="text-gray-600" style={{ fontWeight: 400 }}>
                Voce ainda nao possui agendamentos.
              </p>
            ) : (
              <div className="space-y-3">
                {meusAgendamentos.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>
                        #{item.id} - {item.hemocentro}
                      </p>
                      <p className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                        Data: {item.data} | Horario: {item.horario}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}
