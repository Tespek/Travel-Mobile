/// <reference types="nativewind/types" />
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { createBooking } from "../services/bookingService";

export default function PembayaranScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    seats?: string;
    passengers?: string;
    schedule_id?: string;
    origin_name?: string;
    destination_name?: string;
    departure_date?: string;
    departure_time?: string;
    price?: string;
    vehicle_brand?: string;
  }>();

  const seats: number[] = params.seats ? JSON.parse(params.seats) : [];
  const passengers: { name: string; phone: string; address: string }[] = params.passengers
    ? JSON.parse(params.passengers)
    : [];

  const pricePerTicket = Number(params.price) || 0;
  const passengerCount = seats.length;
  const subtotal = passengerCount * pricePerTicket;
  const adminFee = 3000;
  const totalPrice = subtotal + adminFee;

  const [selectedMethod, setSelectedMethod] = useState<"bca" | "qris" | "ewallet">("bca");
  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  const handleBayar = async () => {
    if (!params.schedule_id) {
      Alert.alert("Error", "Data jadwal tidak ditemukan.");
      return;
    }

    setIsLoading(true);
    try {
      // Buat booking untuk setiap kursi yang dipilih
      const bookingPromises = seats.map((seatNumber, index) =>
        createBooking({
          schedule_id: Number(params.schedule_id),
          passenger_name: passengers[index]?.name ?? "Penumpang",
          passenger_phone: passengers[index]?.phone || undefined,
          seat_number: seatNumber,
          pickup_type: passengers[index]?.address ? "pickup" : "terminal",
          pickup_address: passengers[index]?.address || undefined,
          total_price: pricePerTicket + (index === 0 ? adminFee : 0),
          payment_method: selectedMethod,
        })
      );

      const results = await Promise.all(bookingPromises);
      const firstBooking = results[0];

      router.replace({
        pathname: "/sukses-pembayaran",
        params: {
          booking_code: firstBooking.booking_code,
          seats: params.seats,
          origin_name: params.origin_name,
          destination_name: params.destination_name,
          departure_date: params.departure_date,
          departure_time: params.departure_time,
          total_price: totalPrice,
          payment_method: selectedMethod,
        },
      } as any);
    } catch (error: any) {
      const message = error?.response?.data?.message ?? "Pembayaran gagal. Coba lagi.";
      Alert.alert("Gagal", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* HEADER */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 mb-2">
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full" />
        </View>
        <View className="px-5 py-2">
          <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 items-center justify-center -ml-2">
            <Ionicons name="arrow-back" size={24} color="#0D3B66" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}>
        <View className="mb-6">
          <Text className="text-2xl font-black text-[#0D3B66] mb-1">Selesaikan pesanan</Text>
          <Text className="text-xs text-gray-500 font-medium leading-relaxed">
            Periksa rincian perjalanan sebelum memilih metode pembayaran.
          </Text>
        </View>

        {/* RINCIAN PERJALANAN */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">RUTE</Text>
              <Text className="text-base font-extrabold text-[#0D3B66]">
                {params.origin_name} → {params.destination_name}
              </Text>
            </View>
            <View className="bg-blue-50 px-3 py-1 rounded-full">
              <Text className="text-[#00B4D8] text-xs font-bold">Sekali jalan</Text>
            </View>
          </View>

          <View className="flex-row justify-between pt-3 pb-4 border-t border-gray-100 mb-4">
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase">BERANGKAT</Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                {params.departure_time?.substring(0, 5)}
              </Text>
            </View>
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase">KURSI</Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                {seats.join(", ")}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[10px] text-gray-400 font-bold uppercase">KENDARAAN</Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                {params.vehicle_brand ?? "-"}
              </Text>
            </View>
          </View>

          {/* Rincian harga */}
          <View className="pt-3 border-t border-gray-100">
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs text-gray-500 font-medium">
                Harga tiket ({passengerCount} penumpang)
              </Text>
              <Text className="text-xs font-bold text-gray-900">{formatPrice(subtotal)}</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-xs text-gray-500 font-medium">Biaya layanan</Text>
              <Text className="text-xs font-bold text-gray-900">{formatPrice(adminFee)}</Text>
            </View>
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
              <Text className="text-sm font-bold text-[#0D3B66]">Total pembayaran</Text>
              <Text className="text-lg font-black text-[#0D3B66]">{formatPrice(totalPrice)}</Text>
            </View>
          </View>
        </View>

        {/* METODE PEMBAYARAN */}
        <Text className="text-base font-extrabold text-[#0D3B66] mb-3">Metode pembayaran</Text>

        {[
          { id: "bca" as const, label: "Virtual Account BCA", sub: "Verifikasi otomatis", icon: null, text: "BCA" },
          { id: "qris" as const, label: "QRIS", sub: "Bayar dari aplikasi bank atau e-wallet", icon: "qrcode-scan", text: null },
          { id: "ewallet" as const, label: "E-wallet", sub: "Metode dompet digital", icon: "wallet-outline", text: null },
        ].map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setSelectedMethod(method.id)}
            className={`p-4 rounded-2xl border mb-3 bg-white flex-row justify-between items-center ${
              selectedMethod === method.id ? "border-[#00B4D8] bg-blue-50/40" : "border-gray-200"
            }`}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-10 bg-blue-50 rounded-lg items-center justify-center mr-3">
                {method.text ? (
                  <Text className="font-black text-[#0D3B66] text-xs">{method.text}</Text>
                ) : (
                  <MaterialCommunityIcons name={method.icon as any} size={20} color="#0D3B66" />
                )}
              </View>
              <View className="flex-1">
                <Text className="font-bold text-sm text-gray-900">{method.label}</Text>
                <Text className="text-[11px] text-gray-500 mt-0.5">{method.sub}</Text>
              </View>
            </View>
            <Ionicons
              name={selectedMethod === method.id ? "radio-button-on" : "radio-button-off"}
              size={22}
              color={selectedMethod === method.id ? "#00B4D8" : "#D1D5DB"}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TOMBOL BAYAR */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={handleBayar}
          disabled={isLoading}
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base">
            {isLoading ? "Memproses..." : `Bayar sekarang • ${formatPrice(totalPrice)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
