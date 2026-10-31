import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function DataPenumpangScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Mengubah data kursi yang dikirim (string) kembali menjadi Array angka
  // Fallback ke [9] jika tidak ada data (misal saat kamu refresh halaman ini langsung)
  const seats = params.seats ? JSON.parse(params.seats as string) : [9];

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      {/* HEADER NAVIGATION & PROGRESS BAR */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="chevron-back" size={20} color="#0D3B66" />
          </TouchableOpacity>
          <Text className="text-base font-extrabold text-[#0D3B66]">
            Data penumpang
          </Text>
          <View className="w-10" />
        </View>

        {/* Progress Bar (4 Step - Step 2 Aktif) */}
        <View className="flex-row px-5 mt-5">
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-gray-200 rounded-full mr-2" />
          <View className="h-1 flex-1 bg-gray-200 rounded-full" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* JUDUL */}
          <View className="px-5 mt-6 mb-4">
            <Text className="text-2xl font-black text-[#0D3B66] mb-1">
              Siapa yang berangkat?
            </Text>
            <Text className="text-xs text-gray-500 font-medium leading-relaxed">
              Isi nama setiap penumpang sesuai identitas. Setiap penumpang
              memiliki satu kursi.
            </Text>
          </View>

          {/* FORM DINAMIS: MENGULANG SEBANYAK KURSI YANG DIPILIH */}
          {seats.map((seatNumber: number, index: number) => (
            <View
              key={seatNumber}
              className="mx-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4"
            >
              {/* Header Kartu Penumpang */}
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-base font-bold text-[#0D3B66]">
                  Penumpang {index + 1}
                </Text>
                <View className="bg-blue-50 px-3 py-1.5 rounded-full">
                  <Text className="text-[#00B4D8] text-xs font-extrabold">
                    Kursi {seatNumber}
                  </Text>
                </View>
              </View>

              {/* Input Nama */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-700 mb-2">
                  Nama lengkap sesuai identitas
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-gray-50 font-medium"
                  placeholder="Contoh: Aulia Fauzi"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Input Nomor HP */}
              <View>
                <Text className="text-xs font-bold text-gray-700 mb-2">
                  Nomor HP (opsional)
                </Text>
                <TextInput
                  className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-gray-50 font-medium"
                  placeholder="08xxxxxxxxxx"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* STICKY BOTTOM BUTTON DENGAN NAVIGASI KE LOKASI JEMPUT */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/lokasi-jemput",
              params: { seats: JSON.stringify(seats) }, // Mengirim data kursi ke halaman selanjutnya
            })
          }
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base mr-2">
            Lanjut ke lokasi jemput
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
