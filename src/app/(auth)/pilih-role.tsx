import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function PilihRoleScreen() {
  const router = useRouter();

  // Fungsi saat tombol dipilih sudah diperbaiki
  const handlePilihRole = (role: "customer" | "driver") => {
    if (role === "customer") {
      router.push("/(auth)/welcome"); // Ke halaman welcome penumpang
    } else {
      router.push("/(auth)/welcome-driver"); // Ke halaman welcome khusus driver
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC] justify-center px-6">
      <View className="items-center mb-10">
        <Text className="text-3xl font-black text-[#0D3B66] mb-2">
          Pilih Peran
        </Text>
        <Text className="text-gray-500 text-center px-4">
          Silakan pilih peranmu untuk mendapatkan pengalaman aplikasi yang
          sesuai.
        </Text>
      </View>

      {/* KARTU PILIHAN: PENUMPANG */}
      <TouchableOpacity
        onPress={() => handlePilihRole("customer")}
        className="bg-white p-6 rounded-3xl mb-5 shadow-sm border border-gray-100 flex-row items-center"
      >
        <View className="w-16 h-16 bg-blue-50 rounded-2xl items-center justify-center mr-5">
          <Ionicons name="person-outline" size={32} color="#0D3B66" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-extrabold text-[#0D3B66] mb-1">
            Penumpang
          </Text>
          <Text className="text-xs text-gray-500 leading-relaxed">
            Pesan tiket perjalanan dengan mudah dan nyaman.
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
      </TouchableOpacity>

      {/* KARTU PILIHAN: DRIVER */}
      <TouchableOpacity
        onPress={() => handlePilihRole("driver")}
        className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex-row items-center"
      >
        <View className="w-16 h-16 bg-emerald-50 rounded-2xl items-center justify-center mr-5">
          <Ionicons name="car-sport-outline" size={32} color="#10B981" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-extrabold text-[#10B981] mb-1">
            Driver
          </Text>
          <Text className="text-xs text-gray-500 leading-relaxed">
            Kelola orderan dan pantau rute perjalananmu.
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
