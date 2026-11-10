// Global type augmentations for cross-screen state passing.
// Expo Router does not support passing data back to the previous screen via
// a callback, so peta-lokasi.tsx writes the selected location here and
// data-penumpang.tsx reads (and clears) it on focus.

export interface PetaLokasiResult {
  passengerIndex: number;
  latitude: number;
  longitude: number;
  address: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __petaLokasi: PetaLokasiResult | null;
}
