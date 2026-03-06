import { Button } from "./ui/button";

interface FeedbackScreenProps {
  onVoltar?: () => void;
  onCompartilhar?: () => void;
}

export default function FeedbackScreen({ onVoltar, onCompartilhar }: FeedbackScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Header com botão voltar */}
      <div className="p-6">
        <button 
          onClick={onVoltar}
          className="text-gray-600 hover:text-gray-800"
          style={{ fontWeight: 400 }}
        >
          ← Voltar ao Início
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* Ícone de sucesso */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto">
              <span className="text-6xl text-white">✓</span>
            </div>
          </div>

          {/* Título */}
          <h1 
            className="text-5xl text-gray-900 mb-4"
            style={{ fontWeight: 700 }}
          >
            Obrigado pela sua doação!
          </h1>

          {/* Texto secundário */}
          <p 
            className="text-2xl text-gray-700 mb-10"
            style={{ fontWeight: 400 }}
          >
            Sua doação ajudou 3 pessoas.
          </p>

          {/* Informação adicional */}
          <p 
            className="text-lg text-gray-600 mb-8"
            style={{ fontWeight: 400 }}
          >
            Você fez a diferença! Compartilhe sua experiência e inspire outras pessoas a doar sangue.
          </p>

          {/* Botão Compartilhar */}
          <Button
            onClick={onCompartilhar}
            className="bg-[#4CAF50] hover:bg-[#45A049] text-white px-10 py-6 text-lg"
            style={{ fontWeight: 500 }}
          >
            Compartilhar Experiência
          </Button>
        </div>
      </div>
    </div>
  );
}
