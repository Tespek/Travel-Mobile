import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LokasiJemputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Menangkap data kursi dari halaman sebelumnya
  const seats = params.seats ? JSON.parse(params.seats as string) : [9];
  const passengerCount = seats.length;
  const ticketPrice = 180000;
  const totalPrice = passengerCount * ticketPrice;

  const [pickupMode, setPickupMode] = useState<"sama" | "berbeda">("sama");

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER & PROGRESS BAR */}
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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* JUDUL */}
          <View className="px-5 mb-6">
            <Text className="text-2xl font-black text-[#0D3B66] mb-2">
              Titik jemput penumpang
            </Text>
            <Text className="text-xs text-gray-500 leading-relaxed font-medium">
              Pilih apakah semua penumpang naik di lokasi yang sama atau
              memiliki titik jemput berbeda.
            </Text>
          </View>

          {/* PILIHAN MODE JEMPUT */}
          <View className="px-5 mb-4">
            {/* Opsi 1: Sama */}
            <TouchableOpacity
              onPress={() => setPickupMode("sama")}
              className={`p-4 rounded-xl border mb-4 flex-row justify-between items-center ${
                pickupMode === "sama"
                  ? "border-[#0D3B66] bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <View className="flex-1 pr-4">
                <Text
                  className={`font-bold text-sm ${pickupMode === "sama" ? "text-[#0D3B66]" : "text-gray-700"}`}
                >
                  Semua naik di tempat yang sama
                </Text>
                <Text className="text-[10px] text-gray-500 mt-1 font-medium">
                  Satu lokasi berlaku untuk seluruh penumpang.
                </Text>
              </View>
              <Ionicons
                name={
                  pickupMode === "sama" ? "radio-button-on" : "radio-button-off"
                }
                size={24}
                color={pickupMode === "sama" ? "#0D3B66" : "#D1D5DB"}
              />
            </TouchableOpacity>

            {/* Opsi 2: Berbeda */}
            <TouchableOpacity
              onPress={() => setPickupMode("berbeda")}
              className={`p-4 rounded-xl border flex-row justify-between items-center ${
                pickupMode === "berbeda"
                  ? "border-[#0D3B66] bg-white"
                  : "border-gray-200 bg-white"
              }`}
            >
              <View className="flex-1 pr-4">
                <Text
                  className={`font-bold text-sm ${pickupMode === "berbeda" ? "text-[#0D3B66]" : "text-gray-700"}`}
                >
                  Titik jemput berbeda
                </Text>
                <Text className="text-[10px] text-gray-500 mt-1 font-medium">
                  Atur lokasi satu per satu untuk setiap penumpang.
                </Text>
              </View>
              <Ionicons
                name={
                  pickupMode === "berbeda"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={pickupMode === "berbeda" ? "#0D3B66" : "#D1D5DB"}
              />
            </TouchableOpacity>
          </View>

          {/* FORM JIKA "SAMA" */}
          {pickupMode === "sama" && (
            <View className="px-5 mb-6">
              <Text className="text-xs font-bold text-[#0D3B66] mb-2">
                Titik jemput bersama
              </Text>
              <TouchableOpacity className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white flex-row justify-between items-center mb-4">
                <Text className="text-sm text-gray-900 font-medium">
                  Terminal Batoh
                </Text>
                <Ionicons name="chevron-down" size={18} color="#0D3B66" />
              </TouchableOpacity>

              <Text className="text-xs font-bold text-[#0D3B66] mb-2">
                Catatan penjemputan (opsional)
              </Text>
              <TextInput
                className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white text-sm text-gray-900 font-medium"
                placeholder="Contoh: dekat pintu masuk utama"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          )}

          {/* FORM DINAMIS JIKA "BERBEDA" (MENGULANG SESUAI JUMLAH KURSI) */}
          {pickupMode === "berbeda" && (
            <View className="px-5 mb-6">
              {seats.map((seatNumber: number, index: number) => (
                <View
                  key={seatNumber}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4"
                >
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-base font-bold text-[#0D3B66]">
                      Penumpang {index + 1}
                    </Text>
                    <View className="bg-blue-50 px-3 py-1.5 rounded-full">
                      <Text className="text-[#00B4D8] text-xs font-extrabold">
                        Kursi {seatNumber}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-xs font-bold text-gray-700 mb-2">
                    Pilih titik jemput
                  </Text>
                  <TouchableOpacity className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 flex-row justify-between items-center mb-4">
                    <Text className="text-sm text-gray-900 font-medium">
                      Terminal Batoh
                    </Text>
                    <Ionicons name="chevron-down" size={18} color="#0D3B66" />
                  </TouchableOpacity>

                  <Text className="text-xs font-bold text-gray-700 mb-2">
                    Catatan penjemputan (opsional)
                  </Text>
                  <TextInput
                    className="border border-gray-200 rounded-xl px-4 py-3.5 bg-gray-50 text-sm text-gray-900 font-medium"
                    placeholder="Contoh: Jemput di depan minimarket"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              ))}
            </View>
          )}

          {/* KARTU RINGKASAN */}
          <View className="px-5 mb-6">
            <View className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <View className="flex-row justify-between mb-3">
                <Text className="text-xs text-gray-400 font-medium">
                  Operator
                </Text>
                <Text className="text-xs font-bold text-[#0D3B66]">
                  PT Bintang Lestari Putra
                </Text>
              </View>
              <View className="flex-row justify-between mb-6">
                <Text className="text-xs text-gray-400 font-medium">
                  Penumpang / kursi
                </Text>
                <Text className="text-xs font-bold text-[#0D3B66]">
                  {passengerCount} orang • kursi {seats.join(", ")}
                </Text>
              </View>

              <Text className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-3">
                RINGKASAN TITIK JEMPUT
              </Text>
              <View className="flex-row justify-between items-start mb-6">
                <Text className="text-xs text-gray-500 font-medium flex-1 mr-4">
                  Aulia Fauzi • Kursi {seats[0]}
                </Text>
                <Text className="text-xs font-bold text-[#0D3B66] text-right">
                  Terminal Batoh
                </Text>
              </View>

              <View className="flex-row justify-between items-center pt-5 border-t border-gray-100">
                <Text className="text-xs text-gray-400 font-medium">
                  Harga tiket
                </Text>
                <Text className="text-lg font-black text-[#0D3B66]">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* STICKY BOTTOM BUTTON DENGAN NAVIGASI KE PEMBAYARAN */}
      <View className="absolute bottom-0 w-full bg-[#F8FAFC] px-5 py-4 pb-6">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/pembayaran",
              params: { seats: JSON.stringify(seats) },
            })
          }
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base">
            Lanjut ke pembayaran →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
