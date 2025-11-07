// src/components/DepositModal.tsx
import React, { useState } from "react";

type PaymentMethod = "pix" | "card";

type DepositModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (data: { amount: number; paymentMethod: PaymentMethod }) => void;
};

export default function DepositModal({ isOpen, onClose, onDeposit }: DepositModalProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const value = Number(amount);
    if (!value || value < 10) {
      setError("O depósito mínimo é R$ 10");
      return;
    }

    setLoading(true);

    // Simula processamento
    await new Promise((resolve) => setTimeout(resolve, 1200));

    onDeposit({ amount: value, paymentMethod });
    setAmount("");
    setPaymentMethod("pix");
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Depositar Créditos</h2>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="number"
            min="10"
            step="1"
            placeholder="Valor em R$ (mín. 10)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />

          {/* Seleção de Forma de Pagamento */}
          <div className="payment-methods">
            <p className="payment-label">Forma de pagamento:</p>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "pix" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={() => setPaymentMethod("pix")}
                />
                <span>Pix</span>
              </label>

              <label className={`payment-option ${paymentMethod === "card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <span>Cartão</span>
              </label>
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Processando..." : "Depositar"}
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