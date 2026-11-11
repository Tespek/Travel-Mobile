import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function RegisterDriverScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");
  const { register, isLoading } = useAuthStore();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nama.trim() || !email.trim() || !phone.trim() || !password) {
      Alert.alert("Peringatan", "Semua kolom wajib diisi.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Peringatan", "Kata sandi minimal 6 karakter.");
      return;
    }
    try {
      await register(nama.trim(), email.trim(), phone.trim(), password, password, "driver");
      router.replace("/(auth)/pending-verification");
    } catch (error: any) {
      const apiErrors = error?.response?.data?.errors;
      const apiMessage = error?.response?.data?.message;
      let message = "Pendaftaran gagal. Coba lagi.";
      if (apiErrors) {
        const firstError = Object.values(apiErrors as Record<string, string[]>)[0];
        message = Array.isArray(firstError) ? firstError[0] : String(firstError);
      } else if (apiMessage) {
        message = apiMessage;
      }
      Alert.alert("Pendaftaran Gagal", message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-12 pb-10 justify-center relative">
            {/* BAGIAN ATAS: Logo & Badge */}
            <View className="items-center mb-6">
              <Text className="text-3xl font-black text-[#0CA789] tracking-tighter mb-1">
                <Text className="text-[#0D3B66]">Jalan</Text>Ku
              </Text>
              <Text className="text-[10px] font-bold text-gray-600 tracking-[2px] mb-2 uppercase">
                PT Bintang Lestari Putra
              </Text>
              <View className="bg-[#0CA789] px-4 py-1 rounded-full">
                <Text className="text-white text-[10px] font-bold tracking-widest">
                  PENDAFTARAN MITRA
                </Text>
              </View>
            </View>

            {/* BAGIAN TENGAH: Form Card */}
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-1">
                Buat Akun Driver
              </Text>
              <Text className="text-xs text-gray-400 mb-6 leading-relaxed">
                Lengkapi data diri dan kendaraan. Akun Anda akan diverifikasi
                oleh Admin.
              </Text>

              {/* Input Nama Lengkap */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Nama Lengkap Sesuai KTP
                </Text>
                <TextInput
                  value={nama}
                  onChangeText={setNama}
                  placeholder="Masukkan nama lengkap"
                  placeholderTextColor="#94A3B8"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] bg-gray-50/50"
                />
              </View>

              {/* Input Email */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="nama@email.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] bg-gray-50/50"
                />
              </View>

              {/* Input Nomor HP */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Nomor WhatsApp Aktif
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Contoh: 08123456789"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] bg-gray-50/50"
                />
              </View>

              {/* Input Kata Sandi */}
              <View className="mb-8">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Kata Sandi
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] bg-gray-50/50"
                />
              </View>

              {/* Tombol Daftar */}
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className="w-full bg-[#0CA789] py-4 rounded-xl items-center"
              >
                <Text className="text-white text-base font-bold">
                  {isLoading ? "Memproses..." : "Ajukan Pendaftaran"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Pindah ke Login */}
            <View className="flex-row justify-center items-center z-10 mb-8">
              <Text className="text-xs text-gray-500">
                Sudah punya akun driver?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/login-driver")}
              >
                <Text className="text-xs font-bold text-[#0CA789]">
                  Masuk di sini
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* AKSEN GELOMBANG BAWAH */}
      <View className="absolute bottom-0 w-full -z-10">
        <Svg
          height="80"
          width={width}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <Path
            fill="#0D3B66"
            fillOpacity="1"
            d="M0,256L480,128L1440,224L1440,320L0,320Z"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
}
