import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginGestorScreenProps {
  onVoltar?: () => void;
  onEntrar?: () => void;
}

export default function LoginGestorScreen({ onVoltar, onEntrar }: LoginGestorScreenProps) {
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
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onEntrar?.(); }}>
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
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Botão Entrar */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#1976D2] hover:bg-[#1565C0] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
