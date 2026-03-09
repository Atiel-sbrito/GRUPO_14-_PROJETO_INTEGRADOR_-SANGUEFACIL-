import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface RelatorioScreenProps {
  onVoltar?: () => void;
}

interface Agendamento {
  id: number;
  hemocentro: string;
  data: string;
  horario: string;
}

interface Campanha {
  id: number;
  titulo: string;
  tipo_sanguineo: string;
  created_at: string;
}

const estoqueAtual = [
  { tipo: "A+", quantidade: 45, status: "Normal" },
  { tipo: "A-", quantidade: 12, status: "Baixo" },
  { tipo: "B+", quantidade: 38, status: "Normal" },
  { tipo: "B-", quantidade: 8, status: "Critico" },
  { tipo: "AB+", quantidade: 22, status: "Normal" },
  { tipo: "AB-", quantidade: 5, status: "Critico" },
  { tipo: "O+", quantidade: 52, status: "Normal" },
  { tipo: "O-", quantidade: 15, status: "Baixo" },
];

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("pt-BR");
}

export default function RelatorioScreen({ onVoltar }: RelatorioScreenProps) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      setErrorMessage("");
      setIsLoading(true);
      try {
        const [agendamentosRes, campanhasRes] = await Promise.all([
          fetch("http://localhost:3001/api/agendamentos"),
          fetch("http://localhost:3001/api/campanhas"),
        ]);

        if (!agendamentosRes.ok || !campanhasRes.ok) {
          setErrorMessage("Falha ao carregar dados do relatorio.");
          return;
        }

        const [agendamentosData, campanhasData] = await Promise.all([
          agendamentosRes.json(),
          campanhasRes.json(),
        ]);

        setAgendamentos(Array.isArray(agendamentosData) ? agendamentosData : []);
        setCampanhas(Array.isArray(campanhasData) ? campanhasData : []);
      } catch (_error) {
        setErrorMessage("Nao foi possivel conectar ao backend.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const estatisticas = useMemo(() => {
    const totalAgendamentos = agendamentos.length;
    const doacoesRealizadas = totalAgendamentos;
    const taxaConclusao = totalAgendamentos > 0 ? "100%" : "0%";
    const campanhasAtivas = campanhas.length;
    return {
      totalAgendamentos,
      doacoesRealizadas,
      taxaConclusao,
      campanhasAtivas,
    };
  }, [agendamentos, campanhas]);

  const campanhasRecentes = useMemo(
    () => campanhas.slice(0, 10),
    [campanhas],
  );

  async function handleGerarPdf() {
    setIsGeneratingPdf(true);
    setErrorMessage("");

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });

      let y = 14;
      const lineHeight = 7;
      const pageHeight = 285;

      function nextLine() {
        y += lineHeight;
        if (y > pageHeight) {
          doc.addPage();
          y = 14;
        }
      }

      function writeLine(text: string, bold = false) {
        doc.setFont("helvetica", bold ? "bold" : "normal");
        doc.text(text, 14, y);
        nextLine();
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("Relatorio Automatico - SangueFacil", 14, y);
      y += 10;

      doc.setFontSize(11);
      writeLine(`Gerado em: ${new Date().toLocaleString("pt-BR")}`);
      writeLine(`Total de agendamentos: ${estatisticas.totalAgendamentos}`);
      writeLine(`Doacoes realizadas: ${estatisticas.doacoesRealizadas}`);
      writeLine(`Taxa de conclusao: ${estatisticas.taxaConclusao}`);
      writeLine(`Campanhas ativas: ${estatisticas.campanhasAtivas}`);
      nextLine();

      writeLine("Estoque por tipo sanguineo", true);
      estoqueAtual.forEach((item) => {
        writeLine(`- ${item.tipo}: ${item.quantidade} unidades (${item.status})`);
      });
      nextLine();

      writeLine("Proximos agendamentos", true);
      if (agendamentos.length === 0) {
        writeLine("- Nenhum agendamento encontrado.");
      } else {
        agendamentos.slice(0, 25).forEach((item) => {
          writeLine(`- #${item.id} | ${item.hemocentro} | ${item.data} ${item.horario}`);
        });
      }
      nextLine();

      writeLine("Campanhas recentes", true);
      if (campanhasRecentes.length === 0) {
        writeLine("- Nenhuma campanha encontrada.");
      } else {
        campanhasRecentes.forEach((item) => {
          writeLine(`- #${item.id} | ${item.titulo} | ${item.tipo_sanguineo} | ${formatDate(item.created_at)}`);
        });
      }

      const filename = `relatorio-sanguefacil-${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(filename);
    } catch (_error) {
      setErrorMessage("Falha ao gerar PDF automaticamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }

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
        {errorMessage ? (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
            {errorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="text-center text-gray-600 mb-6" style={{ fontWeight: 400 }}>
            Carregando dados do relatorio...
          </div>
        ) : null}

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
                        {formatDate(campanha.created_at)}
                      </td>
                      <td className="p-3 text-gray-600" style={{ fontWeight: 400 }}>
                        -
                      </td>
                      <td className="p-3 text-gray-600" style={{ fontWeight: 400 }}>
                        -
                      </td>
                      <td className="p-3">
                        <span 
                          className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                          style={{ fontWeight: 500 }}
                        >
                          Em andamento
                        </span>
                      </td>
                    </tr>
                  ))}
                  {campanhasRecentes.length === 0 ? (
                    <tr>
                      <td className="p-3 text-gray-500" colSpan={5} style={{ fontWeight: 400 }}>
                        Nenhuma campanha encontrada.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Botão Gerar Relatório */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleGerarPdf}
            disabled={isGeneratingPdf || isLoading}
            className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-6"
            style={{ fontWeight: 500 }}
          >
            {isGeneratingPdf ? "Gerando PDF..." : "Gerar Relatório Automático (PDF)"}
          </Button>
        </div>
      </main>
    </div>
  );
}
