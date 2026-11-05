import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PerjalananScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar barStyle="light-content" backgroundColor="#0D3B66" />
      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER */}
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
              <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full justify-center items-center border border-white/20">
                <Feather name="user" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">
              Perjalanan
            </Text>
            <Text className="text-sm text-gray-300">
              Jadwal dan detail perjalanan Anda
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-1">
              Jadwal Perjalanan
            </Text>
            <Text className="text-xs text-gray-500 mb-6">
              Perjalanan yang ditugaskan kepada Anda.
            </Text>

            {/* KARTU JADWAL AKTIF */}
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

              {/* TOMBOL DETAIL PERJALANAN (PATH DIPERBAIKI) */}
              <TouchableOpacity
                onPress={() => router.push("/detail-perjalanan")}
                className="w-full bg-[#0CA789] py-3.5 rounded-xl items-center"
              >
                <Text className="text-white text-sm font-bold">
                  Lihat Detail Perjalanan
                </Text>
              </TouchableOpacity>
            </View>

            {/* TOMBOL RIWAYAT PERJALANAN (PATH DIPERBAIKI) */}
            <TouchableOpacity
              onPress={() => router.push("/riwayat-perjalanan")}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex-row items-center"
            >
              <View className="bg-gray-50 w-10 h-10 rounded-full justify-center items-center border border-gray-100">
                <Ionicons name="time-outline" size={20} color="#1e293b" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-sm font-bold text-[#1e293b] mb-1">
                  Riwayat perjalanan
                </Text>
                <Text className="text-xs text-gray-400">
                  Lihat perjalanan yang sudah selesai
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
