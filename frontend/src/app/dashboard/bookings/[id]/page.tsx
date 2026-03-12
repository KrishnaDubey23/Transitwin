"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { getBookings } from "@/lib/bookings";
import { RouteBreakdownPanel } from "@/components/planner/RouteBreakdownPanel";
import type { BookingData } from "@/lib/bookings";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [booking, setBooking] = useState<BookingData | null>(null);

  useEffect(() => {
    const bookings = getBookings();
    const found = bookings.find((b) => b.id === id);
    if (!found) {
      router.replace("/dashboard/bookings");
      return;
    }
    setBooking(found);
  }, [id, router]);

  if (!booking) return null;

  const isService = !!booking.serviceType;
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
    <div className="space-y-6">
      <Link
        href="/dashboard/bookings"
        className="inline-flex items-center gap-2 text-sm text-[#22C55E] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Bookings
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border-2 border-[#E5E5E5] bg-white p-6 shadow-sm"
      >
        <h2 className="font-semibold text-[#111111] mb-4">
          {isService ? "TransitWin Service Booking" : "TransitWin Ticket"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[#6B6B6B]">Booking ID</p>
            <p className="font-mono font-medium text-[#111111]">{booking.id}</p>
          </div>
          <div>
            <p className="text-xs text-[#6B6B6B]">Date</p>
            <p className="font-medium text-[#111111]">{date}</p>
          </div>
          {booking.passengerName && (
            <div>
              <p className="text-xs text-[#6B6B6B]">Passenger</p>
              <p className="font-medium text-[#111111]">
                {booking.passengerName}
              </p>
            </div>
          )}
          <div>
            <p className="text-xs text-[#6B6B6B]">Route</p>
            <p className="font-medium text-[#111111]">
              {booking.source} → {booking.destination}
            </p>
          </div>
          {isService ? (
            <>
              <div>
                <p className="text-xs text-[#6B6B6B]">Service</p>
                <p className="font-medium text-[#111111]">
                  {booking.serviceLabel}
                </p>
              </div>
              {booking.serviceFrom && (
                <div>
                  <p className="text-xs text-[#6B6B6B]">Pickup / Location</p>
                  <p className="font-medium text-[#111111]">
                    {booking.serviceFrom}
                    {booking.serviceTo ? ` → ${booking.serviceTo}` : ""}
                  </p>
                </div>
              )}
              {booking.servicePrice && (
                <div>
                  <p className="text-xs text-[#6B6B6B]">Price</p>
                  <p className="font-medium text-[#111111]">
                    {booking.servicePrice}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div>
              <p className="text-xs text-[#6B6B6B]">Transport</p>
              <p className="font-medium text-[#111111]">{transportLabel}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-[#6B6B6B]">Total Cost</p>
            <p className="font-medium text-[#111111]">
              {isService && booking.servicePrice
                ? booking.servicePrice
                : `₹${booking.totalCost}`}
            </p>
          </div>
        </div>
        <div className="mt-6 flex h-24 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#FAFAFA]">
          <p className="text-sm text-[#6B6B6B]">QR Code</p>
        </div>
        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#111111] py-2.5 text-sm font-medium text-[#111111] hover:bg-[#111111] hover:text-white"
        >
          <Download className="h-4 w-4" />
          Download Ticket
        </button>
      </motion.div>

      <RouteBreakdownPanel route={booking.route} />
    </div>
  );
}
