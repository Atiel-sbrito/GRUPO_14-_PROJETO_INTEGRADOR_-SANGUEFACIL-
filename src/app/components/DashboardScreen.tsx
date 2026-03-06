import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface DashboardScreenProps {
  onVoltar?: () => void;
  onCriarCampanha?: () => void;
  onVerRelatorio?: () => void;
}

const agendamentos = [
  { id: 1, nome: "João Silva", data: "15/03/2026", horario: "09:00", hemocentro: "Hemocentro Central" },
  { id: 2, nome: "Maria Santos", data: "15/03/2026", horario: "10:30", hemocentro: "Hemocentro Regional" },
  { id: 3, nome: "Pedro Costa", data: "16/03/2026", horario: "14:00", hemocentro: "Hemocentro Central" },
  { id: 4, nome: "Ana Oliveira", data: "16/03/2026", horario: "15:30", hemocentro: "Santa Casa" },
];

const estoqueAtual = [
  { tipo: "A+", quantidade: 45, status: "normal" },
  { tipo: "A-", quantidade: 12, status: "baixo" },
  { tipo: "B+", quantidade: 38, status: "normal" },
  { tipo: "B-", quantidade: 8, status: "crítico" },
  { tipo: "AB+", quantidade: 22, status: "normal" },
  { tipo: "AB-", quantidade: 5, status: "crítico" },
  { tipo: "O+", quantidade: 52, status: "normal" },
  { tipo: "O-", quantidade: 15, status: "baixo" },
];

export default function DashboardScreen({ onVoltar, onCriarCampanha, onVerRelatorio }: DashboardScreenProps) {
  const getStatusColor = (status: string) => {
    if (status === "crítico") return "bg-red-100 text-red-700";
    if (status === "baixo") return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <button 
              onClick={onVoltar}
              className="text-gray-600 hover:text-gray-800 mb-2"
              style={{ fontWeight: 400 }}
            >
              ← Sair
            </button>
            <h1 
              className="text-4xl text-gray-900"
              style={{ fontWeight: 700 }}
            >
              Estoque Atual
            </h1>
            <p 
              className="text-gray-600 mt-2"
              style={{ fontWeight: 400 }}
            >
              Visualize estatísticas e agendamentos.
            </p>
          </div>
          <Button
            onClick={onCriarCampanha}
            className="bg-[#E53935] hover:bg-[#D32F2F] text-white px-6 py-6"
            style={{ fontWeight: 500 }}
          >
            Criar Campanha de Urgência
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card de Estoque */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontWeight: 700 }}>Estoque por Tipo Sanguíneo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {estoqueAtual.map((item) => (
                  <div key={item.tipo} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-900" style={{ fontWeight: 700 }}>
                        {item.tipo}
                      </div>
                      <div className="text-gray-600" style={{ fontWeight: 400 }}>
                        {item.quantidade} unidades
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(item.status)}`} style={{ fontWeight: 500 }}>
                      {item.status === "crítico" ? "Crítico" : item.status === "baixo" ? "Baixo" : "Normal"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card de Agendamentos */}
          <Card>
            <CardHeader>
              <CardTitle style={{ fontWeight: 700 }}>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agendamentos.map((agendamento) => (
                  <div key={agendamento.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-semibold text-gray-900" style={{ fontWeight: 500 }}>
                        {agendamento.nome}
                      </div>
                      <div className="text-sm text-gray-500" style={{ fontWeight: 400 }}>
                        {agendamento.horario}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                      📅 {agendamento.data}
                    </div>
                    <div className="text-sm text-gray-600" style={{ fontWeight: 400 }}>
                      📍 {agendamento.hemocentro}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão Ver Relatório */}
        <div className="mt-8 text-center">
          <Button
            onClick={onVerRelatorio}
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-6"
            style={{ fontWeight: 500 }}
          >
            Ver Relatório Completo
          </Button>
        </div>
      </main>
    </div>
  );
}
