/// <reference types="nativewind/types" />
import { useAuthStore } from "@/stores/authStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getBookings, type Booking } from "../../services/bookingService";

export default function TiketDigitalScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    getBookings()
      .then((data) => {
        setBookings(data);
        if (data.length > 0) setSelectedBooking(data[0]);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")
    : "?";

  const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  // Handle format ISO lengkap maupun YYYY-MM-DD
  const clean = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
    const date = new Date(clean + "T00:00:00");
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };


  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* HEADER */}
      <View className="px-5 pt-4 pb-2 flex-row justify-between items-center bg-[#F8FAFC]">
        <View>
          <Text className="text-xl font-black text-[#0D3B66]">
            jalan<Text className="text-[#00B4D8]">ku.</Text>
          </Text>
          <Text className="text-[11px] text-gray-400 font-medium">Tiket digital</Text>
        </View>
        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
          <Text className="text-[#0D3B66] font-bold text-xs">{initials}</Text>
        </View>
      </View>

      {/* LOADING */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0D3B66" />
          <Text className="text-gray-400 text-sm mt-3">Memuat tiket...</Text>
        </View>

      ) : bookings.length === 0 ? (
        /* BELUM ADA TIKET */
        <View className="flex-1 items-center justify-center px-8 pb-20">
          <Ionicons name="ticket-outline" size={80} color="#E5E7EB" />
          <Text className="text-xl font-bold text-[#0D3B66] mt-5 mb-2 text-center">
            Belum ada tiket aktif
          </Text>
          <Text className="text-xs text-gray-400 text-center font-medium leading-relaxed mb-8">
            Tiket perjalanan yang sudah kamu bayar akan muncul dan tersimpan secara digital di sini.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/search")}
            className="bg-[#00B4D8] px-8 py-3.5 rounded-xl shadow-sm"
          >
            <Text className="text-white font-extrabold">Cari Travel Sekarang</Text>
          </TouchableOpacity>
        </View>

      ) : (
        /* ADA TIKET */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20, paddingTop: 10 }}
        >
          {/* JUDUL & BADGE */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-black text-[#0D3B66]">Tiket perjalanan</Text>
              <Text className="text-xs text-gray-500 font-medium mt-0.5">
                Tunjukan tiket ini saat naik.
              </Text>
            </View>
            <View className="bg-emerald-100 px-3.5 py-1 rounded-full flex-row items-center">
              <View className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5" />
              <Text className="text-emerald-700 text-xs font-bold">Lunas</Text>
            </View>
          </View>

          {/* Pilih tiket jika lebih dari 1 */}
          {bookings.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              {bookings.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  onPress={() => setSelectedBooking(booking)}
                  className={`mr-2 px-4 py-2 rounded-full border ${
                    selectedBooking?.id === booking.id
                      ? "bg-[#0D3B66] border-[#0D3B66]"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text className={`text-xs font-bold ${
                    selectedBooking?.id === booking.id ? "text-white" : "text-gray-500"
                  }`}>
                    {booking.booking_code}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {selectedBooking && (
            <>
              {/* KARTU TIKET UTAMA */}
              <View className="bg-[#0D3B66] rounded-3xl p-6 shadow-md mb-6 relative overflow-hidden">
                <View className="flex-row justify-between items-center mb-6">
                  <View>
                    <Text className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mb-0.5">
                      KENDARAAN
                    </Text>
                    <Text className="text-base font-extrabold text-white">
                      {selectedBooking.schedule.vehicle.brand}
                    </Text>
                    <Text className="text-xs text-blue-300 mt-0.5">
                      {selectedBooking.schedule.vehicle.plate_number}
                    </Text>
                  </View>
                  <View className="w-10 h-10 bg-blue-900/80 rounded-2xl items-center justify-center border border-blue-800">
                    <MaterialCommunityIcons name="bus" size={22} color="#00B4D8" />
                  </View>
                </View>

                <View className="flex-row justify-between items-center mb-6">
                  <View>
                    <Text className="text-[10px] text-blue-200 uppercase font-bold">
                      {selectedBooking.schedule.route.origin.toUpperCase()}
                    </Text>
                    <Text className="text-2xl font-black text-white mt-0.5">
                      {selectedBooking.schedule.departure_time.substring(0, 5)}
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={20} color="#00B4D8" />
                  <View className="items-end">
                    <Text className="text-[10px] text-blue-200 uppercase font-bold">
                      {selectedBooking.schedule.route.destination.toUpperCase()}
                    </Text>
                    <Text className="text-2xl font-black text-white mt-0.5">–</Text>
                  </View>
                </View>

                <View className="border-b border-dashed border-blue-800/80 mb-6" />

                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text className="text-[10px] text-blue-200 uppercase font-bold">
                      NAMA PENUMPANG
                    </Text>
                    <Text className="text-sm font-bold text-white mt-0.5">
                      {selectedBooking.passenger_name}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-[10px] text-blue-200 uppercase font-bold">KURSI</Text>
                    <Text className="text-2xl font-black text-[#00B4D8] mt-0.5">
                      {selectedBooking.seat_number}
                    </Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-end mb-6">
                  <View>
                    <Text className="text-[10px] text-blue-200 uppercase font-bold">
                      TANGGAL BERANGKAT
                    </Text>
                    <Text className="text-xs font-bold text-white mt-0.5">
                      {formatDate(selectedBooking.schedule.departure_date)}
                    </Text>
                  </View>
                  <View className="w-16 h-16 bg-white rounded-xl items-center justify-center p-2 shadow">
                    <MaterialCommunityIcons name="qrcode" size={36} color="#0D3B66" />
                  </View>
                </View>

                {/* Barcode simulasi */}
                <View className="bg-white/10 p-3 rounded-xl items-center">
                  <View className="flex-row items-center justify-center h-8">
                    {[1, 2, 0.5, 1.5, 3, 1, 0.5, 2, 1, 0.5].map((w, i) => (
                      <View key={i} style={{ width: w * 4 }} className="h-full bg-white mx-0.5" />
                    ))}
                  </View>
                  <Text className="text-[10px] text-blue-200 font-mono tracking-widest mt-2">
                    {selectedBooking.booking_code}
                  </Text>
                </View>
              </View>

              {/* RINCIAN TIKET */}
              <Text className="text-xs font-bold text-[#0D3B66] mb-3">Rincian tiket</Text>
              <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-3">
                <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-sm font-extrabold text-gray-900">
                    {selectedBooking.passenger_name}
                  </Text>
                  <View className="bg-emerald-50 px-2.5 py-1 rounded-full">
                    <Text className="text-emerald-600 text-[10px] font-extrabold">
                      Kursi {selectedBooking.seat_number}
                    </Text>
                  </View>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-xs text-gray-400">Metode bayar</Text>
                  <Text className="text-xs font-bold text-gray-700">
                    {selectedBooking.payment_method?.toUpperCase()}
                  </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                  <Text className="text-xs text-gray-400">Total bayar</Text>
                  <Text className="text-xs font-bold text-gray-700">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(selectedBooking.total_price)}
                  </Text>
                </View>
                <Text className="text-[11px] text-gray-400 font-mono mt-1">
                  Kode: {selectedBooking.booking_code}
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
