import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AgendamentoScreenProps {
  hemocentro?: string;
  onVoltar?: () => void;
  onConfirmar?: () => void;
}

export default function AgendamentoScreen({ hemocentro, onVoltar, onConfirmar }: AgendamentoScreenProps) {
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
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onConfirmar?.(); }}>
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
                defaultValue={hemocentro || ""}
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
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Botão Confirmar - 30px abaixo */}
            <div className="pt-[30px]">
              <Button
                type="submit"
                className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Confirmar Agendamento
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
