import api from "./api";

export interface Booking {
  id: number;
  booking_code: string;
  passenger_name: string;
  passenger_phone?: string;
  seat_number: number;
  total_price: number;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_method: string;
  pickup_status: string;
  created_at: string;
  schedule: {
    departure_date: string;
    departure_time: string;
    route: {
      origin: string;
      destination: string;
      price: number;
    };
    vehicle: {
      brand: string;
      plate_number: string;
    };
  };
}

export interface CreateBookingPayload {
  schedule_id: number;
  passenger_name: string;
  passenger_phone?: string;
  seat_number: number;
  pickup_type: "terminal" | "pickup";
  pickup_address?: string;
  total_price: number;
  payment_method: "bca" | "qris" | "ewallet";
}

export const createBooking = async (payload: CreateBookingPayload): Promise<Booking> => {
  const response = await api.post("/bookings", payload);
  return response.data.data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get("/bookings");
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};

export const getBookingDetail = async (id: number): Promise<Booking> => {
  const response = await api.get(`/bookings/${id}`);
  return response.data.data;
};
