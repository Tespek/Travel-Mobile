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

export default function DataDiriScreen() {
  const router = useRouter();

  // State awal (bisa disesuaikan nanti jika sudah ada backend)
  const [nama, setNama] = useState("Dul Fitri");
  const [email, setEmail] = useState("dul@test.com");
  const [noHp, setNoHp] = useState("081234567890");

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
          Data diri
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* AVATAR EDIT */}
        <View className="items-center mb-8 mt-4">
          <View className="relative">
            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center border-4 border-white shadow-sm">
              <Text className="text-3xl font-black text-[#0D3B66]">DF</Text>
            </View>
            <TouchableOpacity className="absolute bottom-0 right-0 w-8 h-8 bg-[#00B4D8] rounded-full items-center justify-center border-2 border-white shadow-sm">
              <Ionicons name="camera" size={14} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-xs font-bold text-[#00B4D8] mt-3">
            Ubah Foto Profil
          </Text>
        </View>

        {/* FORM INPUT */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          {/* Input Nama Lengkap */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Nama Lengkap
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="person-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                value={nama}
                onChangeText={setNama}
                placeholder="Masukkan nama lengkap"
              />
            </View>
          </View>

          {/* Input Email */}
          <View className="mb-4">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Alamat Email
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Masukkan email"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Input Nomor HP */}
          <View className="mb-2">
            <Text className="text-xs font-bold text-gray-500 mb-2">
              Nomor Handphone
            </Text>
            <View className="flex-row items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
              <Ionicons name="call-outline" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-sm font-bold text-[#0D3B66]"
                value={noHp}
                onChangeText={setNoHp}
                keyboardType="phone-pad"
                placeholder="Masukkan nomor handphone"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TOMBOL SIMPAN (Fixed di bawah) */}
      <View className="absolute bottom-0 w-full bg-[#F8FAFC] px-5 py-4 pb-6 border-t border-gray-100">
        <TouchableOpacity
          onPress={() => {
            // Nantinya ini bisa memanggil fungsi simpan ke database
            router.back();
          }}
          className="w-full bg-[#0D3B66] py-4 rounded-xl items-center justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base">
            Simpan Perubahan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
