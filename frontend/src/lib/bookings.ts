import type { RouteOption } from "@/components/planner/types";
import type { SupportingServiceType } from "@/lib/supportingServices";

export interface BookingData {
  id: string;
  route: RouteOption;
  source: string;
  destination: string;
  bookingDate: string;
  totalCost: number;
  // Ticket fields (legacy / travel pass)
  passengerName?: string;
  email?: string;
  phone?: string;
  ticketCount?: number;
  // Service booking fields
  serviceType?: SupportingServiceType;
  serviceLabel?: string;
  serviceFrom?: string;
  serviceTo?: string;
  servicePrice?: string;
}

const BOOKINGS_KEY = "transitwin_bookings";
const PENDING_BOOKING_KEY = "transitwin_pending_booking";

export function getBookings(): BookingData[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: BookingData): void {
  const bookings = getBookings();
  bookings.unshift(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function getPendingBooking(): {
  route: RouteOption;
  source: string;
  destination: string;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const data = sessionStorage.getItem(PENDING_BOOKING_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setPendingBooking(
  route: RouteOption,
  source: string,
  destination: string
): void {
  sessionStorage.setItem(
    PENDING_BOOKING_KEY,
    JSON.stringify({ route, source, destination })
  );
}

export function clearPendingBooking(): void {
  sessionStorage.removeItem(PENDING_BOOKING_KEY);
}

export function generateBookingId(): string {
  return "TXW-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}
