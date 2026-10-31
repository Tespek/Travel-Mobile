/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // 1. Tambahkan import alat navigasi
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter(); // 2. Aktifkan alat navigasinya di sini

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER: Logo, Sapaan & Avatar */}
        <View className="flex-row items-center justify-between px-6 pt-2 pb-6">
          <View>
            <Text className="text-2xl font-extrabold text-[#0D3B66] tracking-tighter">
              jalan<Text className="text-[#00B4D8]">ku.</Text>
            </Text>
            <Text className="text-gray-500 text-sm mt-1">Halo, Dul 👋</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 bg-[#E2E8F0] rounded-full items-center justify-center">
            <Text className="text-[#0D3B66] font-bold text-sm">DF</Text>
          </TouchableOpacity>
        </View>

        {/* HERO CARD: Kotak Pencarian Biru */}
        <View className="mx-5 bg-[#0D3B66] rounded-[28px] p-5 shadow-lg shadow-blue-900/20">
          <View className="mb-5 mt-2">
            <Text className="text-[#00B4D8] text-[10px] font-bold tracking-widest mb-1.5 uppercase">
              Temukan Rute Terbaik
            </Text>
            <Text className="text-white text-3xl font-extrabold mb-2 tracking-tight">
              Pergi ke mana hari{"\n"}ini?
            </Text>
            <Text className="text-white/70 text-xs">
              Bandingkan operator dan harga sebelum berangkat.
            </Text>
          </View>

          {/* FORM PENCARIAN PUTIH */}
          <View className="bg-white rounded-3xl p-5 shadow-sm">
            {/* Lokasi */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <Text className="text-[10px] font-bold text-gray-400 mb-2 ml-1">
                  DARI
                </Text>
                <View className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100">
                  <Text className="font-bold text-[#0D3B66]">Banda Aceh</Text>
                </View>
              </View>

              <View className="mx-2 mt-5">
                <View className="bg-white border border-gray-100 p-1.5 rounded-full shadow-sm">
                  <Ionicons name="swap-horizontal" size={18} color="#00B4D8" />
                </View>
              </View>

              <View className="flex-1">
                <Text className="text-[10px] font-bold text-gray-400 mb-2 ml-1">
                  KE
                </Text>
                <View className="bg-[#F8FAFC] p-3 rounded-xl border border-gray-100">
                  <Text className="font-bold text-[#0D3B66]">Medan</Text>
                </View>
              </View>
            </View>

            {/* Tanggal */}
            <View className="mb-4">
              <Text className="text-[10px] font-bold text-gray-400 mb-2 ml-1">
                TANGGAL BERANGKAT
              </Text>
              <View className="flex-row items-center justify-between border border-gray-200 p-3.5 rounded-xl">
                <Text className="font-bold text-[#0D3B66]">11/02/2026</Text>
                <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
              </View>
            </View>

            {/* Jumlah Penumpang */}
            <View className="mb-5">
              <Text className="text-[10px] font-bold text-gray-400 mb-2 ml-1">
                JUMLAH PENUMPANG
              </Text>
              <View className="flex-row items-center justify-between border border-gray-200 p-3.5 rounded-xl">
                <Text className="font-bold text-[#0D3B66]">1 penumpang</Text>
                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </View>
            </View>

            {/* Tombol Cari */}
            <TouchableOpacity
              onPress={() => router.push("/search")} // 3. Tambahkan eksekusi pindah ke halaman /search
              className="bg-[#1e5b96] py-4 rounded-xl items-center flex-row justify-center"
            >
              <Text className="text-white font-bold mr-2 text-base">
                Cari perjalanan
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* MENU CEPAT (Quick Menus) */}
        <View className="flex-row justify-between px-6 mt-8">
          {[
            { icon: "search-outline", label: "Cari bus", route: "/search" },
            { icon: "ticket-outline", label: "Tiket saya", route: "/ticket" },
            { icon: "heart-outline", label: "Favorit", route: "/favorites" },
            { icon: "person-outline", label: "Akun", route: "/profile" },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => (item.route ? router.push(item.route) : null)} // Tambahan: Menu cepat juga saya aktifkan navigasinya (opsional)
              className="bg-white w-[75px] h-[75px] rounded-2xl items-center justify-center shadow-sm border border-gray-50"
            >
              <Ionicons
                name={item.icon as any}
                size={26}
                color="#0D3B66"
                className="mb-1.5"
              />
              <Text className="text-[10px] font-bold text-gray-500">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* PERJALANAN POPULER */}
        <View className="px-6 mt-10">
          <Text className="text-[#0D3B66] font-extrabold text-lg mb-4">
            Perjalanan populer
          </Text>

          <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center mb-3 shadow-sm border border-gray-50">
            <View className="w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="business" size={24} color="#1e5b96" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-[#0D3B66] text-sm mb-1">
                Banda Aceh → Medan
              </Text>
              <Text className="text-gray-400 text-xs">
                Bus malam • sekitar 12 jam
              </Text>
            </View>
            <Text className="font-extrabold text-[#0D3B66] text-base">
              Rp180rb+
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-50">
            <View className="w-12 h-12 bg-green-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="leaf" size={24} color="#10B981" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-[#0D3B66] text-sm mb-1">
                Lhokseumawe → Medan
              </Text>
              <Text className="text-gray-400 text-xs">
                Pilihan operator beragam
              </Text>
            </View>
            <Text className="font-extrabold text-[#0D3B66] text-base">
              Rp140rb+
            </Text>
          </TouchableOpacity>
        </View>

        {/* KENAPA JALANKU */}
        <View className="px-6 mt-8 mb-6">
          <Text className="text-[#0D3B66] font-extrabold text-lg mb-4">
            Kenapa JalanKu?
          </Text>
          <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-50">
            <View className="w-11 h-11 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="checkmark-circle" size={24} color="#1e5b96" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-[#0D3B66] text-sm mb-1">
                Bandingkan dalam satu layar
              </Text>
              <Text className="text-gray-400 text-[11px] leading-relaxed">
                Harga, jadwal, fasilitas dan operator.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
