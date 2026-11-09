/// <reference types="nativewind/types" />
import { getCities, type City } from "@/services/scheduleService";
import { useAuthStore } from "@/stores/authStore";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";


export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [cities, setCities] = useState<City[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [originCity, setOriginCity] = useState<City | null>(null);
  const [destinationCity, setDestinationCity] = useState<City | null>(null);
  const [modalType, setModalType] = useState<"origin" | "destination" | null>(null);
  const [departureDate, setDepartureDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const params = useLocalSearchParams<{
    origin_city_id?: string;
    destination_city_id?: string;
    departure_date?: string;
    origin_name?: string;
    destination_name?: string;
  }>();

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => Alert.alert("Error", "Gagal memuat daftar kota."))
      .finally(() => setIsLoadingCities(false));
  }, []);

   // Auto-search saat menerima parameter dari beranda
  useEffect(() => {
    if (params.origin_city_id && params.destination_city_id && params.departure_date && cities.length > 0) {
      const origin = cities.find((c) => String(c.id) === params.origin_city_id);
      const destination = cities.find((c) => String(c.id) === params.destination_city_id);
      if (origin && destination) {
        setOriginCity(origin);
        setDestinationCity(destination);
        setDepartureDate(params.departure_date);
      }
    }
  }, [cities]);

  const changeDate = (delta: number) => {
    const date = new Date(departureDate + "T00:00:00");
    date.setDate(date.getDate() + delta);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    setDepartureDate(date.toISOString().split("T")[0]);
  };

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

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
      pathname: "/(tabs)/search",
      params: {
        origin_city_id: originCity.id,
        destination_city_id: destinationCity.id,
        departure_date: departureDate,
        origin_name: originCity.name,
        destination_name: destinationCity.name,
      },
    } as any);
  };

  const initials = user?.name
    ? user.name.split(" ").slice(0, 2).map((n) => n[0].toUpperCase()).join("")
    : "?";

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View className="flex-row items-center justify-between px-6 pt-2 pb-6">
          <View>
            <Text className="text-2xl font-extrabold text-[#0D3B66] tracking-tighter">
              jalan<Text className="text-[#00B4D8]">ku.</Text>
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              Halo, {user?.name?.split(" ")[0] ?? "Penumpang"} 👋
            </Text>
          </View>
          <TouchableOpacity className="w-11 h-11 bg-[#E2E8F0] rounded-full items-center justify-center">
            <Text className="text-[#0D3B66] font-bold text-sm">{initials}</Text>
          </TouchableOpacity>
        </View>

        {/* HERO CARD */}
        <View className="mx-5 bg-[#0D3B66] rounded-[28px] p-5 shadow-lg shadow-blue-900/20">
          <View className="mb-5 mt-2">
            <Text className="text-[#00B4D8] text-[10px] font-bold tracking-widest mb-1.5 uppercase">
              Temukan Rute Terbaik
            </Text>
            <Text className="text-white text-3xl font-extrabold mb-2 tracking-tight">
              Pergi ke mana hari{"\n"}ini?
            </Text>
            <Text className="text-white/70 text-xs">
              Bandingkan operator dan harga sebelum berangkat.
            </Text>
          </View>

          {/* FORM PENCARIAN */}
          <View className="bg-white rounded-3xl p-5 shadow-sm">

            {/* DARI & KE */}
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() => setModalType("origin")}
                className="flex-1 bg-[#F8FAFC] p-3 rounded-xl border border-gray-100"
              >
                <Text className="text-[10px] font-bold text-gray-400 mb-1">DARI</Text>
                <Text className={`font-bold ${originCity ? "text-[#0D3B66]" : "text-gray-300"}`}>
                  {originCity ? originCity.name : "Pilih kota"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSwap} className="mx-2 mt-2">
                <View className="bg-white border border-gray-100 p-1.5 rounded-full shadow-sm">
                  <Ionicons name="swap-horizontal" size={18} color="#00B4D8" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalType("destination")}
                className="flex-1 bg-[#F8FAFC] p-3 rounded-xl border border-gray-100"
              >
                <Text className="text-[10px] font-bold text-gray-400 mb-1">KE</Text>
                <Text className={`font-bold ${destinationCity ? "text-[#0D3B66]" : "text-gray-300"}`}>
                  {destinationCity ? destinationCity.name : "Pilih kota"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* TANGGAL */}
            <View className="mb-4">
              <Text className="text-[10px] font-bold text-gray-400 mb-2 ml-1">
                TANGGAL BERANGKAT
              </Text>
              <View className="flex-row items-center justify-between border border-gray-200 rounded-xl">
                <TouchableOpacity onPress={() => changeDate(-1)} className="px-3 py-3.5">
                  <Ionicons name="chevron-back" size={18} color="#0D3B66" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} className="flex-1 items-center py-3">
                  <Text className="font-bold text-[#0D3B66]">{formatDisplayDate(departureDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeDate(1)} className="px-3 py-3.5">
                  <Ionicons name="chevron-forward" size={18} color="#0D3B66" />
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(departureDate + "T00:00:00")}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
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


            {/* TOMBOL CARI */}
            <TouchableOpacity
              onPress={handleSearch}
              className="bg-[#1e5b96] py-4 rounded-xl items-center flex-row justify-center"
            >
              <Text className="text-white font-bold mr-2 text-base">Cari perjalanan</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* MENU CEPAT */}
        <View className="flex-row justify-between px-6 mt-8">
          {[
            { icon: "search-outline", label: "Cari bus", route: "/(tabs)/search" },
            { icon: "ticket-outline", label: "Tiket saya", route: "/(tabs)/ticket" },
            { icon: "heart-outline", label: "Favorit", route: null },
            { icon: "person-outline", label: "Akun", route: "/(tabs)/profile" },
          ].map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => item.route ? router.push(item.route as any) : null}
              className="bg-white w-[75px] h-[75px] rounded-2xl items-center justify-center shadow-sm border border-gray-50"
            >
              <Ionicons name={item.icon as any} size={26} color="#0D3B66" />
              <Text className="text-[10px] font-bold text-gray-500 mt-1">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* KENAPA JALANKU */}
        <View className="px-6 mt-8 mb-6">
          <Text className="text-[#0D3B66] font-extrabold text-lg mb-4">Kenapa JalanKu?</Text>
          <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-50">
            <View className="w-11 h-11 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="checkmark-circle" size={24} color="#1e5b96" />
            </View>
            <View className="flex-1">
              <Text className="font-extrabold text-[#0D3B66] text-sm mb-1">
                Bandingkan dalam satu layar
              </Text>
              <Text className="text-gray-400 text-[11px] leading-relaxed">
                Harga, jadwal, fasilitas dan operator.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* MODAL PILIH KOTA */}
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
                    <Text className="ml-3 text-base font-semibold text-gray-800">{item.name}</Text>
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
