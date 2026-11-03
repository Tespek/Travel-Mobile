import { useRouter } from "expo-router";
import { useState } from "react";
import {
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

export default function LoginDriverScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/(driver)/");
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
          <View className="flex-1 px-6 pt-16 pb-10 justify-center relative">
            {/* BAGIAN ATAS: Logo & Badge */}
            <View className="items-center mb-8">
              {/* Logo */}
              <Text className="text-4xl font-black text-[#0D3B66] tracking-tighter mb-1">
                <Text className="text-[#0CA789]">Jalan</Text>Ku
              </Text>

              {/* Subtitle */}
              <Text className="text-[10px] font-bold text-gray-600 tracking-[2px] mb-3 uppercase">
                PT Bintang Lestari Putra
              </Text>

              {/* Badge Driver */}
              <View className="bg-[#0CA789] px-6 py-1.5 rounded-full">
                <Text className="text-white text-xs font-bold tracking-widest">
                  DRIVER
                </Text>
              </View>
            </View>

            {/* BAGIAN TENGAH: Form Card */}
            <View className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-12">
              <Text className="text-xl font-bold text-[#1e293b] mb-1">
                Masuk ke Akun Driver
              </Text>
              <Text className="text-xs text-gray-400 mb-6">
                Masuk untuk mengelola perjalanan Anda.
              </Text>

              {/* Input Nomor HP / Email */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Nomor HP / Email
                </Text>
                <TextInput
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  placeholder="Masukkan nomor HP atau email"
                  placeholderTextColor="#94A3B8"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1e293b] bg-gray-50/50"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Input Kata Sandi */}
              <View className="mb-2">
                <Text className="text-xs font-bold text-[#334155] mb-2">
                  Kata Sandi
                </Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#1e293b] bg-gray-50/50"
                />
              </View>

              {/* Lupa Kata Sandi */}
              <TouchableOpacity className="items-end mb-6">
                <Text className="text-xs font-bold text-[#0CA789]">
                  Lupa kata sandi?
                </Text>
              </TouchableOpacity>

              {/* Tombol Masuk */}
              <TouchableOpacity
                onPress={handleLogin}
                className="w-full bg-[#0CA789] py-4 rounded-xl items-center"
              >
                <Text className="text-white text-base font-bold">Masuk</Text>
              </TouchableOpacity>
            </View>

            {/* Teks Footer */}
            <View className="items-center z-10 mb-8">
              <Text className="text-[10px] text-gray-400">
                Akses khusus pengemudi PT Bintang Lestari Putra
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* AKSEN GELOMBANG BAWAH (Absolute Position) */}
      <View className="absolute bottom-0 w-full -z-10">
        <Svg
          height="80"
          width={width}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* Bentuk asimetris gelap di bagian bawah */}
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
