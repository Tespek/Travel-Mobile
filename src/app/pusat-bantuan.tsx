import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PusatBantuanScreen() {
  const router = useRouter();
  const [pesan, setPesan] = useState("");

  const handleKirim = () => {
    if (pesan.trim() === "") {
      Alert.alert(
        "Perhatian",
        "Silakan ketik kesulitan atau pertanyaanmu terlebih dahulu.",
      );
      return;
    }
    // Simulasi pengiriman pesan
    Alert.alert(
      "Terkirim!",
      "Pesan bantuanmu sudah kami terima. Tim CS kami akan segera merespons.",
    );
    setPesan(""); // Kosongkan kolom setelah dikirim
  };

  const FAQItem = ({ question }: { question: string }) => (
    <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
      <Text className="text-sm font-bold text-[#0D3B66] flex-1 mr-4">
        {question}
      </Text>
      <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

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
          Pusat bantuan
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* TEKS SAMBUTAN */}
        <Text className="text-2xl font-black text-[#0D3B66] mb-2">
          Hai, ada yang bisa kami bantu?
        </Text>
        <Text className="text-xs text-gray-500 mb-6">
          Ceritakan kesulitanmu atau pilih topik di bawah ini.
        </Text>

        {/* KOLOM KETIK PESAN / KELUHAN */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-xs font-bold text-[#0D3B66] mb-3">
            Tulis Pertanyaan / Keluhan
          </Text>
          <View className="bg-gray-50 rounded-2xl border border-gray-200 p-4 mb-4">
            <TextInput
              className="text-sm font-medium text-[#0D3B66] h-24"
              placeholder="Contoh: Saya kesulitan saat melakukan pembayaran tiket..."
              placeholderTextColor="#9CA3AF"
              multiline={true}
              textAlignVertical="top" // Agar teks mulai dari atas (khusus Android)
              value={pesan}
              onChangeText={setPesan}
            />
          </View>
          <TouchableOpacity
            onPress={handleKirim}
            className="w-full bg-[#0D3B66] py-3.5 rounded-xl items-center justify-center shadow-sm"
          >
            <Text className="text-white font-extrabold text-sm">
              Kirim Pesan
            </Text>
          </TouchableOpacity>
        </View>

        {/* PERTANYAAN UMUM (FAQ) */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6">
          <Text className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            Pertanyaan Umum
          </Text>
          <FAQItem question="Bagaimana cara membatalkan tiket?" />
          <FAQItem question="Apakah tiket bisa di-refund?" />
          <FAQItem question="Bagaimana cara mengubah jadwal keberangkatan?" />
          <FAQItem question="Di mana saya bisa melihat titik jemput?" />
        </View>

        {/* TOMBOL WHATSAPP CS */}
        <TouchableOpacity className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex-row items-center justify-center mb-4">
          <Ionicons name="logo-whatsapp" size={24} color="#10B981" />
          <Text className="text-emerald-700 font-extrabold text-sm ml-3">
            Chat WhatsApp CS JalanKu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
