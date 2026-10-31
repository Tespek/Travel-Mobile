import { Ionicons } from "@expo/vector-icons";
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

export default function SuksesPembayaranScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const seats = params.seats ? JSON.parse(params.seats as string) : [9];
  const passengerCount = seats.length;
  const totalPrice = passengerCount * 180000 + 3000;

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 justify-between">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="close" size={20} color="#0D3B66" />
          </TouchableOpacity>
          <Text className="text-base font-extrabold text-[#0D3B66]">
            Status pembayaran
          </Text>
          <View className="w-10" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        {/* IKON CENTANG SUKSES */}
        <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mt-6 mb-6">
          <Ionicons name="checkmark" size={40} color="#10B981" />
        </View>

        {/* JUDUL */}
        <Text className="text-2xl font-black text-[#0D3B66] mb-2 text-center">
          Pembayaran berhasil!
        </Text>
        <Text className="text-xs text-gray-500 font-medium text-center px-6 leading-relaxed mb-8">
          Tiket digital sudah tersedia di akunmu. Simpan detail ini saat akan
          naik.
        </Text>

        {/* KARTU RINCIAN TRANSAKSI */}
        <View className="w-full bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">
              Nomor pesanan
            </Text>
            <Text className="text-xs font-bold text-[#0D3B66]">
              JK-261102-4235
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xs text-gray-400 font-medium">Metode</Text>
            <Text className="text-xs font-bold text-[#0D3B66]">
              Virtual Account BCA
            </Text>
          </View>
          <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
            <Text className="text-xs text-gray-400 font-medium">Total</Text>
            <Text className="text-base font-black text-[#0D3B66]">
              Rp{totalPrice.toLocaleString("id-ID")}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* TOMBOL AKSI BAWAH */}
      <View className="absolute bottom-0 w-full bg-[#F8FAFC] px-5 py-4 pb-6 space-y-3">
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/ticket")}
          className="w-full bg-[#0D3B66] py-4 rounded-xl items-center justify-center shadow-sm mb-2"
        >
          <Text className="text-white font-extrabold text-base">
            Lihat tiket digital →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="w-full bg-white border border-gray-200 py-4 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-[#0D3B66] font-extrabold text-base">
            Kembali ke beranda
          </Text>
        </TouchableOpacity>

        <Text className="text-[10px] text-gray-400 text-center mt-2">
          Transaksi ini hanya simulasi untuk kebutuhan prototype.
        </Text>
      </View>
    </SafeAreaView>
  );
}
