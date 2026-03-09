import { useState } from "react";
import { Button } from "./components/ui/button";
import CadastroScreen from "./components/CadastroScreen";
import HemocentrosScreen from "./components/HemocentrosScreen";
import AgendamentoScreen from "./components/AgendamentoScreen";
import FeedbackScreen from "./components/FeedbackScreen";
import LoginDoadorScreen from "./components/LoginDoadorScreen";
import LoginGestorScreen from "./components/LoginGestorScreen";
import DashboardScreen from "./components/DashboardScreen";
import CriarCampanhaScreen from "./components/CriarCampanhaScreen";
import RelatorioScreen from "./components/RelatorioScreen";
import Footer from "./components/Footer";

type Screen = 
  | 'home' 
  | 'login-doador'
  | 'cadastro' 
  | 'hemocentros' 
  | 'agendamento' 
  | 'feedback'
  | 'login-gestor'
  | 'dashboard'
  | 'criar-campanha'
  | 'relatorio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedHemocentro, setSelectedHemocentro] = useState<string>("");
  const [doadorToken, setDoadorToken] = useState<string>(() => localStorage.getItem("doador_token") || "");

  function handleLogoutDoador() {
    localStorage.removeItem("doador_token");
    localStorage.removeItem("doador_data");
    setDoadorToken("");
    setCurrentScreen("home");
  }

  if (currentScreen === 'login-doador') {
    return (
      <LoginDoadorScreen
        onVoltar={() => setCurrentScreen('home')}
        onIrParaCadastro={() => setCurrentScreen('cadastro')}
        onEntrar={(auth) => {
          setDoadorToken(auth.token);
          setCurrentScreen('hemocentros');
        }}
      />
    );
  }

  // Fluxo do Doador
  if (currentScreen === 'cadastro') {
    return <CadastroScreen onVoltar={() => setCurrentScreen('home')} />;
  }

  if (currentScreen === 'hemocentros') {
    if (!doadorToken) {
      return (
        <LoginDoadorScreen
          onVoltar={() => setCurrentScreen('home')}
          onIrParaCadastro={() => setCurrentScreen('cadastro')}
          onEntrar={(auth) => {
            setDoadorToken(auth.token);
            setCurrentScreen('hemocentros');
          }}
        />
      );
    }

    return (
      <HemocentrosScreen 
        doadorToken={doadorToken}
        onVoltar={handleLogoutDoador}
        onAgendar={(hemocentro) => {
          setSelectedHemocentro(hemocentro);
          setCurrentScreen('agendamento');
        }}
      />
    );
  }

  if (currentScreen === 'agendamento') {
    return (
      <AgendamentoScreen 
        doadorToken={doadorToken}
        hemocentro={selectedHemocentro}
        onVoltar={() => setCurrentScreen('hemocentros')} 
        onConfirmar={() => setCurrentScreen('feedback')}
      />
    );
  }

  if (currentScreen === 'feedback') {
    return (
      <FeedbackScreen 
        onVoltar={() => setCurrentScreen('home')} 
        onCompartilhar={() => alert('Compartilhamento ativado!')}
      />
    );
  }

  // Fluxo do Gestor
  if (currentScreen === 'login-gestor') {
    return (
      <LoginGestorScreen 
        onVoltar={() => setCurrentScreen('home')} 
        onEntrar={() => setCurrentScreen('dashboard')}
      />
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <DashboardScreen 
        onVoltar={() => setCurrentScreen('home')} 
        onCriarCampanha={() => setCurrentScreen('criar-campanha')}
        onVerRelatorio={() => setCurrentScreen('relatorio')}
      />
    );
  }

  if (currentScreen === 'criar-campanha') {
    return (
      <CriarCampanhaScreen 
        onVoltar={() => setCurrentScreen('dashboard')} 
        onEnviar={() => {
          alert('Alerta enviado com sucesso!');
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  if (currentScreen === 'relatorio') {
    return <RelatorioScreen onVoltar={() => setCurrentScreen('dashboard')} />;
  }

  // Tela Principal
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Roboto, sans-serif' }}>
      {/* Menu Superior */}
      <nav className="bg-[#FBC02D] shadow-md">
        <div className="container mx-auto px-6 py-4">
          <ul className="flex gap-8 justify-center flex-wrap">
            <li>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="text-white hover:text-gray-100 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentScreen('hemocentros')}
                className="text-white hover:text-gray-100 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                Portfólio
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentScreen('cadastro')}
                className="text-white hover:text-gray-100 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                Cadastro
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentScreen('login-gestor')}
                className="text-white hover:text-gray-100 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                Sobre
              </button>
            </li>
            <li>
              <button 
                onClick={() => setCurrentScreen('feedback')}
                className="text-white hover:text-gray-100 transition-colors" 
                style={{ fontWeight: 500 }}
              >
                Contato
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-1 container mx-auto px-6">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          {/* Título com espaçamento de 40px acima */}
          <h1 
            className="text-6xl text-[#FBC02D] mb-5" 
            style={{ fontWeight: 700, marginTop: '40px' }}
          >
            SangueFácil
          </h1>

          {/* Texto secundário com espaçamento de 20px */}
          <p 
            className="text-2xl text-gray-700 mb-5" 
            style={{ fontWeight: 400 }}
          >
            Doação de sangue simples e acessível
          </p>

          {/* Botões com espaçamento de 20px */}
          <div className="flex gap-4 mt-5 flex-wrap justify-center">
            <Button 
              onClick={() => setCurrentScreen('login-doador')}
              className="bg-[#FBC02D] hover:bg-[#F9A825] text-white px-8 py-6 text-lg"
              style={{ fontWeight: 500 }}
            >
              Entrar como Doador
            </Button>
            <Button 
              onClick={() => setCurrentScreen('cadastro')}
              className="bg-white border-2 border-[#FBC02D] text-[#FBC02D] hover:bg-[#FBC02D] hover:text-white px-8 py-6 text-lg"
              style={{ fontWeight: 500 }}
            >
              Criar Conta
            </Button>
            <Button 
              onClick={() => setCurrentScreen('login-gestor')}
              className="bg-[#1976D2] hover:bg-[#1565C0] text-white px-8 py-6 text-lg"
              style={{ fontWeight: 500 }}
            >
              Entrar como Gestor
            </Button>
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
