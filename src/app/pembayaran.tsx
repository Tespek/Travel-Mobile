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
import api from "../services/api";

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
  const passengers: { name: string; phone: string; address: string }[] =
    params.passengers ? JSON.parse(params.passengers) : [];

  const pricePerTicket = Number(params.price) || 0;
  const passengerCount = seats.length;
  const subtotal = passengerCount * pricePerTicket;
  const adminFee = 3000;
  const totalPrice = subtotal + adminFee;

  const [isLoading, setIsLoading] = useState(false);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const handleBayar = async () => {
    if (!params.schedule_id) {
      Alert.alert("Error", "Data jadwal tidak ditemukan.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/payment/create", {
        schedule_id: Number(params.schedule_id),
        passengers: seats.map((seat, index) => ({
          name: passengers[index]?.name ?? "Penumpang",
          phone: passengers[index]?.phone || null,
          seat: seat,
          address: passengers[index]?.address || null,
        })),
        payment_method: "midtrans",
      });

      const { snap_token, booking_code, total_price: serverTotal } = response.data;

      router.push({
        pathname: "/midtrans-payment",
        params: {
          snap_token,
          booking_code,
          seats: params.seats,
          origin_name: params.origin_name,
          destination_name: params.destination_name,
          departure_date: params.departure_date,
          departure_time: params.departure_time,
          total_price: serverTotal ?? totalPrice,
        },
      } as any);

    } catch (error: any) {
      let message = "Pembayaran gagal. Coba lagi.";
      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.response?.data?.errors) {
        const firstError = Object.values(error.response.data.errors)[0];
        message = Array.isArray(firstError) ? firstError[0] : String(firstError);
      } else if (error?.message) {
        message = error.message;
      }
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
      {/* HEADER PROGRESS */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 mb-2">
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full" />
        </View>
        <View className="px-5 py-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-8 h-8 items-center justify-center -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#0D3B66" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
      >
        <View className="mb-6">
          <Text className="text-2xl font-black text-[#0D3B66] mb-1">
            Selesaikan pesanan
          </Text>
          <Text className="text-xs text-gray-500 font-medium leading-relaxed">
            Periksa rincian perjalanan sebelum melanjutkan pembayaran.
          </Text>
        </View>

        {/* RINCIAN PERJALANAN */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                RUTE
              </Text>
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
              <Text className="text-xs font-bold text-gray-900">
                {formatPrice(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-xs text-gray-500 font-medium">Biaya layanan</Text>
              <Text className="text-xs font-bold text-gray-900">
                {formatPrice(adminFee)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
              <Text className="text-sm font-bold text-[#0D3B66]">Total pembayaran</Text>
              <Text className="text-lg font-black text-[#0D3B66]">
                {formatPrice(totalPrice)}
              </Text>
            </View>
          </View>
        </View>

        {/* INFO PEMBAYARAN MIDTRANS */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-sm font-extrabold text-[#0D3B66] mb-3">
            Metode pembayaran
          </Text>
          <View className="flex-row items-center">
            <View className="w-12 h-10 bg-blue-50 rounded-lg items-center justify-center mr-3">
              <MaterialCommunityIcons name="shield-check" size={22} color="#0D3B66" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-gray-900">Midtrans Payment Gateway</Text>
              <Text className="text-[11px] text-gray-500 mt-0.5">
                VA Bank, QRIS, GoPay, OVO, dan lainnya
              </Text>
            </View>
          </View>
          <View className="mt-4 bg-blue-50 p-3 rounded-xl">
            <Text className="text-xs text-[#0D3B66] leading-relaxed">
              Kamu akan diarahkan ke halaman pembayaran Midtrans yang aman. Pilih metode pembayaran favoritmu di sana.
            </Text>
          </View>
        </View>

        {/* DAFTAR PENUMPANG */}
        {passengers.length > 0 && (
          <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
            <Text className="text-sm font-extrabold text-[#0D3B66] mb-3">
              Penumpang
            </Text>
            {passengers.map((p, i) => (
              <View key={i} className="flex-row justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <Text className="text-sm font-medium text-gray-700">{p.name}</Text>
                <View className="bg-blue-50 px-2 py-1 rounded-full">
                  <Text className="text-[#00B4D8] text-xs font-bold">Kursi {seats[i]}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* TOMBOL BAYAR */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={handleBayar}
          disabled={isLoading}
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Ionicons name="lock-closed" size={16} color="white" />
          <Text className="text-white font-extrabold text-base ml-2">
            {isLoading ? "Memproses..." : `Bayar sekarang • ${formatPrice(totalPrice)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
