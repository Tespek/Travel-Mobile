import { Mitra } from "@/stores/authStore";
import api from "./api";

export interface DriverProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  mitra?: Mitra;
  mitra_id?: number;
}

/**
 * Ambil profil lengkap driver dari backend.
 * Endpoint ini diharapkan mengembalikan data user beserta relasi mitra-nya.
 */
export const getDriverProfile = async (): Promise<DriverProfile> => {
  const response = await api.get("/driver/profile");
  return response.data.data ?? response.data;
};
