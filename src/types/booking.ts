export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  property_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  status: BookingStatus;
  created_at: string;
};

export type CreateBookingInput = {
  property_id: string;
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests: number;
};
