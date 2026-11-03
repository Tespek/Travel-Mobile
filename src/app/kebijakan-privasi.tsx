import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function KebijakanPrivasiScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER */}
      <View className="bg-white px-5 pt-4 pb-4 flex-row items-center border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
        >
          <Ionicons name="chevron-back" size={24} color="#0D3B66" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#0D3B66] ml-4">
          Kebijakan Privasi
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-xs font-bold text-[#00B4D8] mb-2 uppercase tracking-widest">
            Terakhir Diperbarui: Nov 2026
          </Text>
          <Text className="text-2xl font-black text-[#0D3B66] mb-4">
            Kebijakan Privasi JalanKu
          </Text>

          <Text className="text-sm text-gray-500 leading-relaxed mb-6">
            Di JalanKu, privasi Anda adalah prioritas kami. Dokumen ini
            menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi
            informasi pribadi Anda saat menggunakan aplikasi kami.
          </Text>

          <Text className="text-base font-extrabold text-[#0D3B66] mb-2">
            1. Informasi yang Kami Kumpulkan
          </Text>
          <Text className="text-sm text-gray-500 leading-relaxed mb-4">
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada
            kami, seperti nama, alamat email, nomor telepon, dan data pembayaran
            saat Anda melakukan pendaftaran akun atau pemesanan tiket.
          </Text>

          <Text className="text-base font-extrabold text-[#0D3B66] mb-2">
            2. Penggunaan Informasi
          </Text>
          <Text className="text-sm text-gray-500 leading-relaxed mb-4">
            Informasi yang kami kumpulkan digunakan untuk memproses transaksi
            tiket, mengirimkan notifikasi perjalanan, serta meningkatkan layanan
            dan keamanan aplikasi JalanKu.
          </Text>

          <Text className="text-base font-extrabold text-[#0D3B66] mb-2">
            3. Perlindungan Data
          </Text>
          <Text className="text-sm text-gray-500 leading-relaxed mb-6">
            Kami menerapkan langkah-langkah keamanan teknis yang ketat untuk
            melindungi data pribadi Anda dari akses, pengungkapan, atau
            modifikasi yang tidak sah. Data Anda tidak akan pernah kami jual
            kepada pihak ketiga.
          </Text>

          <View className="bg-blue-50 p-4 rounded-xl">
            <Text className="text-xs font-bold text-[#0D3B66] leading-relaxed text-center">
              Dengan menggunakan layanan JalanKu, Anda menyetujui pengumpulan
              dan penggunaan informasi sesuai dengan kebijakan ini.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
