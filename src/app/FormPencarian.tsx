import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Tambahan alat navigasi
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

export default function FormPencarianScreen() {
  // Nama disesuaikan dengan nama file
  const router = useRouter(); // Mengaktifkan router
  const [origin, setOrigin] = useState("Lhokseumawe");
  const [destination, setDestination] = useState("Medan");

  // Fitur interaktif untuk menukar posisi kota keberangkatan dan tujuan
  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Latar Biru Tua Khas JalanKu */}
        <View className="bg-[#0D3B66] px-6 pt-6 pb-24 rounded-b-[40px] relative">
          {/* Tombol Kembali / Tutup */}
          <TouchableOpacity
            onPress={() => router.back()} // Fungsi untuk kembali ke layar sebelumnya
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          <Text className="text-white text-3xl font-black mb-2">
            Ubah rute?
          </Text>
          <Text className="text-[#00B4D8] text-sm font-medium">
            Sesuaikan kota asal, tujuan, dan tanggal keberangkatan.
          </Text>
        </View>

        {/* Kartu Form Pencarian (Melayang / Floating UI) */}
        <View className="px-5 -mt-16">
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            {/* Input Asal & Tujuan */}
            <View className="relative">
              <TouchableOpacity className="flex-row items-center border-b border-gray-100 pb-5 mb-5 mt-2">
                <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4">
                  <Ionicons name="location" size={20} color="#0D3B66" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">
                    Dari
                  </Text>
                  <Text className="text-lg font-black text-gray-900">
                    {origin}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Tombol Tukar Rute (Swap) di tengah-tengah */}
              <TouchableOpacity
                onPress={handleSwap}
                className="absolute right-4 top-10 bg-blue-50 w-12 h-12 rounded-full items-center justify-center border-4 border-white z-10 shadow-sm"
              >
                <Ionicons name="swap-vertical" size={24} color="#00B4D8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center pb-2">
                <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-4">
                  <Ionicons name="location-outline" size={20} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">
                    Ke
                  </Text>
                  <Text className="text-lg font-black text-gray-900">
                    {destination}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Garis Pemisah */}
            <View className="h-[1px] bg-gray-100 my-5" />

            {/* Tanggal & Penumpang */}
            <View className="flex-row justify-between mb-6">
              <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 p-3 rounded-2xl mr-2 border border-gray-100">
                <Ionicons
                  name="calendar"
                  size={22}
                  color="#f97316"
                  className="mr-3"
                />
                <View className="ml-2">
                  <Text className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">
                    Tanggal
                  </Text>
                  <Text className="text-sm font-extrabold text-[#0D3B66]">
                    2 Nov 26
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 p-3 rounded-2xl ml-2 border border-gray-100">
                <Ionicons
                  name="people"
                  size={22}
                  color="#22c55e"
                  className="mr-3"
                />
                <View className="ml-2">
                  <Text className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">
                    Kursi
                  </Text>
                  <Text className="text-sm font-extrabold text-[#0D3B66]">
                    1 Orang
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Tombol Cari Utama */}
            <TouchableOpacity
              onPress={() => router.push("/search")} // Fungsi untuk berpindah ke halaman daftar tiket
              className="bg-[#1e5b96] rounded-2xl py-4 items-center justify-center flex-row shadow-sm shadow-blue-900/20 mt-2"
            >
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-white font-extrabold text-base ml-2">
                Simpan & Cari Tiket
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bagian Riwayat Rute */}
        <View className="px-5 mt-8 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-black text-[#0D3B66]">
              Riwayat Pencarian
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-5 px-5"
          >
            <TouchableOpacity className="bg-white p-4 rounded-2xl mr-4 border border-gray-100 shadow-sm w-44">
              <View className="bg-blue-50 w-10 h-10 rounded-full items-center justify-center mb-3">
                <MaterialCommunityIcons
                  name="bus-side"
                  size={20}
                  color="#0D3B66"
                />
              </View>
              <Text className="font-extrabold text-[#0D3B66] text-base">
                Banda Aceh
              </Text>
              <Ionicons
                name="arrow-down"
                size={14}
                color="#9ca3af"
                style={{ marginVertical: 4 }}
              />
              <Text className="font-extrabold text-[#0D3B66] text-base mb-2">
                Lhokseumawe
              </Text>
              <Text className="text-[#00B4D8] text-xs font-bold">
                Mulai Rp120.000
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-white p-4 rounded-2xl mr-4 border border-gray-100 shadow-sm w-44">
              <View className="bg-blue-50 w-10 h-10 rounded-full items-center justify-center mb-3">
                <MaterialCommunityIcons
                  name="bus-side"
                  size={20}
                  color="#0D3B66"
                />
              </View>
              <Text className="font-extrabold text-[#0D3B66] text-base">
                Lhokseumawe
              </Text>
              <Ionicons
                name="arrow-down"
                size={14}
                color="#9ca3af"
                style={{ marginVertical: 4 }}
              />
              <Text className="font-extrabold text-[#0D3B66] text-base mb-2">
                Medan
              </Text>
              <Text className="text-[#00B4D8] text-xs font-bold">
                Mulai Rp150.000
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
