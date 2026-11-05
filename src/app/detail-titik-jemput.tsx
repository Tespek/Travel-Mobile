import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetailTitikJemputScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Menerima parameter nama lokasi dan waktu dari halaman sebelumnya
  const namaLokasi = (params.lokasi as string) || "Terminal Utama";
  const waktuJemput = (params.waktu as string) || "08.00 WIB";

  // Data tiruan penumpang berdasarkan titik jemput yang dipilih
  const dataPenumpangs: Record<
    string,
    { nama: string; kursi: string; telepon: string }[]
  > = {
    "Terminal Utama": [
      { nama: "Dina Melisa", kursi: "Kursi 01", telepon: "0812-3456-7890" },
      { nama: "Ahmad Fauzi", kursi: "Kursi 02", telepon: "0813-9876-5432" },
    ],
    "Pool Mitra": [
      { nama: "Siti Rahma", kursi: "Kursi 03", telepon: "0821-1122-3344" },
    ],
    "Titik Jemput A": [
      { nama: "Rizky Pratama", kursi: "Kursi 04", telepon: "0852-5566-7788" },
    ],
  };

  const daftar = dataPenumpangs[namaLokasi] || [];

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar barStyle="light-content" backgroundColor="#0D3B66" />
      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView
          showsVerticalScrollIndicator={false}
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
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/10 rounded-full justify-center items-center border border-white/20"
              >
                <Ionicons name="arrow-back" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">
              {namaLokasi}
            </Text>
            <Text className="text-sm text-gray-300">
              Jadwal penjemputan pukul {waktuJemput}
            </Text>
          </View>

          {/* DAFTAR PENUMPANG DI LOKASI INI */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-1">
              Daftar Penumpang
            </Text>
            <Text className="text-xs text-gray-500 mb-6">
              Penumpang yang harus dijemput pada titik lokasi ini.
            </Text>

            {daftar.map((item, index) => (
              <View
                key={index}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4"
              >
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-emerald-50 rounded-full justify-center items-center mr-3">
                      <Ionicons name="person" size={18} color="#0CA789" />
                    </View>
                    <View>
                      <Text className="text-base font-bold text-[#1e293b]">
                        {item.nama}
                      </Text>
                      <Text className="text-xs text-gray-400">
                        {item.kursi}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                    <Text className="text-[10px] font-bold text-amber-600">
                      Wajib Jemput
                    </Text>
                  </View>
                </View>

                <View className="h-[1px] bg-gray-100 my-3" />

                {/* Tombol Hubungi / Telepon */}
                <TouchableOpacity className="bg-gray-50 border border-gray-200 py-3 rounded-xl flex-row justify-center items-center">
                  <Ionicons name="call-outline" size={16} color="#0D3B66" />
                  <Text className="text-[#0D3B66] text-xs font-bold ml-2">
                    Hubungi ({item.telepon})
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
