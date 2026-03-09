import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface DoadorAuthResult {
  token: string;
  doador: {
    id: number;
    nome: string;
    email: string;
    idade: number;
  };
}

interface LoginDoadorScreenProps {
  onVoltar?: () => void;
  onEntrar?: (auth: DoadorAuthResult) => void;
  onIrParaCadastro?: () => void;
}

export default function LoginDoadorScreen({ onVoltar, onEntrar, onIrParaCadastro }: LoginDoadorScreenProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/api/doadores/login", {
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
      localStorage.setItem("doador_token", data.token);
      localStorage.setItem("doador_data", JSON.stringify(data.doador));
      onEntrar?.(data);
    } catch (_error) {
      setErrorMessage("Nao foi possivel conectar ao backend.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-6">
        <button
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
        >
          ← Voltar
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1
            className="text-4xl text-gray-900 mb-3"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Entrar como Doador
          </h1>

          <p
            className="text-gray-600 mb-8"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
          >
            Faça login para acessar os postos e seus agendamentos.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {errorMessage ? (
              <p className="text-sm text-red-600" style={{ fontWeight: 400 }}>
                {errorMessage}
              </p>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="email-doador" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                Email
              </Label>
              <Input
                id="email-doador"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                disabled={isSubmitting}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha-doador" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                Senha
              </Label>
              <Input
                id="senha-doador"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
                disabled={isSubmitting}
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
              />
            </div>

            <div className="pt-6 space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>

              <Button
                type="button"
                onClick={onIrParaCadastro}
                className="w-full bg-white border-2 border-[#FBC02D] text-[#FBC02D] hover:bg-[#FBC02D] hover:text-white py-6"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
              >
                Ainda nao tenho conta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
