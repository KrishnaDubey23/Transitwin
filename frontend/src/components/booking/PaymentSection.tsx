"use client";

import { useState } from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react";

type PaymentMethod = "upi" | "card" | "wallet";

interface PaymentSectionProps {
  onConfirm: (method: PaymentMethod) => void;
  isLoading?: boolean;
}

const methods: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Credit Card", icon: CreditCard },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

export function PaymentSection({
  onConfirm,
  isLoading = false,
}: PaymentSectionProps) {
  const [selected, setSelected] = useState<PaymentMethod>("upi");

  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-[#111111] mb-4">Payment Method</h2>
      <div className="flex flex-wrap gap-3 mb-6">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setSelected(m.id)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-all ${
              selected === m.id
                ? "border-[#22C55E] bg-[#22C55E]/10"
                : "border-[#E5E5E5] hover:border-[#E5E5E5]"
            }`}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-[#6B6B6B] mb-4">
        Simulated payment for hackathon demo
      </p>
      <button
        type="button"
        onClick={() => onConfirm(selected)}
        disabled={isLoading}
        className="w-full rounded-full bg-[#111111] py-3.5 text-sm font-medium text-white hover:bg-[#333333] disabled:opacity-50 transition-colors"
      >
        {isLoading ? "Processing..." : "Confirm Booking"}
      </button>
    </div>
  );
}
