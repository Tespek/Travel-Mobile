import { getDriverProfile } from "@/services/driverService";
import { useAuthStore } from "@/stores/authStore";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilScreen() {
  const router = useRouter();
  const { user, logout, refreshUser } = useAuthStore();
  const [mitraName, setMitraName] = useState<string | null>(
    user?.mitra?.name ?? null
  );

  // Urutan prioritas:
  // 1. Sudah ada di store (dari login/loadToken) → langsung pakai
  // 2. Fetch /api/driver/profile → ambil dari sana
  // 3. Refresh /api/user → backend mungkin sudah include mitra, perbarui store
  useEffect(() => {
    if (user?.mitra?.name) {
      setMitraName(user.mitra.name);
      return;
    }
    getDriverProfile()
      .then((profile) => {
        if (profile.mitra?.name) {
          setMitraName(profile.mitra.name);
        } else {
          // Endpoint driver/profile belum ada atau belum return mitra,
          // coba refresh dari /api/user (backend mungkin sudah include relasi)
          return refreshUser().then(() => {
            const updated = useAuthStore.getState().user;
            if (updated?.mitra?.name) {
              setMitraName(updated.mitra.name);
            }
          });
        }
      })
      .catch(() => {
        // Semua gagal — coba refresh user saja
        refreshUser().then(() => {
          const updated = useAuthStore.getState().user;
          if (updated?.mitra?.name) {
            setMitraName(updated.mitra.name);
          }
        }).catch(() => {});
      });
  }, []);

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")
    : "?";

  const handleLogout = () => {
    Alert.alert(
      "Keluar",
      "Apakah kamu yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/login-driver");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar style="light" />

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
              Profil Driver
            </Text>
            <Text className="text-sm text-gray-300">
              Kelola informasi akun Anda
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-4">
              Profil Driver
            </Text>

            {/* KARTU IDENTITAS */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4 flex-row items-center">
              <View className="w-16 h-16 bg-[#0CA789]/10 rounded-2xl justify-center items-center mr-4">
                <Text className="text-xl font-bold text-[#0CA789]">{initials}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-[#1e293b]">
                  {user?.name ?? "-"}
                </Text>
                <Text className="text-xs text-gray-500 mt-0.5 mb-2">
                  Driver{mitraName ? ` · ${mitraName}` : ""}
                </Text>
                <View className="bg-[#0CA789]/10 px-3 py-1.5 rounded-full self-start">
                  <Text className="text-[10px] font-bold text-[#0CA789]">
                    Terverifikasi
                  </Text>
                </View>
              </View>
            </View>

            {/* KARTU DETAIL */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between mb-4">
                <Text className="text-xs text-gray-500">Email</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  {user?.email ?? "-"}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-gray-500">Nomor telepon</Text>
                <Text className="text-xs font-bold text-[#1e293b]">
                  {user?.phone ?? "-"}
                </Text>
              </View>
            </View>

            {/* TOMBOL RIWAYAT PERJALANAN */}
            <TouchableOpacity
              onPress={() => router.push("/riwayat-perjalanan")}
              className="w-full bg-white py-4 rounded-2xl items-center border border-gray-100 shadow-sm mb-4"
            >
              <Text className="text-[#1e293b] text-sm font-bold">
                Riwayat Perjalanan
              </Text>
            </TouchableOpacity>

            {/* TOMBOL LOGOUT */}
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full bg-red-50 py-4 rounded-2xl items-center border border-red-100 shadow-sm"
            >
              <Text className="text-red-500 text-sm font-bold">
                Keluar / Logout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
