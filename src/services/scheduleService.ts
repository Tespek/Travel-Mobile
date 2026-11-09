import api from "./api";

export interface City {
  id: number;
  name: string;
}

export interface Schedule {
  id: number;
  departure_date: string;
  departure_time: string;
  available_seats: number;
  status: string;
  route: {
    id: number;
    origin: string;
    destination: string;
    price: number;
    estimated_duration: string;
  };
  vehicle: {
    id: number;
    brand: string;
    plate_number: string;
    capacity: number;
  };
}

export const getCities = async (): Promise<City[]> => {
  const response = await api.get("/cities");
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};

export interface SearchSchedulesParams {
  origin_city_id: number;
  destination_city_id: number;
  departure_date: string;
}

export const searchSchedules = async (
  params: SearchSchedulesParams
): Promise<Schedule[]> => {
  const response = await api.get("/schedules/search", { params });
  // Handle both wrapped ({ data: [...] }) and unwrapped ([...]) responses
  return Array.isArray(response.data) ? response.data : response.data.data ?? [];
};
