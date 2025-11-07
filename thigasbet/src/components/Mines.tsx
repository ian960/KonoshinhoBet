import React, { useState, useEffect } from "react";

// Mines.tsx
// Jogo estilo "Mines" (campo minado simplificado) — React + TypeScript
// 5x5 com bombas aleatórias e quadrados de dinheiro

type Cell = {
  isBomb: boolean;
  revealed: boolean;
  value: number; // dinheiro que o quadrado dá
};

export default function Mines() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(50);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [bombCount, setBombCount] = useState(5);

  // Gera o tabuleiro novo
  function generateGrid(): Cell[][] {
    const newGrid: Cell[][] = Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => ({
        isBomb: false,
        revealed: false,
        value: Math.floor(Math.random() * 100) + 10, // valor aleatório
      }))
    );

    // distribui bombas aleatórias
    const bombsToPlace = bombCount;
    let placed = 0;
    while (placed < bombsToPlace) {
      const x = Math.floor(Math.random() * 5);
      const y = Math.floor(Math.random() * 5);
      if (!newGrid[x][y].isBomb) {
        newGrid[x][y].isBomb = true;
        placed++;
      }
    }
    return newGrid;
  }

  useEffect(() => {
    setGrid(generateGrid());
  }, []);

  function handleCellClick(x: number, y: number) {
    if (gameOver || grid[x][y].revealed) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const cell = newGrid[x][y];
    cell.revealed = true;

    if (cell.isBomb) {
      setMessage("💣 BUM! Você perdeu tudo!");
      setGameOver(true);
    } else {
      setCredits((c) => c + cell.value);
      setMessage(`💰 Ganhou ${cell.value} créditos! Continue ou saque.`);
    }

    setGrid(newGrid);
  }

  function handleNewGame() {
    if (bet > credits) {
      setMessage("Créditos insuficientes!");
      return;
    }
    setCredits((c) => c - bet);
    setGameOver(false);
    setMessage("");
    setGrid(generateGrid());
  }

  // estilos simples
  const container: React.CSSProperties = {
    maxWidth: 600,
    margin: "2rem auto",
    textAlign: "center",
    color: "#fff",
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25))",
    padding: "1.5rem",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 80px)",
    gap: 10,
    justifyContent: "center",
    marginTop: 20,
  };

  const cellStyle = (cell: Cell): React.CSSProperties => ({
    width: 80,
    height: 80,
    fontSize: 22,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: cell.revealed
      ? cell.isBomb
        ? "crimson"
        : "rgba(255,215,0,0.4)"
      : "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 10,
    cursor: gameOver || cell.revealed ? "default" : "pointer",
    fontWeight: 600,
  });

  const btnStyle: React.CSSProperties = {
    marginTop: 18,
    padding: "0.8rem 1.6rem",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: "gold",
    color: "#000",
    fontWeight: 700,
  };

  return (
    <div style={container}>
      <h2>💎 Mines Game</h2>
      <p>Créditos: <strong>{credits}</strong> — Aposta: <strong>{bet}</strong></p>
      <p>Bombas: {bombCount}</p>

      <div style={gridStyle}>
        {grid.map((row, x) =>
          row.map((cell, y) => (
            <div key={`${x}-${y}`} style={cellStyle(cell)} onClick={() => handleCellClick(x, y)}>
              {cell.revealed ? (cell.isBomb ? "💣" : `+${cell.value}`) : "❓"}
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
        <button style={btnStyle} onClick={handleNewGame}>Novo Jogo</button>
        <button
          style={{ ...btnStyle, background: "#444", color: "#fff" }}
          onClick={() => {
            setMessage("🏦 Você sacou seus ganhos!");
            setGameOver(true);
          }}
        >
          Sacar
        </button>
      </div>

      <p style={{ marginTop: 12, color: "#ffd" }}>{message}</p>

      <small style={{ display: "block", marginTop: 8, color: "#bdb" }}>
        Clique em um quadrado para revelar. Evite as bombas e ganhe dinheiro!
      </small>
    </div>
  );
}
