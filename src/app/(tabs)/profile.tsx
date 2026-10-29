/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  // Fungsi simulasi untuk tombol Keluar
  const handleLogout = () => {
    router.replace("/(auth)/login");
  };

  // Komponen bantuan (Reusable Component) agar daftar menu lebih rapi
  const MenuItem = ({ icon, title }: { icon: any; title: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-50 last:border-0">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={22} color="#0D3B66" />
        <Text className="ml-4 font-bold text-[#0D3B66]">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER: Logo & Label Akun */}
        <View className="flex-row items-center justify-between px-6 pt-2 pb-6">
          <Text className="text-2xl font-extrabold text-[#0D3B66] tracking-tighter">
            jalan<Text className="text-[#00B4D8]">ku.</Text>
          </Text>
          <View className="bg-blue-50 px-4 py-2 rounded-full">
            <Text className="text-[#1e5b96] text-[10px] font-bold">
              Akun penumpang
            </Text>
          </View>
        </View>

        {/* KARTU PROFIL UTAMA */}
        <View className="bg-white rounded-[32px] mx-5 p-6 shadow-sm shadow-black/5 items-center mb-6">
          <View className="w-20 h-20 bg-blue-50 rounded-full items-center justify-center mb-4">
            <Text className="text-2xl font-extrabold text-[#1e5b96]">DF</Text>
          </View>
          <Text className="text-xl font-extrabold text-[#0D3B66] mb-1">
            Dul Fitri
          </Text>
          <Text className="text-gray-400 text-sm mb-4">dul@test.com</Text>

          <View className="bg-blue-50/70 px-4 py-2 rounded-full">
            <Text className="text-[#1e5b96] text-xs font-bold">
              Akun terverifikasi (demo)
            </Text>
          </View>
        </View>

        {/* KARTU DAFTAR MENU */}
        <View className="bg-white rounded-[32px] mx-5 px-5 py-2 shadow-sm shadow-black/5 mb-6">
          <MenuItem icon="person-outline" title="Data diri" />
          <MenuItem icon="receipt-outline" title="Riwayat dan tiket" />
          <MenuItem icon="notifications-outline" title="Notifikasi" />
          <MenuItem icon="information-circle-outline" title="Pusat bantuan" />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Privasi dan keamanan"
          />
        </View>

        {/* KARTU TOMBOL KELUAR */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white rounded-[24px] mx-5 p-5 shadow-sm shadow-black/5 flex-row items-center justify-center"
        >
          {/* Ikon log-out dibalik (scaleX: -1) agar panahnya menghadap ke kiri sesuai desainmu */}
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#EF4444"
            style={{ transform: [{ scaleX: -1 }] }}
          />
          <Text className="text-[#EF4444] font-bold text-base ml-3">
            Keluar / Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
