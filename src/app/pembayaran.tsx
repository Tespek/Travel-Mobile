import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PembayaranScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Menangkap data kursi
  const seats = params.seats ? JSON.parse(params.seats as string) : [9];
  const passengerCount = seats.length;

  // Perhitungan Harga
  const pricePerTicket = 180000;
  const subtotal = passengerCount * pricePerTicket;
  const adminFee = 3000;
  const totalPrice = subtotal + adminFee;

  // State untuk pilihan metode pembayaran
  const [selectedMethod, setSelectedMethod] = useState<
    "bca" | "qris" | "ewallet"
  >("bca");

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20 }}
      >
        {/* JUDUL */}
        <View className="mb-6">
          <Text className="text-2xl font-black text-[#0D3B66] mb-1">
            Selesaikan pesanan
          </Text>
          <Text className="text-xs text-gray-500 font-medium leading-relaxed">
            Periksa rincian perjalanan sebelum memilih metode pembayaran.
          </Text>
        </View>

        {/* KARTU RINCIAN RUTE & HARGA */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                RUTE
              </Text>
              <Text className="text-base font-extrabold text-[#0D3B66]">
                Lhokseumawe → Medan
              </Text>
            </View>
            <View className="bg-blue-50 px-3 py-1 rounded-full">
              <Text className="text-[#00B4D8] text-xs font-bold">
                Sekali jalan
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between pt-3 pb-4 border-t border-gray-100 mb-4">
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase">
                BERANGKAT
              </Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                19:00
              </Text>
            </View>
            <View>
              <Text className="text-[10px] text-gray-400 font-bold uppercase">
                PENUMPANG / KURSI
              </Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                {passengerCount} orang • {seats.join(", ")}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[10px] text-gray-400 font-bold uppercase">
                NAIK DI
              </Text>
              <Text className="text-sm font-extrabold text-gray-900 mt-0.5">
                Terminal Batoh
              </Text>
            </View>
          </View>

          <View className="pt-3 border-t border-gray-100 space-y-2">
            <View className="flex-row justify-between mb-2">
              <Text className="text-xs text-gray-500 font-medium">
                Harga tiket
              </Text>
              <Text className="text-xs font-bold text-gray-900">
                Rp{subtotal.toLocaleString("id-ID")}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-xs text-gray-500 font-medium">
                Biaya layanan
              </Text>
              <Text className="text-xs font-bold text-gray-900">
                Rp{adminFee.toLocaleString("id-ID")}
              </Text>
            </View>
            <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
              <Text className="text-sm font-bold text-[#0D3B66]">
                Total pembayaran
              </Text>
              <Text className="text-lg font-black text-[#0D3B66]">
                Rp{totalPrice.toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </View>

        {/* METODE PEMBAYARAN */}
        <Text className="text-base font-extrabold text-[#0D3B66] mb-3">
          Metode pembayaran
        </Text>

        {/* Opsi 1: BCA */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("bca")}
          className={`p-4 rounded-2xl border mb-3 bg-white flex-row justify-between items-center ${
            selectedMethod === "bca"
              ? "border-[#00B4D8] bg-blue-50/40"
              : "border-gray-200"
          }`}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
              <Text className="font-black text-[#0D3B66] text-xs">BCA</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-gray-900">
                Virtual Account BCA
              </Text>
              <Text className="text-[11px] text-gray-500 mt-0.5">
                Verifikasi otomatis
              </Text>
            </View>
          </View>
          <Ionicons
            name={
              selectedMethod === "bca" ? "radio-button-on" : "radio-button-off"
            }
            size={22}
            color={selectedMethod === "bca" ? "#00B4D8" : "#D1D5DB"}
          />
        </TouchableOpacity>

        {/* Opsi 2: QRIS */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("qris")}
          className={`p-4 rounded-2xl border mb-3 bg-white flex-row justify-between items-center ${
            selectedMethod === "qris"
              ? "border-[#00B4D8] bg-blue-50/40"
              : "border-gray-200"
          }`}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-10 bg-gray-100 rounded-lg items-center justify-center mr-3">
              <MaterialCommunityIcons
                name="qrcode-scan"
                size={20}
                color="#0D3B66"
              />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-gray-900">QRIS</Text>
              <Text className="text-[11px] text-gray-500 mt-0.5">
                Bayar dari aplikasi bank atau e-wallet
              </Text>
            </View>
          </View>
          <Ionicons
            name={
              selectedMethod === "qris" ? "radio-button-on" : "radio-button-off"
            }
            size={22}
            color={selectedMethod === "qris" ? "#00B4D8" : "#D1D5DB"}
          />
        </TouchableOpacity>

        {/* Opsi 3: E-wallet */}
        <TouchableOpacity
          onPress={() => setSelectedMethod("ewallet")}
          className={`p-4 rounded-2xl border mb-6 bg-white flex-row justify-between items-center ${
            selectedMethod === "ewallet"
              ? "border-[#00B4D8] bg-blue-50/40"
              : "border-gray-200"
          }`}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-10 bg-teal-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="wallet-outline" size={20} color="#00B4D8" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-gray-900">E-wallet</Text>
              <Text className="text-[11px] text-gray-500 mt-0.5">
                Metode dompet digital
              </Text>
            </View>
          </View>
          <Ionicons
            name={
              selectedMethod === "ewallet"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={22}
            color={selectedMethod === "ewallet" ? "#00B4D8" : "#D1D5DB"}
          />
        </TouchableOpacity>

        {/* KOTAK PERINGATAN SIMULASI */}
        <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mb-4">
          <Text className="text-xs text-amber-800 leading-relaxed font-medium">
            Simulasi payment gateway. Tidak ada uang yang ditarik dan tidak ada
            transaksi nyata.
          </Text>
        </View>
      </ScrollView>

      {/* STICKY BOTTOM BUTTON DENGAN NAVIGASI KE SUKSES */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/sukses-pembayaran",
              params: { seats: JSON.stringify(seats) },
            })
          }
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base">
            Bayar sekarang • Rp{totalPrice.toLocaleString("id-ID")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
