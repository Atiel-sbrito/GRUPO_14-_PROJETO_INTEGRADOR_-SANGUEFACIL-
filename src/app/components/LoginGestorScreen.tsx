import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginGestorScreenProps {
  onVoltar?: () => void;
  onEntrar?: () => void;
}

export default function LoginGestorScreen({ onVoltar, onEntrar }: LoginGestorScreenProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/gestores/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Falha ao fazer login." }));
        setErrorMessage(body.error || "Falha ao fazer login.");
        return;
      }

      const data = await response.json();
      // Armazenar token e dados do gestor
      localStorage.setItem("gestor_token", data.token);
      localStorage.setItem("gestor_data", JSON.stringify(data.gestor));
      
      // Navegar para dashboard
      onEntrar?.();
    } catch (_error) {
      setErrorMessage("Nao foi possivel conectar ao backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header com botão voltar */}
      <div className="p-6">
        <button 
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontWeight: 400 }}
        >
          ← Voltar
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Título */}
          <h1 
            className="text-4xl text-gray-900 mb-3"
            style={{ fontWeight: 600 }}
          >
            Painel SangueFácil
          </h1>

          {/* Texto secundário */}
          <p 
            className="text-gray-600 mb-8"
            style={{ fontWeight: 400 }}
          >
            Acesse sua conta de gestor.
          </p>

          {/* Formulário */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
                {errorMessage}
              </div>
            )}

            {/* Campo Email */}
            <div className="space-y-2">
              <Label 
                htmlFor="email-gestor"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Email
              </Label>
              <Input
                id="email-gestor"
                type="email"
                placeholder="seu.email@hemocentro.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label 
                htmlFor="senha-gestor"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Senha
              </Label>
              <Input
                id="senha-gestor"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={isSubmitting}
                required
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Botão Entrar */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
