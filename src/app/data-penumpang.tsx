/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function DataPenumpangScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    seats?: string;
    schedule_id?: string;
    origin_name?: string;
    destination_name?: string;
    departure_date?: string;
    departure_time?: string;
    price?: string;
    vehicle_brand?: string;
  }>();

  const seats: number[] = params.seats ? JSON.parse(params.seats) : [];

  const [passengers, setPassengers] = useState<{
    name: string;
    phone: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
  }[]>(
    seats.map(() => ({ name: "", phone: "", address: "", latitude: null, longitude: null }))
  );

  // Ambil hasil dari halaman peta saat kembali
  useFocusEffect(
    useCallback(() => {
      const result = globalThis.__petaLokasi;
      if (result) {
        const { passengerIndex, latitude, longitude, address } = result;
        setPassengers((prev) => {
          const updated = [...prev];
          updated[passengerIndex] = {
            ...updated[passengerIndex],
            address,
            latitude,
            longitude,
          };
          return updated;
        });
        globalThis.__petaLokasi = null;
      }
    }, [])
  );

  const updatePassenger = (index: number, field: "name" | "phone", value: string) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handlePilihPeta = (index: number) => {
    router.push({
      pathname: "/peta-lokasi",
      params: { passenger_index: index },
    } as any);
  };

  const handleHapusLokasi = (index: number) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], address: "", latitude: null, longitude: null };
      return updated;
    });
  };

  const handleLanjutkan = () => {
    const hasEmpty = passengers.some((p) => !p.name.trim());
    if (hasEmpty) {
      Alert.alert("Peringatan", "Nama setiap penumpang wajib diisi.");
      return;
    }

    router.push({
      pathname: "/pembayaran",
      params: {
        seats: params.seats,
        passengers: JSON.stringify(passengers),
        schedule_id: params.schedule_id,
        origin_name: params.origin_name,
        destination_name: params.destination_name,
        departure_date: params.departure_date,
        departure_time: params.departure_time,
        price: params.price,
        vehicle_brand: params.vehicle_brand,
      },
    } as any);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* HEADER */}
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="chevron-back" size={20} color="#0D3B66" />
          </TouchableOpacity>
          <Text className="text-base font-extrabold text-[#0D3B66]">Data penumpang</Text>
          <View className="w-10" />
        </View>

        <View className="flex-row px-5 mt-5">
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-[#00B4D8] rounded-full mr-2" />
          <View className="h-1 flex-1 bg-gray-200 rounded-full mr-2" />
          <View className="h-1 flex-1 bg-gray-200 rounded-full" />
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="px-5 mt-6 mb-4">
            <Text className="text-2xl font-black text-[#0D3B66] mb-1">Siapa yang berangkat?</Text>
            <Text className="text-xs text-gray-500 font-medium leading-relaxed">
              Isi nama setiap penumpang. Tambahkan lokasi jemput jika ingin dijemput.
            </Text>
          </View>

          {seats.map((seatNumber, index) => (
            <View key={seatNumber} className="mx-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4">
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-base font-bold text-[#0D3B66]">Penumpang {index + 1}</Text>
                <View className="bg-blue-50 px-3 py-1.5 rounded-full">
                  <Text className="text-[#00B4D8] text-xs font-extrabold">Kursi {seatNumber}</Text>
                </View>
              </View>

              {/* Nama */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-700 mb-2">Nama lengkap *</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-gray-50 font-medium"
                  placeholder="Nama sesuai identitas"
                  placeholderTextColor="#9CA3AF"
                  value={passengers[index]?.name}
                  onChangeText={(text) => updatePassenger(index, "name", text)}
                />
              </View>

              {/* Nomor HP */}
              <View className="mb-4">
                <Text className="text-xs font-bold text-gray-700 mb-2">Nomor HP (opsional)</Text>
                <TextInput
                  className="border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 bg-gray-50 font-medium"
                  placeholder="08xxxxxxxxxx"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={passengers[index]?.phone}
                  onChangeText={(text) => updatePassenger(index, "phone", text)}
                />
              </View>

              {/* Lokasi Jemput */}
              <View>
                <Text className="text-xs font-bold text-gray-700 mb-2">
                  Lokasi jemput (opsional)
                </Text>

                {passengers[index]?.address ? (
                  // Sudah ada lokasi
                  <View className="border border-green-200 bg-green-50 rounded-xl px-4 py-3">
                    <View className="flex-row items-start justify-between">
                      <View className="flex-1 flex-row items-start">
                        <Ionicons name="location" size={16} color="#16a34a" />
                        <Text className="text-sm text-green-800 font-medium ml-2 flex-1">
                          {passengers[index].address}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={() => handleHapusLokasi(index)} className="ml-2">
                        <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => handlePilihPeta(index)}
                      className="mt-2 flex-row items-center"
                    >
                      <Ionicons name="map-outline" size={14} color="#00B4D8" />
                      <Text className="text-xs text-[#00B4D8] font-bold ml-1">Ubah lokasi</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Belum ada lokasi
                  <TouchableOpacity
                    onPress={() => handlePilihPeta(index)}
                    className="border border-dashed border-gray-300 rounded-xl px-4 py-3.5 flex-row items-center justify-center bg-gray-50"
                  >
                    <Ionicons name="map-outline" size={18} color="#00B4D8" />
                    <Text className="text-sm font-bold text-[#00B4D8] ml-2">
                      Pilih di Peta 📍
                    </Text>
                  </TouchableOpacity>
                )}
                <Text className="text-[10px] text-gray-400 mt-1">
                  Kosongkan jika naik dari terminal
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* TOMBOL LANJUTKAN */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={handleLanjutkan}
          className="bg-[#0D3B66] py-4 rounded-xl items-center flex-row justify-center shadow-sm"
        >
          <Text className="text-white font-extrabold text-base mr-2">Lanjut ke pembayaran</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
