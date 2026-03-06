import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface HemocentrosScreenProps {
  onVoltar?: () => void;
  onAgendar?: (hemocentro: string) => void;
}

const hemocentros = [
  { id: 1, nome: "Hemocentro Central São Paulo", distancia: "1.2 km" },
  { id: 2, nome: "Hemocentro Regional Paulista", distancia: "2.5 km" },
  { id: 3, nome: "Hospital das Clínicas - Banco de Sangue", distancia: "3.0 km" },
  { id: 4, nome: "Hemocentro Santa Casa", distancia: "4.1 km" },
  { id: 5, nome: "Hemocentro Vila Mariana", distancia: "5.3 km" },
  { id: 6, nome: "Centro de Hemoterapia Albert Einstein", distancia: "6.7 km" },
];

export default function HemocentrosScreen({ onVoltar, onAgendar }: HemocentrosScreenProps) {
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

        {/* Lista de Hemocentros - 30px de espaçamento do título */}
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
      </main>
    </div>
  );
}
