"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Download, History, Home } from "lucide-react";
import { getBookings } from "@/lib/bookings";
import type { BookingData } from "@/lib/bookings";

function BookingConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    if (!id) {
      router.replace("/dashboard/bookings");
      return;
    }
    const bookings = getBookings();
    const found = bookings.find((b) => b.id === id);
    if (!found) {
      router.replace("/dashboard/bookings");
      return;
    }
    setBooking(found);
  }, [id, router]);

  if (!booking) return null;

  const isServiceBooking = !!booking.serviceType;
  const transport =
    booking.route.legs.find((l) => l.mode !== "walk")?.mode ?? "walk";
  const transportLabel =
    transport === "metro" ? "Local train" : transport.charAt(0).toUpperCase() + transport.slice(1);
  const date = new Date(booking.bookingDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-xl border border-[#22C55E] bg-[#22C55E]/5 p-8 text-center"
      >
        <CheckCircle2 className="h-16 w-16 text-[#22C55E] mx-auto mb-4" />
        <h1 className="font-sans text-2xl font-semibold text-[#111111]">
          Booking Confirmed
        </h1>
        <p className="mt-2 text-[#6B6B6B]">
          {isServiceBooking
            ? "Your supporting service has been booked successfully"
            : "Your route has been booked successfully"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-[#E5E5E5] bg-white p-6 shadow-sm"
      >
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Route</span>
            <span className="font-medium text-[#111111]">
              {booking.source} → {booking.destination}
            </span>
          </div>
          {isServiceBooking ? (
            <>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Service</span>
                <span className="font-medium text-[#111111]">
                  {booking.serviceLabel}
                </span>
              </div>
              {booking.serviceFrom && (
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Pickup / Location</span>
                  <span className="font-medium text-[#111111]">
                    {booking.serviceFrom}
                    {booking.serviceTo ? ` → ${booking.serviceTo}` : ""}
                  </span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Transport</span>
              <span className="font-medium text-[#111111]">{transportLabel}</span>
            </div>
          )}
          {booking.passengerName && (
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Passenger</span>
              <span className="font-medium text-[#111111]">
                {booking.passengerName}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Booking ID</span>
            <span className="font-mono font-medium text-[#111111]">
              {booking.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B6B6B]">Date</span>
            <span className="font-medium text-[#111111]">{date}</span>
          </div>
          {isServiceBooking && booking.servicePrice && (
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Price</span>
              <span className="font-medium text-[#111111]">
                {booking.servicePrice}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#E5E5E5] bg-white py-3 text-sm font-medium text-[#111111] hover:bg-[#FAFAFA]"
        >
          <Download className="h-4 w-4" />
          Download Ticket
        </button>
        <Link
          href="/dashboard/bookings"
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#111111] bg-white py-3 text-sm font-medium text-[#111111] hover:bg-[#111111] hover:text-white"
        >
          <History className="h-4 w-4" />
          View Booking History
        </Link>
        <Link
          href="/dashboard"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#111111] py-3 text-sm font-medium text-white hover:bg-[#333333]"
        >
          <Home className="h-4 w-4" />
          Return to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-24">Loading...</div>}>
      <BookingConfirmContent />
    </Suspense>
  );
}
