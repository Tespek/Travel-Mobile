/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SuksesPembayaranScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    booking_code?: string;
    seats?: string;
    origin_name?: string;
    destination_name?: string;
    departure_date?: string;
    departure_time?: string;
    total_price?: string;
    payment_method?: string;
  }>();

  const seats: number[] = params.seats ? JSON.parse(params.seats) : [];
  const totalPrice = Number(params.total_price) || 0;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);

  const methodLabel: Record<string, string> = {
    bca: "Virtual Account BCA",
    qris: "QRIS",
    ewallet: "E-wallet",
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* HEADER */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 justify-between">
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="close" size={20} color="#0D3B66" />
          </TouchableOpacity>
          <Text className="text-base font-extrabold text-[#0D3B66]">Status pembayaran</Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 160, paddingHorizontal: 20, alignItems: "center" }}
      >
        {/* IKON SUKSES */}
        <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mt-6 mb-6">
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>

        <Text className="text-2xl font-black text-[#0D3B66] mb-2 text-center">Pembayaran berhasil!</Text>
        <Text className="text-xs text-gray-500 font-medium text-center px-6 leading-relaxed mb-8">
          Tiket digitalmu sudah tersimpan. Tunjukkan kode booking saat naik kendaraan.
        </Text>

        {/* KARTU RINCIAN */}
        <View className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Kode booking</Text>
            <Text className="text-sm font-black text-[#0D3B66]">{params.booking_code ?? "-"}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Rute</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">
              {params.origin_name} → {params.destination_name}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Tanggal berangkat</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">{params.departure_date}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Jam berangkat</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">
              {params.departure_time?.substring(0, 5)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Kursi</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">{seats.join(", ")}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Metode pembayaran</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">
              {methodLabel[params.payment_method ?? ""] ?? params.payment_method}
            </Text>
          </View>
          <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
            <Text className="text-xs text-gray-400 font-medium">Total dibayar</Text>
            <Text className="text-base font-black text-[#0D3B66]">{formatPrice(totalPrice)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* TOMBOL AKSI */}
      <View className="absolute bottom-0 w-full bg-[#F8FAFC] px-5 py-4 pb-6">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/ticket")}
          className="w-full bg-[#0D3B66] py-4 rounded-xl items-center justify-center shadow-sm mb-3"
        >
          <Text className="text-white font-extrabold text-base">Lihat tiket saya →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          className="w-full bg-white border border-gray-200 py-4 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-[#0D3B66] font-extrabold text-base">Kembali ke beranda</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
