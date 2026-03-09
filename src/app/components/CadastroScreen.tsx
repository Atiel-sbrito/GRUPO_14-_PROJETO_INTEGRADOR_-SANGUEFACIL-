import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CadastroScreenProps {
  onVoltar?: () => void;
}

export default function CadastroScreen({ onVoltar }: CadastroScreenProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/doadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          idade: Number(idade),
          email,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Falha ao cadastrar." }));
        setErrorMessage(body.error || "Falha ao cadastrar.");
        return;
      }

      setSuccessMessage("Cadastro realizado com sucesso!");
      setNome("");
      setIdade("");
      setEmail("");
      setSenha("");
    } catch (_error) {
      setErrorMessage("Nao foi possivel conectar ao backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header com botão voltar */}
      <div className="p-6">
        <button 
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
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
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            Crie sua conta
          </h1>

          {/* Texto secundário */}
          <p 
            className="text-gray-600 mb-8"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Preencha seus dados para começar a doar.
          </p>

          {/* Formulário */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Campo Nome - espaçamento de 16px */}
            <div className="space-y-2">
              <Label 
                htmlFor="nome"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Nome
              </Label>
              <Input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome completo"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Idade - espaçamento de 16px */}
            <div className="space-y-2">
              <Label 
                htmlFor="idade"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Idade
              </Label>
              <Input
                id="idade"
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Digite sua idade"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Email - espaçamento de 16px */}
            <div className="space-y-2">
              <Label 
                htmlFor="email"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Campo Senha - espaçamento de 16px */}
            <div className="space-y-2">
              <Label 
                htmlFor="senha"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite uma senha segura"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Mensagens de erro/sucesso */}
            {errorMessage ? (
              <p className="text-sm text-red-600" style={{ fontWeight: 400 }}>
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="text-sm text-green-600" style={{ fontWeight: 400 }}>
                {successMessage}
              </p>
            ) : null}

            {/* Botão Cadastrar - vermelho, texto branco, 24px abaixo */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
