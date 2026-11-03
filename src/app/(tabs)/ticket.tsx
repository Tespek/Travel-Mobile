import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TiketDigitalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Mengecek apakah ada data tiket (kursi) yang dikirim dari proses pembayaran
  const hasTicket = !!params.seats;
  const seats = hasTicket ? JSON.parse(params.seats as string) : [];

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER ATAS */}
      <View className="px-5 pt-4 pb-2 flex-row justify-between items-center bg-[#F8FAFC]">
        <View>
          <Text className="text-xl font-black text-[#0D3B66]">
            jalan<Text className="text-[#00B4D8]">ku.</Text>
          </Text>
          <Text className="text-[11px] text-gray-400 font-medium">
            Tiket digital
          </Text>
        </View>
        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
          <Text className="text-[#0D3B66] font-bold text-xs">AF</Text>
        </View>
      </View>

      {hasTicket ? (
        /* ================= TAMPILAN JIKA ADA TIKET ================= */
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          {/* JUDUL HALAMAN & BADGE LUNAS */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-black text-[#0D3B66]">
                Tiket perjalanan
              </Text>
              <Text className="text-xs text-gray-500 font-medium mt-0.5">
                Tunjukan tiket ini saat naik.
              </Text>
            </View>
            <View className="bg-emerald-100 px-3.5 py-1 rounded-full flex-row items-center">
              <View className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5" />
              <Text className="text-emerald-700 text-xs font-bold">Lunas</Text>
            </View>
          </View>

          {/* KARTU TIKET UTAMA (Menampilkan Kursi Pertama) */}
          <View className="bg-[#0D3B66] rounded-3xl p-6 shadow-md mb-6 relative overflow-hidden">
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-[10px] text-blue-200 uppercase tracking-widest font-bold mb-0.5">
                  OPERATOR
                </Text>
                <Text className="text-base font-extrabold text-white">
                  PT Bintang Lestari Putra
                </Text>
              </View>
              <View className="w-10 h-10 bg-blue-900/80 rounded-2xl items-center justify-center border border-blue-800">
                <MaterialCommunityIcons name="bus" size={22} color="#00B4D8" />
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-[10px] text-blue-200 uppercase font-bold">
                  BANDA ACEH
                </Text>
                <Text className="text-2xl font-black text-white mt-0.5">
                  19:00
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#00B4D8" />
              <View className="items-end">
                <Text className="text-[10px] text-blue-200 uppercase font-bold">
                  MEDAN
                </Text>
                <Text className="text-2xl font-black text-white mt-0.5">
                  07:00
                </Text>
              </View>
            </View>

            <View className="border-b border-dashed border-blue-800/80 mb-6" />

            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text className="text-[10px] text-blue-200 uppercase font-bold">
                  NAMA PENUMPANG
                </Text>
                <Text className="text-sm font-bold text-white mt-0.5">
                  Aulia Fauzi (+{seats.length - 1} lainnya)
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-[10px] text-blue-200 uppercase font-bold">
                  KURSI
                </Text>
                <Text className="text-2xl font-black text-[#00B4D8] mt-0.5">
                  {seats[0]}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-end mb-6">
              <View>
                <Text className="text-[10px] text-blue-200 uppercase font-bold">
                  TANGGAL BERANGKAT
                </Text>
                <Text className="text-xs font-bold text-white mt-0.5">
                  2 November 2026
                </Text>

                <Text className="text-[10px] text-blue-200 uppercase font-bold mt-3">
                  TITIK PENJEMPUTAN
                </Text>
                <Text className="text-xs font-bold text-white mt-0.5">
                  Terminal Batoh
                </Text>
              </View>
              <View className="w-16 h-16 bg-white rounded-xl items-center justify-center p-2 shadow">
                <MaterialCommunityIcons
                  name="qrcode"
                  size={36}
                  color="#0D3B66"
                />
              </View>
            </View>

            <View className="bg-white/10 p-3 rounded-xl items-center">
              <View className="flex-row items-center justify-center space-x-1 h-8">
                <View className="w-1 h-full bg-white mx-0.5" />
                <View className="w-2 h-full bg-white mx-0.5" />
                <View className="w-0.5 h-full bg-white mx-0.5" />
                <View className="w-1.5 h-full bg-white mx-0.5" />
                <View className="w-3 h-full bg-white mx-0.5" />
                <View className="w-1 h-full bg-white mx-0.5" />
                <View className="w-0.5 h-full bg-white mx-0.5" />
              </View>
              <Text className="text-[10px] text-blue-200 font-mono tracking-widest mt-2">
                JK-261102-4235
              </Text>
            </View>
          </View>

          {/* KARTU RINCIAN TIKET PENUMPANG (Berulang sesuai jumlah kursi) */}
          <Text className="text-xs font-bold text-[#0D3B66] mb-3">
            Rincian tiket penumpang
          </Text>
          {seats.map((seat: number, index: number) => (
            <View
              key={seat}
              className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-3"
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm font-extrabold text-gray-900">
                  Penumpang {index + 1}
                </Text>
                <View className="bg-emerald-50 px-2.5 py-1 rounded-full">
                  <Text className="text-emerald-600 text-[10px] font-extrabold">
                    Kursi {seat}
                  </Text>
                </View>
              </View>
              <Text className="text-xs text-gray-500 font-medium mb-1">
                Titik jemput: Terminal Batoh
              </Text>
              <Text className="text-[11px] text-gray-400 font-mono">
                Kode tiket: JK-261102-4235-{index + 1}
              </Text>
            </View>
          ))}

          <View className="bg-amber-50 border border-amber-200 p-4 rounded-2xl mt-3 mb-4">
            <Text className="text-[11px] text-amber-800 leading-relaxed font-medium">
              Ini adalah tiket hasil simulasi prototype tanpa backend. Data
              dikirimkan sementara.
            </Text>
          </View>
        </ScrollView>
      ) : (
        /* ================= TAMPILAN JIKA BELUM ADA TIKET ================= */
        <View className="flex-1 items-center justify-center px-8 pb-20">
          <Ionicons name="ticket-outline" size={80} color="#E5E7EB" />
          <Text className="text-xl font-bold text-[#0D3B66] mt-5 mb-2 text-center">
            Belum ada tiket aktif
          </Text>
          <Text className="text-xs text-gray-400 text-center font-medium leading-relaxed mb-8">
            Tiket perjalanan yang sudah kamu bayar akan muncul dan tersimpan
            secara digital di sini.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="bg-[#00B4D8] px-8 py-3.5 rounded-xl shadow-sm"
          >
            <Text className="text-white font-extrabold">
              Cari Travel Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
