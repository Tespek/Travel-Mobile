/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCities, type City } from "../services/scheduleService";

export default function FormPencarianScreen() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const [originCity, setOriginCity] = useState<City | null>(null);
  const [destinationCity, setDestinationCity] = useState<City | null>(null);
  const [departureDate, setDepartureDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // format YYYY-MM-DD
  });

  const [modalType, setModalType] = useState<"origin" | "destination" | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Ambil daftar kota dari API
  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => Alert.alert("Error", "Gagal memuat daftar kota."))
      .finally(() => setIsLoadingCities(false));
  }, []);

  const handleSwap = () => {
    const temp = originCity;
    setOriginCity(destinationCity);
    setDestinationCity(temp);
  };

  const handleSearch = () => {
    if (!originCity || !destinationCity) {
      Alert.alert("Peringatan", "Pilih kota asal dan tujuan terlebih dahulu.");
      return;
    }
    if (originCity.id === destinationCity.id) {
      Alert.alert("Peringatan", "Kota asal dan tujuan tidak boleh sama.");
      return;
    }

    router.push({
      pathname: "/schedules",
      params: {
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        departure_date: departureDate,
        origin_name: originCity.name,
        destination_name: destinationCity.name,
      },
    } as any);
  };

  // Format tanggal untuk tampilan
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Navigasi tanggal +1 / -1 hari
  const changeDate = (delta: number) => {
    const date = new Date(departureDate + "T00:00:00");
    date.setDate(date.getDate() + delta);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return; // tidak bisa pilih tanggal lampau
    setDepartureDate(date.toISOString().split("T")[0]);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-[#0D3B66] px-6 pt-6 pb-24 rounded-b-[40px]">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-3xl font-black mb-2">Cari tiket</Text>
          <Text className="text-[#00B4D8] text-sm font-medium">
            Pilih kota asal, tujuan, dan tanggal keberangkatan.
          </Text>
        </View>

        {/* Kartu Form */}
        <View className="px-5 -mt-16">
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">

            {/* Asal */}
            <View className="relative">
              <TouchableOpacity
                onPress={() => setModalType("origin")}
                className="flex-row items-center border-b border-gray-100 pb-5 mb-5 mt-2"
              >
                <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4">
                  <Ionicons name="location" size={20} color="#0D3B66" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Dari</Text>
                  <Text className={`text-lg font-black ${originCity ? "text-gray-900" : "text-gray-300"}`}>
                    {originCity ? originCity.name : "Pilih kota asal"}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              {/* Tombol Swap */}
              <TouchableOpacity
                onPress={handleSwap}
                className="absolute right-4 top-10 bg-blue-50 w-12 h-12 rounded-full items-center justify-center border-4 border-white z-10 shadow-sm"
              >
                <Ionicons name="swap-vertical" size={24} color="#00B4D8" />
              </TouchableOpacity>

              {/* Tujuan */}
              <TouchableOpacity
                onPress={() => setModalType("destination")}
                className="flex-row items-center pb-2"
              >
                <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-4">
                  <Ionicons name="location-outline" size={20} color="#ef4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Ke</Text>
                  <Text className={`text-lg font-black ${destinationCity ? "text-gray-900" : "text-gray-300"}`}>
                    {destinationCity ? destinationCity.name : "Pilih kota tujuan"}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View className="h-[1px] bg-gray-100 my-5" />

            {/* Pilih Tanggal */}
            <View className="mb-6">
              <Text className="text-xs text-gray-400 font-bold mb-3 uppercase tracking-wider">
                Tanggal Keberangkatan
              </Text>
              <View className="flex-row items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                <TouchableOpacity onPress={() => changeDate(-1)} className="p-2">
                  <Ionicons name="chevron-back" size={20} color="#0D3B66" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} className="items-center">
                  <Ionicons name="calendar" size={16} color="#f97316" />
                  <Text className="text-base font-extrabold text-[#0D3B66] mt-1">
                    {formatDisplayDate(departureDate)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeDate(1)} className="p-2">
                  <Ionicons name="chevron-forward" size={20} color="#0D3B66" />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(departureDate + "T00:00:00")}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date()}
                  onChange={(_event: unknown, selectedDate?: Date) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const y = selectedDate.getFullYear();
                      const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
                      const d = String(selectedDate.getDate()).padStart(2, "0");
                      setDepartureDate(`${y}-${m}-${d}`);
                    }
                  }}
                />
              )}
            </View>

            {/* Tombol Cari */}
            <TouchableOpacity
              onPress={handleSearch}
              className="bg-[#1e5b96] rounded-2xl py-4 items-center justify-center flex-row shadow-sm"
            >
              <Ionicons name="search" size={20} color="white" />
              <Text className="text-white font-extrabold text-base ml-2">
                Cari Tiket
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal Pilih Kota */}
      <Modal
        visible={modalType !== null}
        animationType="slide"
        transparent
        onRequestClose={() => setModalType(null)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <TouchableOpacity className="flex-1" onPress={() => setModalType(null)} />
          <View className="bg-white rounded-t-3xl p-6 h-[70%]">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-extrabold text-[#0D3B66]">
                {modalType === "origin" ? "Pilih Kota Asal" : "Pilih Kota Tujuan"}
              </Text>
              <TouchableOpacity onPress={() => setModalType(null)}>
                <Ionicons name="close" size={24} color="#0D3B66" />
              </TouchableOpacity>
            </View>

            {isLoadingCities ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0D3B66" />
                <Text className="text-gray-400 mt-3">Memuat kota...</Text>
              </View>
            ) : (
              <FlatList
                data={cities}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (modalType === "origin") setOriginCity(item);
                      else setDestinationCity(item);
                      setModalType(null);
                    }}
                    className="flex-row items-center py-4 border-b border-gray-50"
                  >
                    <Ionicons name="location-outline" size={20} color="#9CA3AF" />
                    <Text className="ml-3 text-base font-semibold text-gray-800">
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
