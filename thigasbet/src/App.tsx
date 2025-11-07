import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GameShowcase from "./components/GameShowcase";
import Footer from "./components/Footer";
import SlotMachine from "./components/SlotMachine";
import GoldenDice from "./components/GolderDice";
import RouletteRoyale from "./components/RouletteRoyale";

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const handleSelectGame = (gameName: string) => {
    setSelectedGame((prev) => (prev === gameName ? null : gameName));
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <GameShowcase onSelectGame={handleSelectGame} selectedGame={selectedGame} />

      {selectedGame === "Slot Machine" && <SlotMachine />}
      {selectedGame === "Golden Dice" && <GoldenDice />}
      {selectedGame === "Roulette Royale" && <RouletteRoyale />}

      <Footer />
    </div>
  );
}

export default App;
