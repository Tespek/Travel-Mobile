import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function PendingVerificationScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-center items-center">
        {/* Ikon Jam Pasir / Menunggu */}
        <View className="w-24 h-24 bg-[#0CA789]/10 rounded-full justify-center items-center mb-8">
          <Ionicons name="time-outline" size={56} color="#0CA789" />
        </View>

        {/* Teks Judul */}
        <Text className="text-2xl font-black text-[#0D3B66] text-center mb-4 tracking-tight">
          Verifikasi Data
        </Text>

        {/* Deskripsi */}
        <Text className="text-sm text-gray-500 text-center leading-relaxed mb-8">
          Terima kasih telah mendaftar! Data dan dokumen kemitraan Anda telah
          kami terima dan sedang dalam antrean pengecekan oleh Admin{" "}
          <Text className="font-bold text-[#1e293b]">
            PT Bintang Lestari Putra
          </Text>
          .
        </Text>

        {/* Kotak Informasi Tambahan */}
        <View className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-10 w-full flex-row items-start">
          <Ionicons name="information-circle" size={20} color="#0CA789" />
          <Text className="text-xs text-gray-600 flex-1 ml-3 leading-relaxed">
            Proses verifikasi biasanya memakan waktu{" "}
            <Text className="font-bold text-[#1e293b]">1x24 jam kerja</Text>.
            Kami akan menghubungi Anda melalui WhatsApp jika akun sudah siap
            digunakan.
          </Text>
        </View>

        {/* Tombol Kembali (Arah ke Login Driver) */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/login-driver")}
          className="w-full bg-[#0D3B66] py-4 rounded-xl items-center shadow-sm"
        >
          <Text className="text-white text-base font-bold">
            Kembali ke Halaman Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
