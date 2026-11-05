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

export default function RutePenjemputanScreen() {
  const router = useRouter();

  // Fungsi navigasi ke detail titik jemput
  const bukaDetailTitik = (lokasi: string, waktu: string) => {
    router.push({
      pathname: "/detail-titik-jemput",
      params: { lokasi, waktu },
    });
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
              Rute & Penjemputan
            </Text>
            <Text className="text-sm text-gray-300">
              Urutan lokasi penjemputan hari ini
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-1">
              Rute & Titik Jemput
            </Text>
            <Text className="text-xs text-gray-500 mb-4">
              Ketuk salah satu titik di bawah untuk melihat daftar penumpang.
            </Text>

            {/* ILUSTRASI PETA / KARTU PETA */}
            <View className="bg-[#E6F4EA] rounded-3xl h-44 mb-4 justify-center items-center relative overflow-hidden border border-gray-100 shadow-sm">
              <View className="absolute inset-0 opacity-20 bg-[radial-gradient(#0CA789_1px,transparent_1px)] [background-size:16px_16px]" />
              <View className="w-full h-full absolute justify-center items-center">
                <View className="w-4/5 h-2 bg-[#A3E4D7] rotate-12 rounded-full absolute" />
                <View className="w-3/5 h-2 bg-[#A3E4D7] -rotate-12 rounded-full absolute" />
              </View>
              <View className="absolute left-20 top-12 bg-[#0CA789] px-3 py-1.5 rounded-full flex-row items-center shadow">
                <Ionicons name="location" size={14} color="white" />
                <Text className="text-white text-xs font-bold ml-1">1</Text>
              </View>
              <View className="absolute right-24 bottom-12 bg-[#0D3B66] px-3 py-1.5 rounded-full flex-row items-center shadow">
                <Ionicons name="location" size={14} color="white" />
                <Text className="text-white text-xs font-bold ml-1">2</Text>
              </View>
            </View>

            {/* BANNER PERINGATAN GPS */}
            <View className="bg-amber-50 border border-amber-200/60 rounded-2xl p-3.5 mb-6">
              <Text className="text-xs text-amber-800 text-center font-medium">
                Peta ini hanya ilustrasi. Navigasi GPS belum terhubung.
              </Text>
            </View>

            {/* URUTAN PENJEMPUTAN */}
            <Text className="text-base font-bold text-[#1e293b] mb-4">
              Urutan penjemputan (Ketuk untuk detail)
            </Text>

            {/* ITEM 1: Terminal Utama */}
            <TouchableOpacity
              onPress={() => bukaDetailTitik("Terminal Utama", "08.00 WIB")}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row items-center justify-between mb-3"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-11 h-11 bg-emerald-50 rounded-2xl justify-center items-center mr-3">
                  <Text className="text-[#0CA789] font-bold text-base">1</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1e293b]">
                    Terminal Utama
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    08.00 WIB • 2 penumpang
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* ITEM 2: Pool Mitra */}
            <TouchableOpacity
              onPress={() => bukaDetailTitik("Pool Mitra", "08.10 WIB")}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row items-center justify-between mb-3"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-11 h-11 bg-emerald-50 rounded-2xl justify-center items-center mr-3">
                  <Text className="text-[#0CA789] font-bold text-base">2</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1e293b]">
                    Pool Mitra
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    08.10 WIB • 2 penumpang
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* ITEM 3: Titik Jemput A */}
            <TouchableOpacity
              onPress={() => bukaDetailTitik("Titik Jemput A", "08.20 WIB")}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-row items-center justify-between mb-6"
            >
              <View className="flex-row items-center flex-1">
                <View className="w-11 h-11 bg-emerald-50 rounded-2xl justify-center items-center mr-3">
                  <Text className="text-[#0CA789] font-bold text-base">3</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-[#1e293b]">
                    Titik Jemput A
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    08.20 WIB • 1 penumpang
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* TOMBOL AKSI */}
            <TouchableOpacity
              onPress={() => router.push("/penumpang")}
              className="w-full bg-[#0CA789] py-4 rounded-2xl items-center shadow-sm"
            >
              <Text className="text-white text-sm font-bold">
                Lihat Semua Penumpang
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
