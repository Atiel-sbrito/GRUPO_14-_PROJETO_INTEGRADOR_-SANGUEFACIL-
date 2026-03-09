import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AgendamentoScreenProps {
  hemocentro?: string;
  onVoltar?: () => void;
  onConfirmar?: () => void;
}

export default function AgendamentoScreen({ hemocentro, onVoltar, onConfirmar }: AgendamentoScreenProps) {
  const [hemocentroValue, setHemocentroValue] = useState(hemocentro || "");
  const [dataValue, setDataValue] = useState("");
  const [horarioValue, setHorarioValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hemocentro: hemocentroValue,
          data: dataValue,
          horario: horarioValue,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Falha ao agendar." }));
        setErrorMessage(body.error || "Falha ao agendar.");
        return;
      }

      onConfirmar?.();
    } catch (_error) {
      setErrorMessage("Nao foi possivel conectar ao backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
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
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Título */}
          <h1 
            className="text-4xl text-gray-900 mb-3"
            style={{ fontWeight: 600 }}
          >
            Agende sua doação
          </h1>

          {/* Texto secundário */}
          <p 
            className="text-gray-600 mb-8"
            style={{ fontWeight: 400 }}
          >
            Escolha o melhor horário para você.
          </p>

          {/* Formulário */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Campo Hemocentro - espaçamento de 20px */}
            <div className="space-y-2">
              <Label 
                htmlFor="hemocentro"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Hemocentro
              </Label>
              <Input
                id="hemocentro"
                type="text"
                value={hemocentroValue}
                onChange={(e) => setHemocentroValue(e.target.value)}
                placeholder="Selecione o hemocentro"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Data - espaçamento de 20px */}
            <div className="space-y-2">
              <Label 
                htmlFor="data"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Data
              </Label>
              <Input
                id="data"
                type="date"
                value={dataValue}
                onChange={(e) => setDataValue(e.target.value)}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Horário - espaçamento de 20px */}
            <div className="space-y-2">
              <Label 
                htmlFor="horario"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Horário
              </Label>
              <Input
                id="horario"
                type="time"
                value={horarioValue}
                onChange={(e) => setHorarioValue(e.target.value)}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {errorMessage ? (
              <p className="text-sm text-red-600" style={{ fontWeight: 400 }}>
                {errorMessage}
              </p>
            ) : null}

            {/* Botão Confirmar - 30px abaixo */}
            <div className="pt-[30px]">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isSubmitting ? "Confirmando..." : "Confirmar Agendamento"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
