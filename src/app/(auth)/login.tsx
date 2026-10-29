/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-[#F1F5F9]">
      {/* LATAR BIRU: Menggunakan tinggi tetap (h-[320px]) agar tidak ikut menyusut/naik saat keyboard muncul */}
      <View className="absolute top-0 left-0 right-0 h-[320px] bg-[#0D3B66] rounded-b-[40px]" />

      <StatusBar barStyle="light-content" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Tambahan keyboardShouldPersistTaps agar tombol bisa langsung diklik meski keyboard sedang terbuka */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* HEADER: Tombol Kembali & Logo */}
            <View className="flex-row items-center justify-between px-6 mt-4 mb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center backdrop-blur-md"
              >
                <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Teks Logo Diperbesar (text-4xl) */}
              <Text className="text-4xl font-extrabold text-white tracking-tighter">
                jalan<Text className="text-[#00B4D8]">ku.</Text>
              </Text>

              <View className="w-10 h-10" />
            </View>

            {/* TEKS JUDUL */}
            <View className="px-6 mb-6">
              <Text className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                Selamat Datang Kembali
              </Text>
              {/* Judul Halaman Diperbesar (text-4xl) */}
              <Text className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                Masuk ke akunmu
              </Text>
              <Text className="text-white/70 text-sm leading-relaxed">
                Lanjutkan rencana perjalananmu yang sempat tertunda.
              </Text>
            </View>

            {/* KARTU FORM LOGIN */}
            <View className="bg-white rounded-[32px] mx-5 p-6 shadow-xl shadow-black/10">
              <View className="mb-5">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Email / Nomor HP
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="mail" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="penumpang@email.com"
                    placeholderTextColor="#CBD5E1"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View className="mb-2">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Kata Sandi
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="••••••••"
                    placeholderTextColor="#CBD5E1"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-1"
                  >
                    <Ionicons
                      name={showPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="items-end mb-8 mt-2">
                <Text className="text-[#00B4D8] font-bold text-sm">
                  Lupa kata sandi?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="bg-[#0D3B66] rounded-2xl py-4 items-center shadow-lg shadow-blue-900/30 mb-6"
              >
                <Text className="text-white font-bold text-lg">Masuk</Text>
              </TouchableOpacity>

              <View className="flex-row justify-center mb-2">
                <Text className="text-gray-500 text-sm">
                  Belum punya akun?{" "}
                </Text>
                <Link href="/(auth)/register" asChild>
                  <TouchableOpacity>
                    <Text className="text-[#00B4D8] font-bold text-sm">
                      Daftar sekarang
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
