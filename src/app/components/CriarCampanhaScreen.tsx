import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface CriarCampanhaScreenProps {
  onVoltar?: () => void;
  onEnviar?: () => void;
}

export default function CriarCampanhaScreen({ onVoltar, onEnviar }: CriarCampanhaScreenProps) {
  const [titulo, setTitulo] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/campanhas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          tipo_sanguineo: tipoSanguineo,
          descricao,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Falha ao criar campanha." }));
        setErrorMessage(body.error || "Falha ao criar campanha.");
        return;
      }

      setSuccessMessage("Campanha criada com sucesso!");
      // Limpar formulário
      setTitulo("");
      setTipoSanguineo("");
      setDescricao("");
      
      // Voltar ao dashboard após sucesso
      setTimeout(() => {
        onEnviar?.();
      }, 1500);
    } catch (_error) {
      setErrorMessage("Nao foi possivel conectar ao backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header com botão voltar */}
      <div className="p-6 border-b">
        <button 
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontWeight: 400 }}
        >
          ← Voltar ao Dashboard
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Título */}
          <h1 
            className="text-4xl text-gray-900 mb-3"
            style={{ fontWeight: 600 }}
          >
            Nova Campanha de Urgência
          </h1>

          {/* Texto secundário */}
          <p 
            className="text-gray-600 mb-8"
            style={{ fontWeight: 400 }}
          >
            Crie um alerta para doadores com os tipos sanguíneos em falta.
          </p>

          {/* Formulário */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                {successMessage}
              </div>
            )}

            {/* Campo Titulo */}
            <div className="space-y-2">
              <Label 
                htmlFor="titulo"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Título da Campanha
              </Label>
              <Input
                id="titulo"
                placeholder="Ex: Urgente: Sangue O- necessário"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                disabled={isSubmitting}
                required
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Tipo Sanguíneo */}
            <div className="space-y-2">
              <Label 
                htmlFor="tipo-sanguineo"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Tipo Sanguíneo em Falta
              </Label>
              <select
                id="tipo-sanguineo"
                value={tipoSanguineo}
                onChange={(e) => setTipoSanguineo(e.target.value)}
                disabled={isSubmitting}
                required
                className="w-full p-2 border rounded-md"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                <option value="">Selecione um tipo</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Campo Descrição */}
            <div className="space-y-2">
              <Label 
                htmlFor="descricao"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Descrição da Urgência
              </Label>
              <Textarea
                id="descricao"
                placeholder="Ex: Paciente em cirurgia de emergência necessita doação imediata"
                rows={6}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                disabled={isSubmitting}
                className="resize-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Preview da Mensagem */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700" style={{ fontWeight: 400 }}>
                ⚠️ Esta mensagem será enviada para todos os doadores cadastrados via email e notificação push.
              </p>
            </div>

            {/* Botão Enviar */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isSubmitting ? "Criando..." : "Criar Campanha"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
