// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GameShowcase from "./components/GameShowcase";
import Footer from "./components/Footer";
import SlotMachine from "./components/SlotMachine";
import GoldenDice from "./components/GoldenDice";
import RouletteRoyale from "./components/RouletteRoyale";
import LoginModal from "./components/LoginModal";
import Mines from "./components/Mines";
import Wallet from "./components/Wallet";

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; balance: number } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const saved = localStorage.getItem("casinoUser");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar usuário do localStorage", e);
      }
    }
  }, []);

  // Atualiza saldo do usuário (usado por Wallet e futuros jogos)
  const updateBalance = (newBalance: number) => {
    if (!user) return;

    const updatedUser = { ...user, balance: Math.max(0, newBalance) }; // Evita saldo negativo
    setUser(updatedUser);
    localStorage.setItem("casinoUser", JSON.stringify(updatedUser));
  };

  const handleSelectGame = (gameName: string) => {
    setSelectedGame((prev) => (prev === gameName ? null : gameName));
  };

  const handleLogin = (userData: { name: string; balance: number }) => {
    setUser(userData);
    localStorage.setItem("casinoUser", JSON.stringify(userData));
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("casinoUser");
    setUser(null);
    setIsWalletOpen(false);
  };

  return (
    <div className="App">
      <Header
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
        onWalletClick={() => setIsWalletOpen(true)}
      />

      <Hero />
      <GameShowcase onSelectGame={handleSelectGame} selectedGame={selectedGame} />

      {/* Jogos exibidos conforme a seleção */}
      {selectedGame === "Slot Machine" && <SlotMachine />}
      {selectedGame === "Golden Dice" && <GoldenDice />}
      {selectedGame === "Roulette Royale" && <RouletteRoyale />}
      {selectedGame === "Mines" && <Mines />}

      <Footer />

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {/* Modal da Carteira com Depósito e Saque */}
      {isWalletOpen && user && (
        <Wallet
          balance={user.balance}
          onClose={() => setIsWalletOpen(false)}
          onUpdateBalance={updateBalance}
        />
      )}
    </div>
  );
}

export default App;