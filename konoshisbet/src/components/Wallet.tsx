// src/components/Wallet.tsx
import { useState } from "react";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { FaWallet, FaUserCircle, FaSyncAlt, FaHistory } from "react-icons/fa";

type WalletProps = {
  balance: number;
  onClose: () => void;
  onUpdateBalance: (newBalance: number) => void;
};

export default function Wallet({ balance, onClose, onUpdateBalance }: WalletProps) {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleDeposit = (amount: number) => {
    onUpdateBalance(balance + amount);
    alert(`Depósito de R$ ${amount} realizado com sucesso!`);
  };

  const handleWithdraw = (amount: number) => {
    onUpdateBalance(balance - amount);
    alert(`Saque de R$ ${amount} solicitado! Em até 24h na conta.`);
  };

  // Mock de histórico simples
  const mockHistory = [
    { id: 1, type: "Depósito", amount: 150, date: "05/11/2025" },
    { id: 2, type: "Saque", amount: 50, date: "03/11/2025" },
    { id: 3, type: "Depósito", amount: 200, date: "01/11/2025" },
  ];

  return (
    <>
      <div className="wallet-overlay" onClick={onClose}>
        <div className="wallet-modal" onClick={(e) => e.stopPropagation()}>
          <div className="wallet-header">
            <FaWallet size={28} color="gold" />
            <h2>Minha Carteira</h2>
          </div>

          <div className="wallet-info">
            <p><FaUserCircle /> ID da Conta: <strong>#984213</strong></p>
            <p><FaSyncAlt /> Última atualização: <strong>{new Date().toLocaleString()}</strong></p>
            <p>Status: <span className="status ativo">Ativa</span></p>
          </div>

          <div className="wallet-balance">
            <h3>Saldo Atual</h3>
            <p className="balance">R$ {balance.toLocaleString()}</p>
          </div>

          <div className="wallet-actions">
            <button onClick={() => setShowDeposit(true)}>💰 Depositar</button>
            <button onClick={() => setShowWithdraw(true)} disabled={balance < 50}>
              💸 Sacar
            </button>
          </div>

          <div className="wallet-history">
            <h4><FaHistory /> Histórico Rápido</h4>
            <ul>
              {mockHistory.map((item) => (
                <li key={item.id}>
                  <span>{item.type}</span>
                  <span>R$ {item.amount}</span>
                  <span>{item.date}</span>
                </li>
              ))}
            </ul>
          </div>

          <button className="close-btn" onClick={onClose}>Fechar</button>
        </div>
      </div>

      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
        onDeposit={handleDeposit}
      />

      <WithdrawModal
        isOpen={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onWithdraw={handleWithdraw}
        currentBalance={balance}
      />
    </>
  );
}
