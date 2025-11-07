import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">Supreme Casino</h1>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <nav className={isMenuOpen ? "active" : ""}>
        <a href="#games" onClick={() => setIsMenuOpen(false)}>Jogos</a>
        <a href="#bonus" onClick={() => setIsMenuOpen(false)}>Bônus</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contato</a>
        <a href="#login" onClick={() => setIsMenuOpen(false)}>Login</a>
        <a href="#register" onClick={() => setIsMenuOpen(false)}>Cadastre-se</a>
        <a href="#balance" onClick={() => setIsMenuOpen(false)}>Carteira R$ 0.0</a>
      </nav>
    </header>
  );
}