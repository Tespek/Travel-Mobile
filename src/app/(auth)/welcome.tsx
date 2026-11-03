import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-8 pb-8 flex-col justify-between">
      {/* BAGIAN ATAS: Logo & Kartu Biru */}
      <View>
        {/* Teks Logo */}
        <Text className="text-3xl font-extrabold text-[#0D3B66] mb-8 tracking-tighter">
          jalan<Text className="text-[#00B4D8]">ku.</Text>
        </Text>

        {/* Kartu Hero */}
        <View className="bg-[#125c7e] rounded-[24px] p-6 overflow-hidden relative min-h-[250px]">
          <Text className="text-white/80 text-[10px] font-bold tracking-widest mb-4">
            PERJALANAN JADI MUDAH
          </Text>
          <Text className="text-white text-4xl font-bold leading-[42px] mb-3 tracking-tight">
            Cari Hiace.{"\n"}Bandingkan.{"\n"}Berangkat.
          </Text>
          <Text className="text-white/90 text-sm mt-2 max-w-[80%] leading-relaxed">
            Temukan jadwal, pilih kursi, dan simpan tiket dalam satu aplikasi.
          </Text>

          {/* Tempat untuk gambar bus & bintang (ekspor dari Figma nanti) */}
          {/* <Image source={require('../../assets/images/bus-icon.png')} className="absolute bottom-4 right-4 w-16 h-16" /> */}
        </View>
      </View>

      {/* BAGIAN BAWAH: Tombol Aksi & Footer */}
      <View className="mt-8">
        {/* Tombol Masuk */}
        <Link href="/(auth)/login" asChild>
          <TouchableOpacity className="bg-[#1e5b96] rounded-xl py-4 items-center mb-3 shadow-sm">
            <Text className="text-white font-bold text-base">
              Masuk ke akun
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Tombol Buat Akun */}
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity className="bg-[#f0f4f8] rounded-xl py-4 items-center mb-6">
            <Text className="text-[#1e5b96] font-bold text-base">
              Buat akun baru
            </Text>
          </TouchableOpacity>
        </Link>

        {/* Teks Kebijakan */}
        <Text className="text-center text-xs text-gray-400 px-4 leading-relaxed">
          Dengan melanjutkan, kamu menyetujui{" "}
          <Text className="font-semibold text-gray-500">Syarat Layanan</Text>{" "}
          dan{" "}
          <Text className="font-semibold text-gray-500">Kebijakan Privasi</Text>
          .
        </Text>
      </View>
    </SafeAreaView>
  );
}
