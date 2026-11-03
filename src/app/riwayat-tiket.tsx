import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

export default function RiwayatTiketScreen() {
  const router = useRouter();
  const [tabAktif, setTabAktif] = useState("Aktif"); // "Aktif" atau "Selesai"

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER */}
      <View className="bg-white px-5 pt-4 pb-4 flex-row items-center border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
        >
          <Ionicons name="chevron-back" size={24} color="#0D3B66" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#0D3B66] ml-4">
          Riwayat dan tiket
        </Text>
      </View>

      {/* TAB PILIHAN (Aktif / Selesai) */}
      <View className="flex-row px-5 py-4">
        <TouchableOpacity
          onPress={() => setTabAktif("Aktif")}
          className={`flex-1 py-3 rounded-xl items-center mr-2 ${
            tabAktif === "Aktif"
              ? "bg-[#0D3B66]"
              : "bg-white border border-gray-200"
          }`}
        >
          <Text
            className={`font-bold text-sm ${tabAktif === "Aktif" ? "text-white" : "text-gray-400"}`}
          >
            Tiket Aktif
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTabAktif("Selesai")}
          className={`flex-1 py-3 rounded-xl items-center ml-2 ${
            tabAktif === "Selesai"
              ? "bg-[#0D3B66]"
              : "bg-white border border-gray-200"
          }`}
        >
          <Text
            className={`font-bold text-sm ${tabAktif === "Selesai" ? "text-white" : "text-gray-400"}`}
          >
            Selesai
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {tabAktif === "Aktif" ? (
          /* TAMPILAN TIKET AKTIF */
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/ticket")}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4"
          >
            <View className="flex-row justify-between items-center mb-4">
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-[#0D3B66] text-[10px] font-extrabold">
                  2 Nov 2026
                </Text>
              </View>
              <View className="bg-emerald-100 px-3 py-1 rounded-full">
                <Text className="text-emerald-600 text-[10px] font-extrabold">
                  Lunas
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-xs text-gray-400 font-bold mb-1">
                  BANDA ACEH
                </Text>
                <Text className="text-xl font-black text-[#0D3B66]">19:00</Text>
              </View>
              <MaterialCommunityIcons
                name="bus-side"
                size={24}
                color="#00B4D8"
              />
              <View className="items-end">
                <Text className="text-xs text-gray-400 font-bold mb-1">
                  MEDAN
                </Text>
                <Text className="text-xl font-black text-[#0D3B66]">07:00</Text>
              </View>
            </View>

            <View className="border-t border-dashed border-gray-200 pt-4 flex-row justify-between items-center">
              <Text className="text-sm font-bold text-[#0D3B66]">
                PT Bintang Lestari Putra
              </Text>
              <Text className="text-xs font-bold text-[#00B4D8]">
                Lihat Tiket →
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          /* TAMPILAN TIKET SELESAI */
          <View className="items-center justify-center py-20">
            <Ionicons name="receipt-outline" size={60} color="#E5E7EB" />
            <Text className="text-base font-bold text-gray-400 mt-4">
              Belum ada riwayat perjalanan
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
