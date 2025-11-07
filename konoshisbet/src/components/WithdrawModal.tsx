// src/components/WithdrawModal.tsx
import React, { useState } from "react";

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number) => void;
  currentBalance: number;
};

export default function WithdrawModal({ isOpen, onClose, onWithdraw, currentBalance }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const value = Number(amount);

    if (!value || value < 50) {
      setError("O saque mínimo é R$ 50");
      return;
    }

    if (value > currentBalance) {
      setError("Saldo insuficiente");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));

    onWithdraw(value);
    setAmount("");
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Sacar Ganhos</h2>
          <p style={{ fontSize: "0.9rem", color: "#ffd" }}>
            Saldo disponível: <strong>R$ {currentBalance.toLocaleString()}</strong>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="number"
            min="50"
            max={currentBalance}
            step="1"
            placeholder="Valor em R$ (mín. 50)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Processando..." : "Sacar"}
          </button>
        </form>
        <p className="toggle-mode">
          <button type="button" onClick={onClose} className="link-btn">
            Cancelar
          </button>
        </p>
      </div>
    </div>
  );
}