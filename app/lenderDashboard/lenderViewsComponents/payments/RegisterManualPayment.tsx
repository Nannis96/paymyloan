"use client";

import { useState, useEffect } from "react";
import { useSite } from "@/app/components/layout/SiteShell";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface RegisterManualPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRow: any;
  onSuccess: () => void;
}

export default function RegisterManualPayment({ isOpen, onClose, selectedRow, onSuccess }: RegisterManualPaymentProps) {
  const { lang } = useSite();
  const isEs = lang === "es";

  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("MANUAL");
  const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentNotes, setPaymentNotes] = useState("");
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Inicializar los valores cuando se abre el modal con una fila seleccionada
  useEffect(() => {
    if (isOpen && selectedRow) {
      setPaymentAmount(selectedRow.totalDue?.toString() || "");
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod("MANUAL");
      setPaymentNotes("");
    }
  }, [isOpen, selectedRow]);

  if (!isOpen) return null;

  const handleRegisterPayment = async () => {
    if (!selectedRow || !selectedRow.contract) return;
    setIsSubmittingPayment(true);
    try {
      const token = localStorage.getItem("accessToken") || "";
      const res = await fetch(`${BASE_URL}/api/contracts/${selectedRow.contract.id}/payments/manual`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: Number(paymentAmount),
          method: paymentMethod,
          occurredAt: new Date(paymentDate).toISOString(),
          notes: paymentNotes || undefined
        })
      });
      const json = await res.json();
      if (json.success) {
        alert(isEs ? "Pago registrado exitosamente" : "Payment registered successfully");
        onSuccess();
        onClose();
      } else {
        alert(json.error?.message || (isEs ? "Error al registrar el pago" : "Error registering payment"));
      }
    } catch (err) {
      console.error(err);
      alert(isEs ? "Error de red" : "Network error");
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a2540]/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-2 text-lg font-bold text-[#0a2540]">
          {isEs ? "Registrar Pago Manual" : "Register Manual Payment"}
        </h3>
        <p className="mb-4 text-sm text-[#8898aa]">
          {selectedRow?.contract?.property?.addressLine1} - {isEs ? "Cuota" : "Installment"} #{selectedRow?.sequenceNumber}
        </p>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-bold uppercase text-[#8898aa]">{isEs ? "Monto a registrar" : "Amount to post"}</label>
          <input 
            type="number" 
            step="0.01" 
            value={paymentAmount} 
            onChange={e => setPaymentAmount(e.target.value)} 
            className="w-full rounded-md border border-[#e6ebf1] px-3 py-2 text-sm outline-none focus:border-[#635bff]" 
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-bold uppercase text-[#8898aa]">{isEs ? "Metodo" : "Method"}</label>
          <select 
            value={paymentMethod} 
            onChange={e => setPaymentMethod(e.target.value)} 
            className="w-full rounded-md border border-[#e6ebf1] px-3 py-2 text-sm outline-none focus:border-[#635bff] bg-white"
          >
            <option value="MANUAL">Cash</option>
            <option value="WIRE">Wire Transfer</option>
            <option value="CHECK">Check</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-xs font-bold uppercase text-[#8898aa]">{isEs ? "Fecha de pago" : "Payment Date"}</label>
          <input 
            type="date" 
            value={paymentDate} 
            onChange={e => setPaymentDate(e.target.value)} 
            className="w-full rounded-md border border-[#e6ebf1] px-3 py-2 text-sm outline-none focus:border-[#635bff]" 
          />
        </div>

        
        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose} 
            className="rounded-md border border-[#e6ebf1] px-4 py-2 text-sm font-semibold text-[#425466] hover:bg-[#f6f9fc] transition-colors"
          >
            {isEs ? "Cancelar" : "Cancel"}
          </button>
          <button 
            onClick={handleRegisterPayment} 
            disabled={isSubmittingPayment} 
            className="rounded-md bg-[#635bff] px-4 py-2 text-sm font-bold text-white hover:bg-[#524ddb] transition-colors disabled:opacity-50"
          >
            {isSubmittingPayment ? (isEs ? "Procesando..." : "Processing...") : (isEs ? "Confirmar Pago" : "Confirm Payment")}
          </button>
        </div>
      </div>
    </div>
  );
}