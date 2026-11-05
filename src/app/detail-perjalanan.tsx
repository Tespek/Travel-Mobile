import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DetailPerjalananScreen() {
  const router = useRouter();

  // State untuk melacak status perjalanan
  const [statusPerjalanan, setStatusPerjalanan] = useState("Segera berangkat");
  const [warnaStatus, setWarnaStatus] = useState("amber");

  // Fungsi saat tombol "Mulai Perjalanan" diklik
  const handleMulaiPerjalanan = () => {
    Alert.alert(
      "Mulai Perjalanan",
      "Apakah Anda yakin ingin memulai perjalanan ini sekarang?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Mulai",
          onPress: () => {
            setStatusPerjalanan("Sedang Berlangsung");
            setWarnaStatus("blue");
            Alert.alert("Berhasil", "Perjalanan dimulai! Hati-hati di jalan.");
          },
        },
      ],
    );
  };

  // Fungsi saat tombol "Selesaikan Perjalanan" diklik
  const handleSelesaikanPerjalanan = () => {
    Alert.alert(
      "Selesaikan Perjalanan",
      "Pastikan Anda telah sampai di tujuan akhir. Selesaikan perjalanan?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Selesai",
          onPress: () => {
            setStatusPerjalanan("Selesai");
            setWarnaStatus("green");
            Alert.alert(
              "Perjalanan Selesai",
              "Tugas berhasil diselesaikan dan masuk ke riwayat.",
              [
                {
                  text: "OK",
                  onPress: () => router.push("/riwayat-perjalanan"),
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar barStyle="light-content" backgroundColor="#0D3B66" />
      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER BIRU GELAP */}
          <View className="bg-[#0D3B66] px-6 pt-10 pb-8 rounded-b-[40px]">
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                <Text className="text-xl font-black text-white tracking-tighter">
                  <Text className="text-[#0CA789]">✦ Jalan</Text>Ku
                </Text>
                <Text className="text-[10px] font-bold text-gray-300 ml-2 mt-1 uppercase tracking-widest">
                  Driver
                </Text>
              </View>
              {/* Tombol Back */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/10 rounded-full justify-center items-center border border-white/20"
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">
              Detail Perjalanan
            </Text>
            <Text className="text-sm text-gray-300">
              Informasi lengkap tugas perjalanan
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-1">
              Detail Perjalanan
            </Text>
            <Text className="text-xs text-gray-500 mb-6">
              Pastikan detail sesuai sebelum berangkat.
            </Text>

            {/* KARTU INFORMASI UTAMA */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xs text-gray-500">
                  PT Bintang Lestari Putra
                </Text>
                {/* Badge Status Dinamis */}
                <View
                  className={`px-3 py-1.5 rounded-full border ${
                    warnaStatus === "amber"
                      ? "bg-amber-50 border-amber-100"
                      : warnaStatus === "blue"
                        ? "bg-blue-50 border-blue-100"
                        : "bg-green-50 border-green-100"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-bold ${
                      warnaStatus === "amber"
                        ? "text-amber-600"
                        : warnaStatus === "blue"
                          ? "text-blue-600"
                          : "text-green-600"
                    }`}
                  >
                    {statusPerjalanan}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center mb-4">
                <Text className="text-xl font-bold text-[#1e293b]">
                  Banda Aceh
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color="#0CA789"
                  style={{ marginHorizontal: 12 }}
                />
                <Text className="text-xl font-bold text-[#1e293b]">Medan</Text>
              </View>

              <View className="flex-row items-center mb-2">
                <Ionicons name="time-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5 mr-4">
                  08.00 WIB
                </Text>
                <Ionicons name="bus-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5">
                  Toyota Hiace - 10 kursi
                </Text>
              </View>
              <View className="flex-row items-center mb-6">
                <Ionicons name="person-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5">
                  7 penumpang
                </Text>
              </View>

              <View className="flex-row justify-between mb-2">
                <Text className="text-xs text-gray-400">Nomor perjalanan</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  BLP-291026-08
                </Text>
              </View>
              <View className="flex-row justify-between mb-4">
                <Text className="text-xs text-gray-400">Tanggal</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  29 Oktober 2026
                </Text>
              </View>
            </View>

            {/* KARTU INFORMASI DRIVER & RUTE */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between mb-3">
                <Text className="text-xs text-gray-400">Driver</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  Andi Saputra
                </Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text className="text-xs text-gray-400">Kendaraan</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  Toyota Hiace - BLP 01
                </Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text className="text-xs text-gray-400">Titik awal</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  Terminal utama
                </Text>
              </View>
              <View className="flex-row justify-between mb-6">
                <Text className="text-xs text-gray-400">Tujuan akhir</Text>
                <Text className="text-xs font-bold text-[#1e293b]">Medan</Text>
              </View>

              {/* Tombol Lihat Rute */}
              <TouchableOpacity
                onPress={() => router.push("/rute-penjemputan")}
                className="w-full bg-[#0CA789] py-3.5 rounded-xl items-center mb-4"
              >
                <Text className="text-white text-sm font-bold">
                  Lihat Rute & Titik Jemput
                </Text>
              </TouchableOpacity>

              {/* Tombol Mulai Perjalanan */}
              <TouchableOpacity
                onPress={handleMulaiPerjalanan}
                className="w-full bg-white border border-gray-200 py-3.5 rounded-xl items-center mb-3"
              >
                <Text className="text-[#1e293b] text-sm font-bold">
                  Mulai Perjalanan
                </Text>
              </TouchableOpacity>

              {/* Tombol Selesaikan Perjalanan */}
              <TouchableOpacity
                onPress={handleSelesaikanPerjalanan}
                className="w-full bg-[#0CA789] py-3.5 rounded-xl items-center"
              >
                <Text className="text-white text-sm font-bold">
                  Selesaikan Perjalanan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
