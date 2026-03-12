"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Train, Car, Bus, ChevronRight } from "lucide-react";
import { getBookings } from "@/lib/bookings";
import type { BookingData } from "@/lib/bookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-normal text-[#111111]">
          My Bookings
        </h1>
        <p className="mt-1 text-[#6B6B6B] text-sm">
          View and manage your bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-[#E5E5E5] bg-white p-12 text-center">
          <p className="text-[#6B6B6B]">No bookings yet</p>
          <Link
            href="/dashboard/planner"
            className="mt-4 inline-block rounded-full bg-[#111111] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#333333]"
          >
            Plan a Route
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => {
            const isService = !!booking.serviceType;
            const transport =
              booking.route.legs.find((l) => l.mode !== "walk")?.mode ?? "walk";
            const Icon =
              transport === "metro"
                ? Train
                : transport === "car"
                  ? Car
                  : Bus;
            const transportLabel = isService
              ? (booking.serviceLabel ?? "Service")
              : transport === "metro"
                ? "Local train"
                : transport.charAt(0).toUpperCase() + transport.slice(1);
            const date = new Date(booking.bookingDate).toLocaleDateString(
              "en-IN",
              { day: "numeric", month: "long" }
            );

            return (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={`/dashboard/bookings/${booking.id}`}
                  className="flex items-center gap-4 rounded-xl border border-[#E5E5E5] bg-white p-4 shadow-sm hover:border-[#22C55E] transition-colors"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/10">
                    <Icon className="h-6 w-6 text-[#22C55E]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#111111]">
                      {booking.source} → {booking.destination}
                    </p>
                    <p className="text-sm text-[#6B6B6B]">
                      {transportLabel}
                      {!isService && ` · ${booking.route.totalTime} minutes`}
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      Booked on {date}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#6B6B6B]" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
