/// <reference types="nativewind/types" />
import api from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
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

export default function DataDiriScreen() {
  const router = useRouter();
  const { user, loadToken } = useAuthStore();

  const [nama, setNama] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [noHp, setNoHp] = useState(user?.phone ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")
    : "?";

  const handleSimpan = async () => {
    if (!nama.trim()) {
      Alert.alert("Peringatan", "Nama tidak boleh kosong.");
      return;
    }
    setIsLoading(true);
    try {
      await api.put("/user/profile", { name: nama, phone: noHp });
      await loadToken(); // refresh data user di store
      Alert.alert("Berhasil", "Data diri berhasil diperbarui.");
      router.back();
    } catch {
      Alert.alert("Gagal", "Tidak dapat menyimpan perubahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* HEADER */}
      <View className="bg-white px-5 pt-4 pb-4 flex-row items-center border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
        >
          <Ionicons name="chevron-back" size={24} color="#0D3B66" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#0D3B66] ml-4">Data diri</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* AVATAR */}
        <View className="items-center mb-8 mt-4">
          <View className="relative">
            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center border-4 border-white shadow-sm">
              <Text className="text-3xl font-black text-[#0D3B66]">{initials}</Text>
            </View>
          </View>
        </View>

        {/* FORM */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          {/* Nama */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">Nama Lengkap</Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                value={nama}
                onChangeText={setNama}
                placeholder="Masukkan nama lengkap"
                placeholderTextColor="#CBD5E1"
              />
            </View>
          </View>

          {/* Email — read only */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">Alamat Email</Text>
            <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-gray-400"
                value={email}
                editable={false}
                placeholder="Email tidak dapat diubah"
                placeholderTextColor="#CBD5E1"
              />
              <Ionicons name="lock-closed-outline" size={16} color="#CBD5E1" />
            </View>
            <Text className="text-[10px] text-gray-400 mt-1 ml-1">Email tidak dapat diubah</Text>
          </View>

          {/* Nomor HP */}
          <View className="mb-2">
            <Text className="text-xs font-bold text-gray-500 mb-2">Nomor Handphone</Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="call-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                value={noHp}
                onChangeText={setNoHp}
                keyboardType="phone-pad"
                placeholder="Masukkan nomor handphone"
                placeholderTextColor="#CBD5E1"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TOMBOL SIMPAN */}
      <View className="absolute bottom-0 w-full bg-[#F8FAFC] px-5 py-4 pb-6 border-t border-gray-100">
        <TouchableOpacity
          onPress={handleSimpan}
          disabled={isLoading}
          className="w-full bg-[#0D3B66] py-4 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base">
            {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
