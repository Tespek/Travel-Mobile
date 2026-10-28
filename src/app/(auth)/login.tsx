import "../../../global.css";
import { router, type Href } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuthStore } from "../../stores/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Perhatian", "Email dan kata sandi wajib diisi.");
      return;
    }
    try {
      await login(email, password);
      router.replace("/(tabs)/index" as Href);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Login gagal. Periksa kembali email dan kata sandi.";
      Alert.alert("Login Gagal", msg);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">

          {/* Logo & Brand */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 rounded-3xl bg-emerald-500 items-center justify-center mb-4 shadow-lg">
              <Text className="text-white text-3xl font-bold">S</Text>
            </View>
            <Text className="text-white text-2xl font-bold tracking-tight">
              SI-TRAVEL
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              Reservasi Tiket Travel Online
            </Text>
          </View>

          {/* Card Form */}
          <View className="bg-white rounded-3xl p-6 shadow-xl">
            <Text className="text-slate-800 text-xl font-bold mb-1">
              Masuk ke Akun
            </Text>
            <Text className="text-slate-400 text-sm mb-6">
              Masukkan email dan kata sandi Anda
            </Text>

            {/* Email */}
            <View className="mb-4">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Alamat Email
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="nama@email.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View className="mb-6">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Kata Sandi
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Tombol Login */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl items-center ${
                isLoading ? "bg-emerald-400" : "bg-emerald-600"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-sm">
                  Masuk Sekarang
                </Text>
              )}
            </TouchableOpacity>
            
            {/* Link ke Registrasi */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-slate-500 text-sm">Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-emerald-600 text-sm font-semibold">Daftar Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
