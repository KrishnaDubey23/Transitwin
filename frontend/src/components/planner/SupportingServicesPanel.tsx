"use client";

import { motion } from "framer-motion";
import {
  Car,
  Bike,
  CarTaxiFront,
  Bike as BikeIcon,
  ParkingCircle,
  Train,
  Bus,
  Ticket,
} from "lucide-react";
import { REDIRECT_URLS, type SupportingService } from "@/lib/supportingServices";

const serviceIcons: Record<string, typeof Car> = {
  cab: Car,
  auto: CarTaxiFront,
  bike_taxi: Bike,
  e_scooter: BikeIcon,
  bike_rental: BikeIcon,
  parking: ParkingCircle,
  metro_redirect: Train,
  bus_redirect: Bus,
  travel_pass: Ticket,
};

interface SupportingServicesPanelProps {
  services: SupportingService[];
  onBook: (service?: SupportingService) => void;
}

const segmentLabels: Record<string, string> = {
  first_mile: "First Mile",
  last_mile: "Last Mile",
  parking: "Parking",
  transit: "Public Transport",
  pass: "Travel Pass",
};

export function SupportingServicesPanel({
  services,
  onBook,
}: SupportingServicesPanelProps) {
  if (services.length === 0) return null;

  const bySegment = services.reduce(
    (acc, s) => {
      (acc[s.segment] ??= []).push(s);
      return acc;
    },
    {} as Record<string, SupportingService[]>
  );

  const segmentOrder = [
    "first_mile",
    "transit",
    "parking",
    "last_mile",
    "pass",
  ].filter((s) => bySegment[s]?.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm"
    >
      <h3 className="font-semibold text-[#111111] mb-1">
        Book Supporting Services
      </h3>
      <p className="text-xs text-[#6B6B6B] mb-4">
        First-mile, last-mile, parking & more
      </p>
      <div className="space-y-4">
        {segmentOrder.map((seg) => (
          <div key={seg}>
            <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wide mb-2">
              {segmentLabels[seg]}
            </p>
            <div className="space-y-2">
              {bySegment[seg].map((service) => {
                const Icon = serviceIcons[service.type] ?? Car;
                const isRedirect = service.action === "redirect";
                const handleClick = () => {
                  if (isRedirect) {
                    const url = REDIRECT_URLS[service.type] ?? "#";
                    window.open(url, "_blank");
                  } else {
                    onBook(service);
                  }
                };
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={handleClick}
                    className="flex w-full items-center gap-3 rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] p-3 text-left hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                      <Icon className="h-4 w-4 text-[#22C55E]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-[#111111] text-sm">
                        {service.label}
                      </p>
                      <p className="text-xs text-[#6B6B6B] truncate">
                        {service.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-[#111111]">
                        {service.price}
                      </p>
                      <p className="text-xs text-[#22C55E]">{service.ctaLabel}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
