import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CadastroScreenProps {
  onVoltar?: () => void;
}

export default function CadastroScreen({ onVoltar }: CadastroScreenProps) {
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
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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
                placeholder="Digite uma senha segura"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Botão Cadastrar - vermelho, texto branco, 24px abaixo */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Cadastrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
