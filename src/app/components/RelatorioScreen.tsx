import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RelatorioScreenProps {
  onVoltar?: () => void;
}

const estatisticas = {
  totalAgendamentos: 342,
  doacoesRealizadas: 287,
  taxaConclusao: "84%",
  campanhasAtivas: 3,
};

const campanhasRecentes = [
  { 
    id: 1, 
    titulo: "Urgência O-", 
    data: "01/03/2026", 
    doadores: 45, 
    doacoes: 38,
    status: "Concluída" 
  },
  { 
    id: 2, 
    titulo: "Urgência AB-", 
    data: "28/02/2026", 
    doadores: 32, 
    doacoes: 28,
    status: "Concluída" 
  },
  { 
    id: 3, 
    titulo: "Campanha Março Vermelho", 
    data: "05/03/2026", 
    doadores: 156, 
    doacoes: 142,
    status: "Em andamento" 
  },
];

export default function RelatorioScreen({ onVoltar }: RelatorioScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header */}
      <div className="bg-white border-b p-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onVoltar}
            className="text-gray-600 hover:text-gray-800 mb-2"
            style={{ fontWeight: 400 }}
          >
            ← Voltar ao Dashboard
          </button>
          <h1 
            className="text-4xl text-gray-900"
            style={{ fontWeight: 700 }}
          >
            Relatório de Agendamentos
          </h1>
          <p 
            className="text-gray-600 mt-2"
            style={{ fontWeight: 400 }}
          >
            Veja os resultados das campanhas.
          </p>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2" style={{ fontWeight: 400 }}>
                Total de Agendamentos
              </div>
              <div className="text-3xl text-gray-900" style={{ fontWeight: 700 }}>
                {estatisticas.totalAgendamentos}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2" style={{ fontWeight: 400 }}>
                Doações Realizadas
              </div>
              <div className="text-3xl text-green-600" style={{ fontWeight: 700 }}>
                {estatisticas.doacoesRealizadas}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2" style={{ fontWeight: 400 }}>
                Taxa de Conclusão
              </div>
              <div className="text-3xl text-blue-600" style={{ fontWeight: 700 }}>
                {estatisticas.taxaConclusao}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-gray-600 mb-2" style={{ fontWeight: 400 }}>
                Campanhas Ativas
              </div>
              <div className="text-3xl text-yellow-600" style={{ fontWeight: 700 }}>
                {estatisticas.campanhasAtivas}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Campanhas */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontWeight: 700 }}>Campanhas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 text-gray-600" style={{ fontWeight: 500 }}>
                      Campanha
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontWeight: 500 }}>
                      Data
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontWeight: 500 }}>
                      Doadores Alcançados
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontWeight: 500 }}>
                      Doações
                    </th>
                    <th className="text-left p-3 text-gray-600" style={{ fontWeight: 500 }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {campanhasRecentes.map((campanha) => (
                    <tr key={campanha.id} className="border-b hover:bg-gray-50">
                      <td className="p-3" style={{ fontWeight: 400 }}>
                        {campanha.titulo}
                      </td>
                      <td className="p-3 text-gray-600" style={{ fontWeight: 400 }}>
                        {campanha.data}
                      </td>
                      <td className="p-3 text-gray-600" style={{ fontWeight: 400 }}>
                        {campanha.doadores}
                      </td>
                      <td className="p-3 text-gray-600" style={{ fontWeight: 400 }}>
                        {campanha.doacoes}
                      </td>
                      <td className="p-3">
                        <span 
                          className={`px-3 py-1 rounded-full text-sm ${
                            campanha.status === "Concluída" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}
                          style={{ fontWeight: 500 }}
                        >
                          {campanha.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Botão Gerar Relatório */}
        <div className="mt-8 text-center">
          <Button
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-6"
            style={{ fontWeight: 500 }}
          >
            Gerar Relatório Automático (PDF)
          </Button>
        </div>
      </main>
    </div>
  );
}
