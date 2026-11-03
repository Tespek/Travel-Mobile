import { useRouter } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeDriverScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 
        pt-14: Jarak aman dari atas layar
        pb-16: Jarak bawah diperbesar agar tombol dan teks tidak terlalu mentok ke bawah 
      */}
      <View className="flex-1 px-6 pt-14 pb-16 justify-between">
        {/* BAGIAN ATAS */}
        <View>
          {/* Logo JalanKu */}
          <Text className="text-3xl font-black text-[#0D3B66] mb-8 tracking-tighter">
            Jalan<Text className="text-[#0CA789]">Ku</Text>
          </Text>

          {/* Banner Khusus Driver */}
          <View className="bg-[#087F6C] rounded-3xl p-8 shadow-sm">
            <Text className="text-white/80 text-xs font-black tracking-widest mb-4 uppercase">
              MITRA JALANKU
            </Text>
            <Text className="text-white text-4xl font-black mb-1">
              Ambil Order.
            </Text>
            <Text className="text-white text-4xl font-black mb-1">Jemput.</Text>
            <Text className="text-white text-4xl font-black mb-4">Antar.</Text>
            <Text className="text-white/90 text-sm leading-relaxed mt-2">
              Kelola jadwal keberangkatan, pantau manifest penumpang, dan
              maksimalkan pendapatanmu dalam satu aplikasi.
            </Text>
          </View>
        </View>

        {/* BAGIAN BAWAH */}
        <View>
          {/* Tombol Masuk */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login-driver")} // <-- SUDAH DIPERBAIKI DI SINI
            className="bg-[#0D3B66] py-4 rounded-xl items-center mb-3 shadow-sm"
          >
            <Text className="text-white text-base font-bold">
              Masuk ke akun
            </Text>
          </TouchableOpacity>

          {/* Tombol Daftar */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            className="bg-[#F8FAFC] py-4 rounded-xl items-center mb-8 border border-gray-100"
          >
            <Text className="text-[#0D3B66] text-base font-bold">
              Buat akun mitra baru
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <Text className="text-center text-xs text-gray-400 px-4">
            Dengan melanjutkan, kamu menyetujui{" "}
            <Text className="font-bold text-gray-500">Syarat Layanan</Text> dan{" "}
            <Text className="font-bold text-gray-500">Kebijakan Privasi</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
