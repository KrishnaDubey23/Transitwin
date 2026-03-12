"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Bike,
  CarTaxiFront,
  Bike as BikeIcon,
  ParkingCircle,
  Train,
  Bus,
  Ticket,
  ExternalLink,
  X,
} from "lucide-react";
import { SelectedRouteSummary } from "@/components/booking/SelectedRouteSummary";
import { RouteBreakdownPanel } from "@/components/planner/RouteBreakdownPanel";
import { Input } from "@/components/ui/input";
import {
  getPendingBooking,
  saveBooking,
  generateBookingId,
  clearPendingBooking,
  type BookingData,
} from "@/lib/bookings";
import { apiCreateTrip } from "@/lib/api";
import {
  getSupportingServices,
  REDIRECT_URLS,
  type SupportingService,
  type SupportingServiceType,
} from "@/lib/supportingServices";
import type { RouteOption } from "@/components/planner/types";

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


export default function SupportingServicesPage() {
  const router = useRouter();
  const [pending, setPending] = useState<{
    route: RouteOption;
    source: string;
    destination: string;
  } | null>(null);
  const [selectedService, setSelectedService] = useState<SupportingService | null>(null);
  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = getPendingBooking();
    if (!data) {
      router.replace("/dashboard/planner");
      return;
    }
    setPending(data);
  }, [router]);

  if (!pending) return null;

  const { route, source, destination } = pending;
  const services = getSupportingServices(route, source, destination);

  const handleServiceClick = (service: SupportingService) => {
    if (service.action === "redirect") {
      const url = REDIRECT_URLS[service.type] ?? "#";
      window.open(url, "_blank");
      return;
    }
    setSelectedService(service);
  };

  const handleConfirm = async () => {
    if (!selectedService) return;
    setIsSubmitting(true);

    const priceMatch = selectedService.price.match(/₹(\d+)/);
    const numericCost = priceMatch ? parseInt(priceMatch[1], 10) : 0;

    const bookingId = generateBookingId();
    const booking: BookingData = {
      id: bookingId,
      route,
      source,
      destination,
      totalCost: numericCost,
      bookingDate: new Date().toISOString(),
      serviceType: selectedService.type as SupportingServiceType,
      serviceLabel: selectedService.label,
      serviceFrom: selectedService.from,
      serviceTo: selectedService.to,
      servicePrice: selectedService.price,
      passengerName: formData.passengerName || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
    };

    saveBooking(booking);
    clearPendingBooking();
    setIsSubmitting(false);
    setSelectedService(null);

    // Save trip to backend if user is authenticated
    const transport = route.legs.find((l) => l.mode !== "walk")?.mode ?? "car";
    apiCreateTrip({
      origin: source,
      destination,
      mode: transport,
      duration: route.totalTime,
    }).catch(() => {});

    router.push(`/dashboard/bookings/confirm?id=${bookingId}`);
  };

  const segmentLabels: Record<string, string> = {
    first_mile: "First Mile",
    last_mile: "Last Mile",
    parking: "Parking",
    transit: "Public Transport",
    pass: "Travel Pass",
  };

  const bySegment = services.reduce(
    (acc, s) => {
      (acc[s.segment] ??= []).push(s);
      return acc;
    },
    {} as Record<string, SupportingService[]>
  );

  const segmentOrder = ["first_mile", "transit", "parking", "last_mile", "pass"].filter(
    (s) => bySegment[s]?.length
  );

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/planner"
          className="text-sm text-[#22C55E] hover:underline"
        >
          ← Back to Route Comparison
        </Link>
        <h1 className="font-sans text-2xl font-normal text-[#111111] mt-2">
          Book Supporting Services
        </h1>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          First-mile, last-mile, parking & more for your route
        </p>
      </div>

      <SelectedRouteSummary
        route={route}
        source={source}
        destination={destination}
      />

      <RouteBreakdownPanel route={route} />

      <div className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-[#111111] mb-4">
          Available Services
        </h2>
        <div className="space-y-6">
          {segmentOrder.map((seg) => (
            <div key={seg}>
              <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-wide mb-3">
                {segmentLabels[seg]}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {bySegment[seg].map((service) => {
                  const Icon = serviceIcons[service.type] ?? Car;
                  const isRedirect = service.action === "redirect";
                  return (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceClick(service)}
                      className="flex items-start gap-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-left hover:border-[#22C55E] hover:bg-[#22C55E]/5 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                        <Icon className="h-5 w-5 text-[#22C55E]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#111111]">
                          {service.label}
                        </p>
                        <p className="text-sm text-[#6B6B6B] mt-0.5">
                          {service.description}
                        </p>
                        <p className="mt-2 text-sm font-medium text-[#111111]">
                          {service.price}
                          {service.priceNote && (
                            <span className="text-xs text-[#6B6B6B] font-normal ml-1">
                              ({service.priceNote})
                            </span>
                          )}
                        </p>
                        <p
                          className={`mt-1 text-sm font-medium ${
                            isRedirect ? "text-blue-600" : "text-[#22C55E]"
                          }`}
                        >
                          {isRedirect ? (
                            <>
                              <ExternalLink className="inline h-4 w-4 mr-1 -mt-0.5" />
                              {service.ctaLabel}
                            </>
                          ) : (
                            service.ctaLabel
                          )}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#111111]">
                  {selectedService.ctaLabel}: {selectedService.label}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="rounded-lg p-1 hover:bg-[#F5F5F5]"
                >
                  <X className="h-5 w-5 text-[#6B6B6B]" />
                </button>
              </div>
              <p className="text-sm text-[#6B6B6B] mb-4">
                {selectedService.description} · {selectedService.price}
              </p>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-1">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.passengerName}
                    onChange={(e) =>
                      setFormData((d) => ({
                        ...d,
                        passengerName: e.target.value,
                      }))
                    }
                    className="h-10 rounded-lg border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-1">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, phone: e.target.value }))
                    }
                    className="h-10 rounded-lg border-[#E5E5E5]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((d) => ({ ...d, email: e.target.value }))
                    }
                    className="h-10 rounded-lg border-[#E5E5E5]"
                  />
                </div>
              </div>

              <p className="text-xs text-[#6B6B6B] mb-4">
                Simulated booking for hackathon demo
              </p>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#22C55E] py-3 text-sm font-medium text-white hover:bg-[#1ea34f] disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
