import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RiwayatPerjalananScreen() {
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
              {/* Tombol Back */}
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/10 rounded-xl justify-center items-center border border-white/20"
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-bold text-white mb-1">
              Riwayat Perjalanan
            </Text>
            <Text className="text-sm text-gray-300">
              Ringkasan perjalanan yang selesai
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-4">
              Riwayat Perjalanan
            </Text>

            {/* KARTU RIWAYAT (Status Selesai) */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xs text-gray-500">
                  PT Bintang Lestari Putra
                </Text>
                <View className="bg-green-100 px-3 py-1.5 rounded-full">
                  <Text className="text-[10px] font-bold text-green-600">
                    Selesai
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

              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5 mr-3">
                  29 Okt 2026
                </Text>
                <Ionicons name="time-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5 mr-3">
                  08.00 WIB
                </Text>
                <Ionicons name="person-outline" size={14} color="#64748b" />
                <Text className="text-xs text-gray-500 ml-1.5">
                  7 penumpang
                </Text>
              </View>
            </View>

            {/* TOMBOL KEMBALI */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-full bg-white py-4 rounded-xl items-center border border-gray-100 shadow-sm"
            >
              <Text className="text-[#1e293b] text-sm font-bold">Kembali</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
