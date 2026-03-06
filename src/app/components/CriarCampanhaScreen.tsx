import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface CriarCampanhaScreenProps {
  onVoltar?: () => void;
  onEnviar?: () => void;
}

export default function CriarCampanhaScreen({ onVoltar, onEnviar }: CriarCampanhaScreenProps) {
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
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onEnviar?.(); }}>
            {/* Campo Mensagem */}
            <div className="space-y-2">
              <Label 
                htmlFor="mensagem"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                Mensagem da Urgência
              </Label>
              <Textarea
                id="mensagem"
                placeholder="Ex: Precisamos urgentemente de doadores com sangue tipo O- e AB-. Sua doação pode salvar vidas!"
                rows={6}
                className="resize-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              />
            </div>

            {/* Tipos Sanguíneos Críticos */}
            <div className="space-y-2">
              <Label style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                Tipos Sanguíneos em Falta
              </Label>
              <div className="grid grid-cols-4 gap-3">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((tipo) => (
                  <label key={tipo} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" className="w-4 h-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{tipo}</span>
                  </label>
                ))}
              </div>
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
                className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white py-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                Enviar Alerta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
