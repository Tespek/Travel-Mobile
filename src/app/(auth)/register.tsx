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

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    // Simulasi langsung masuk ke beranda setelah daftar
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-[#F1F5F9]">
      {/* LATAR BIRU TETAP */}
      <View className="absolute top-0 left-0 right-0 h-[340px] bg-[#0D3B66] rounded-b-[40px]" />

      <StatusBar barStyle="light-content" />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER: Tombol Kembali & Logo */}
            <View className="flex-row items-center justify-between px-6 mt-4 mb-6">
              <TouchableOpacity
                onPress={() => router.back()}
                className="w-10 h-10 bg-white/20 rounded-full items-center justify-center backdrop-blur-md"
              >
                <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
              </TouchableOpacity>

              <Text className="text-4xl font-extrabold text-white tracking-tighter">
                jalan<Text className="text-[#00B4D8]">ku.</Text>
              </Text>

              <View className="w-10 h-10" />
            </View>

            {/* TEKS JUDUL */}
            <View className="px-6 mb-6">
              <Text className="text-white/80 text-xs font-bold uppercase tracking-widest mb-2">
                Mulai Perjalananmu
              </Text>
              <Text className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                Buat akun baru
              </Text>
              <Text className="text-white/70 text-sm leading-relaxed">
                Isi data dasar agar tiketmu tersimpan dengan aman.
              </Text>
            </View>

            {/* KARTU FORM DAFTAR */}
            <View className="bg-white rounded-[32px] mx-5 p-6 shadow-xl shadow-black/10 mb-6">
              {/* Input Nama */}
              <View className="mb-4">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Nama Lengkap
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="person" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="Nama sesuai identitas"
                    placeholderTextColor="#CBD5E1"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Input Email */}
              <View className="mb-4">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Email
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="mail" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="nama@email.com"
                    placeholderTextColor="#CBD5E1"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Input Nomor Telepon */}
              <View className="mb-4">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Nomor Telepon
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="call" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="08xxxxxxxxxx"
                    placeholderTextColor="#CBD5E1"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              {/* Input Kata Sandi */}
              <View className="mb-4">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Kata Sandi
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="Minimal 8 karakter"
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

              {/* Input Konfirmasi Kata Sandi */}
              <View className="mb-8">
                <Text className="text-gray-500 font-bold text-xs mb-2 ml-1 uppercase tracking-wider">
                  Konfirmasi Kata Sandi
                </Text>
                <View className="flex-row items-center bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-4">
                  <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-[#0D3B66] ml-3 font-medium"
                    placeholder="Ulangi kata sandi"
                    placeholderTextColor="#CBD5E1"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1"
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye" : "eye-off"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tombol Daftar */}
              <TouchableOpacity
                onPress={handleRegister}
                className="bg-[#0D3B66] rounded-2xl py-4 items-center shadow-lg shadow-blue-900/30 mb-6"
              >
                <Text className="text-white font-bold text-lg">Daftar</Text>
              </TouchableOpacity>

              {/* Link Masuk */}
              <View className="flex-row justify-center mb-2">
                <Text className="text-gray-500 text-sm">
                  Sudah punya akun?{" "}
                </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-[#00B4D8] font-bold text-sm">
                      Masuk
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
