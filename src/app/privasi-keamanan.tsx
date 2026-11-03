import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PrivasiKeamananScreen() {
  const router = useRouter();
  const [useBiometric, setUseBiometric] = useState(true);

  // Fungsi navigasi yang sudah diperbarui
  const handleUbahSandi = () => {
    router.push("/ubah-sandi");
  };

  const handleKebijakanPrivasi = () => {
    router.push("/kebijakan-privasi");
  };

  const handleHapusAkun = () => {
    Alert.alert(
      "Hapus Akun",
      "Apakah kamu yakin ingin menghapus akun secara permanen? Tindakan ini tidak dapat dibatalkan.",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, Hapus",
          style: "destructive",
          onPress: () => router.replace("/(auth)/login"),
        },
      ],
    );
  };

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
          Privasi dan keamanan
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Bagian Keamanan Akun */}
        <Text className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider ml-2">
          Keamanan Akun
        </Text>
        <View className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-6 overflow-hidden px-5 py-2">
          <View className="flex-row items-center justify-between py-4 border-b border-gray-50">
            <View className="flex-row items-center">
              <Ionicons name="finger-print" size={22} color="#0D3B66" />
              <View className="ml-4">
                <Text className="text-sm font-extrabold text-[#0D3B66]">
                  Login Biometrik
                </Text>
                <Text className="text-[10px] text-gray-400 mt-0.5">
                  Gunakan sidik jari atau Face ID
                </Text>
              </View>
            </View>
            <Switch
              trackColor={{ false: "#E5E7EB", true: "#00B4D8" }}
              thumbColor={"#FFFFFF"}
              value={useBiometric}
              onValueChange={setUseBiometric}
            />
          </View>

          {/* Tombol Ubah Kata Sandi */}
          <TouchableOpacity
            onPress={handleUbahSandi}
            className="flex-row items-center justify-between py-4 border-b border-gray-50"
          >
            <View className="flex-row items-center">
              <Ionicons name="key-outline" size={22} color="#0D3B66" />
              <Text className="text-sm font-extrabold text-[#0D3B66] ml-4">
                Ubah Kata Sandi
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Bagian Privasi */}
        <Text className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider ml-2">
          Privasi Data
        </Text>
        <View className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 overflow-hidden px-5 py-2">
          {/* Tombol Kebijakan Privasi */}
          <TouchableOpacity
            onPress={handleKebijakanPrivasi}
            className="flex-row items-center justify-between py-4 border-b border-gray-50"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#0D3B66"
              />
              <Text className="text-sm font-extrabold text-[#0D3B66] ml-4">
                Kebijakan Privasi
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Tombol Hapus Akun */}
        <TouchableOpacity
          onPress={handleHapusAkun}
          className="border border-red-200 bg-red-50 p-4 rounded-2xl flex-row items-center justify-center mb-6"
        >
          <Ionicons name="trash-outline" size={20} color="#EF4444" />
          <Text className="text-red-500 font-extrabold text-sm ml-2">
            Hapus Akun Secara Permanen
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
