import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DriverDashboardScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar barStyle="light-content" backgroundColor="#0D3B66" />

      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          bounces={false}
        >
          {/* HEADER (Biru Gelap) */}
          <View className="bg-[#0D3B66] px-6 pt-10 pb-32 rounded-b-[40px]">
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                <Text className="text-xl font-black text-white tracking-tighter">
                  <Text className="text-[#0CA789]">✦ Jalan</Text>Ku
                </Text>
                <Text className="text-[10px] font-bold text-gray-300 ml-2 mt-1 uppercase tracking-widest">
                  Driver
                </Text>
              </View>

              {/* TOMBOL PROFIL DI POJOK KANAN ATAS */}
              <TouchableOpacity
                onPress={() => router.push("/profil")}
                className="w-10 h-10 bg-white/10 rounded-full justify-center items-center border border-white/20"
              >
                <Feather name="user" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">
              Selamat pagi, Pak Andi
            </Text>
            <Text className="text-sm text-gray-300">
              Siap untuk perjalanan hari ini?
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 -mt-20">
            {/* 1. KARTU STATUS */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6 flex-row justify-between items-center">
              <View className="flex-1 pr-4">
                <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Status Anda
                </Text>
                <Text className="text-lg font-bold text-[#1e293b] mb-1">
                  {isReady ? "Siap bertugas" : "Sedang istirahat"}
                </Text>
                <Text className="text-[11px] text-gray-500">
                  Anda dapat menerima tugas perjalanan
                </Text>
              </View>
              <Switch
                value={isReady}
                onValueChange={setIsReady}
                trackColor={{ false: "#e2e8f0", true: "#0CA789" }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e2e8f0"
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
              />
            </View>

            {/* 2. JADWAL HARI INI */}
            <View className="flex-row justify-between items-end mb-4">
              <Text className="text-base font-bold text-[#1e293b]">
                Jadwal Hari Ini
              </Text>
              <Text className="text-xs text-gray-400">1 perjalanan</Text>
            </View>

            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xs text-gray-500">
                  PT Bintang Lestari Putra
                </Text>
                <View className="bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                  <Text className="text-[10px] font-bold text-amber-600">
                    Segera berangkat
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
              <View className="flex-row justify-between mb-6">
                <Text className="text-xs text-gray-400">Tanggal</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  29 Oktober 2026
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/detail-perjalanan")}
                className="w-full bg-[#0CA789] py-3.5 rounded-xl items-center"
              >
                <Text className="text-white text-sm font-bold">
                  Lihat Detail Perjalanan
                </Text>
              </TouchableOpacity>
            </View>

            {/* 4. STATISTIK PENUMPANG & KURSI */}
            <View className="flex-row justify-between mb-8">
              <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-1 mr-2 flex-row items-center">
                <View className="bg-[#0CA789]/10 w-10 h-10 rounded-2xl justify-center items-center mr-3">
                  <Ionicons name="person" size={18} color="#0CA789" />
                </View>
                <View>
                  <Text className="text-xl font-black text-[#1e293b]">7</Text>
                  <Text className="text-[10px] text-gray-500 font-medium">
                    Penumpang
                  </Text>
                </View>
              </View>

              <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-1 ml-2 flex-row items-center">
                <View className="bg-[#0CA789]/10 w-10 h-10 rounded-2xl justify-center items-center mr-3">
                  <Ionicons name="cube" size={18} color="#0CA789" />
                </View>
                <View>
                  <Text className="text-xl font-black text-[#1e293b]">10</Text>
                  <Text className="text-[10px] text-gray-500 font-medium">
                    Kapasitas kursi
                  </Text>
                </View>
              </View>
            </View>

            {/* 5. AKSES CEPAT (DENGAN NAVIGASI AKTIF) */}
            <Text className="text-base font-bold text-[#1e293b] mb-4">
              Akses Cepat
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => router.push("/penumpang")}
                className="bg-white rounded-2xl py-4 shadow-sm border border-gray-100 flex-1 mr-2 items-center"
              >
                <Text className="text-xs font-bold text-[#0D3B66]">
                  Daftar Penumpang
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/rute-penjemputan")}
                className="bg-white rounded-2xl py-4 shadow-sm border border-gray-100 flex-1 ml-2 items-center"
              >
                <Text className="text-xs font-bold text-[#0D3B66]">
                  Titik Jemput
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
