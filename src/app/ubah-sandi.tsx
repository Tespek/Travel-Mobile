import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function UbahSandiScreen() {
  const router = useRouter();
  const [sandiLama, setSandiLama] = useState("");
  const [sandiBaru, setSandiBaru] = useState("");
  const [konfirmasiSandi, setKonfirmasiSandi] = useState("");

  // State untuk melihat/menyembunyikan password
  const [lihatSandiLama, setLihatSandiLama] = useState(false);
  const [lihatSandiBaru, setLihatSandiBaru] = useState(false);
  const [lihatKonfirmasi, setLihatKonfirmasi] = useState(false);

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
          Ubah Kata Sandi
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text className="text-xs text-gray-500 mb-6 leading-relaxed">
          Pastikan kata sandi barumu unik dan memiliki minimal 8 karakter yang
          terdiri dari kombinasi huruf dan angka.
        </Text>

        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          {/* Input Kata Sandi Lama */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Kata Sandi Saat Ini
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                secureTextEntry={!lihatSandiLama}
                value={sandiLama}
                onChangeText={setSandiLama}
                placeholder="Masukkan sandi saat ini"
              />
              <TouchableOpacity
                onPress={() => setLihatSandiLama(!lihatSandiLama)}
              >
                <Ionicons
                  name={lihatSandiLama ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Kata Sandi Baru */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Kata Sandi Baru
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="key-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                secureTextEntry={!lihatSandiBaru}
                value={sandiBaru}
                onChangeText={setSandiBaru}
                placeholder="Masukkan sandi baru"
              />
              <TouchableOpacity
                onPress={() => setLihatSandiBaru(!lihatSandiBaru)}
              >
                <Ionicons
                  name={lihatSandiBaru ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Input Konfirmasi Kata Sandi Baru */}
          <View className="mb-6">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Konfirmasi Kata Sandi Baru
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#9CA3AF"
              />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                secureTextEntry={!lihatKonfirmasi}
                value={konfirmasiSandi}
                onChangeText={setKonfirmasiSandi}
                placeholder="Ulangi sandi baru"
              />
              <TouchableOpacity
                onPress={() => setLihatKonfirmasi(!lihatKonfirmasi)}
              >
                <Ionicons
                  name={lihatKonfirmasi ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tombol Simpan */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-full bg-[#0D3B66] py-4 rounded-xl items-center justify-center shadow-sm"
          >
            <Text className="text-white font-extrabold text-sm">
              Simpan Kata Sandi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
