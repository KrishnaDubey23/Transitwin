"use client";

import { Input } from "@/components/ui/input";

export interface PassengerFormData {
  passengerName: string;
  email: string;
  phone: string;
  ticketCount: number;
}

interface PassengerFormProps {
  data: PassengerFormData;
  onChange: (data: PassengerFormData) => void;
}

export function PassengerForm({ data, onChange }: PassengerFormProps) {
  return (
    <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
      <h2 className="font-semibold text-[#111111] mb-4">
        Passenger Details
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            Passenger Name
          </label>
          <Input
            placeholder="Rahul Sharma"
            value={data.passengerName}
            onChange={(e) =>
              onChange({ ...data, passengerName: e.target.value })
            }
            className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">Email</label>
          <Input
            type="email"
            placeholder="rahul@email.com"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            Phone Number
          </label>
          <Input
            type="tel"
            placeholder="+91 9876543210"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
          />
        </div>
        <div>
          <label className="block text-sm text-[#6B6B6B] mb-2">
            Number of Tickets
          </label>
          <Input
            type="number"
            min={1}
            max={10}
            value={data.ticketCount}
            onChange={(e) =>
              onChange({
                ...data,
                ticketCount: Math.max(1, parseInt(e.target.value) || 1),
              })
            }
            className="h-11 rounded-lg border-[#E5E5E5] bg-[#FAFAFA]"
          />
        </div>
      </div>
    </div>
  );
}
