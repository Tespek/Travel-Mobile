import "../../../global.css";
import { router } from "expo-router";
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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { register, isLoading } = useAuthStore();

  const handleRegister = async () => {
    if (!name || !email || !password || !passwordConfirmation) {
      Alert.alert("Perhatian", "Semua field wajib diisi.");
      return;
    }
    if (password !== passwordConfirmation) {
      Alert.alert("Perhatian", "Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Perhatian", "Kata sandi minimal 6 karakter.");
      return;
    }
    try {
      await register(name, email, phone, password, passwordConfirmation);
      router.replace("/(tabs)");
    } catch (error: any) {
      const errors = error?.response?.data?.errors;
      const msg = errors
        ? Object.values(errors).flat().join("\n")
        : error?.response?.data?.message || "Registrasi gagal. Coba lagi.";
      Alert.alert("Gagal", msg);
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
          <View className="items-center mb-8">
            <View className="w-16 h-16 rounded-2xl bg-emerald-500 items-center justify-center mb-3 shadow-lg">
              <Text className="text-white text-2xl font-bold">S</Text>
            </View>
            <Text className="text-white text-2xl font-bold tracking-tight">
              SI-TRAVEL
            </Text>
            <Text className="text-slate-400 text-sm mt-1">
              Buat akun penumpang baru
            </Text>
          </View>

          {/* Card Form */}
          <View className="bg-white rounded-3xl p-6 shadow-xl">
            <Text className="text-slate-800 text-xl font-bold mb-1">
              Buat Akun Baru
            </Text>
            <Text className="text-slate-400 text-sm mb-5">
              Lengkapi data diri Anda untuk mendaftar
            </Text>

            {/* Nama Lengkap */}
            <View className="mb-4">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Nama Lengkap
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="Masukkan nama lengkap"
                placeholderTextColor="#94a3b8"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            {/* Nomor HP */}
            <View className="mb-4">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Nomor HP
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="08xxxxxxxxxx"
                placeholderTextColor="#94a3b8"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            {/* Password */}
            <View className="mb-4">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Kata Sandi
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="Minimal 6 karakter"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Konfirmasi Password */}
            <View className="mb-6">
              <Text className="text-slate-700 text-sm font-semibold mb-1.5">
                Konfirmasi Kata Sandi
              </Text>
              <TextInput
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-slate-50"
                placeholder="Ulangi kata sandi"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
              />
            </View>

            {/* Tombol Daftar */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl items-center ${
                isLoading ? "bg-emerald-400" : "bg-emerald-600"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-sm">
                  Daftar Sekarang
                </Text>
              )}
            </TouchableOpacity>

            {/* Link ke Login */}
            <View className="flex-row justify-center mt-4">
              <Text className="text-slate-500 text-sm">Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-emerald-600 text-sm font-semibold">
                  Masuk di sini
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
