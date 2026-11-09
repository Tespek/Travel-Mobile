/// <reference types="nativewind/types" />
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { getCities, searchSchedules, type City, type Schedule } from "../../services/scheduleService";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function SearchScreen() {
  const router = useRouter();

  // State pencarian
  const [cities, setCities] = useState<City[]>([]);
  const [originCity, setOriginCity] = useState<City | null>(null);
  const [destinationCity, setDestinationCity] = useState<City | null>(null);
  const [departureDate, setDepartureDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });
  const [modalType, setModalType] = useState<"origin" | "destination" | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State hasil
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter & sort
  const [activeFilter, setActiveFilter] = useState("Direkomendasikan");
  const [isFilterVisible, setFilterVisible] = useState(false);

  // Ambil daftar kota
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

    setIsLoadingSchedules(true);
    setHasSearched(true);

    searchSchedules({
      origin_city_id: originCity.id,
      destination_city_id: destinationCity.id,
      departure_date: departureDate,
    })
      .then((data) => {
        // Sort sesuai filter aktif
        if (activeFilter === "Harga termurah ↑") {
          data.sort((a, b) => a.route.price - b.route.price);
        } else if (activeFilter === "Jam berangkat") {
          data.sort((a, b) => a.departure_time.localeCompare(b.departure_time));
        }
        setSchedules(data);
      })
      .catch(() => Alert.alert("Gagal", "Tidak dapat memuat jadwal. Coba lagi."))
      .finally(() => setIsLoadingSchedules(false));
  };

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
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const FilterChip = ({ label }: { label: string }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(label)}
      className={`px-4 py-2 rounded-full border mr-2 ${
        activeFilter === label ? "bg-blue-50 border-[#0D3B66]" : "bg-white border-gray-200"
      }`}
    >
      <Text className={activeFilter === label ? "text-[#0D3B66] font-bold" : "text-gray-600"}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderScheduleCard = ({ item }: { item: Schedule }) => {
    const isSoldOut = item.available_seats === 0;
    return (
      <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-row items-center flex-1">
            <View className="bg-blue-50 p-2 rounded-full mr-3">
              <Ionicons name="bus" size={24} color="#0D3B66" />
            </View>
            <View className="flex-1 pr-2">
              <Text className="text-base font-bold text-gray-900 leading-tight">
                {item.vehicle.brand}
              </Text>
              <Text className="text-xs text-gray-500 mt-1">
                No. Plat: {item.vehicle.plate_number}
              </Text>
            </View>
          </View>
          <View className={`px-2 py-1 rounded-md ${isSoldOut ? "bg-red-100" : "bg-green-100"}`}>
            <Text className={`text-[10px] font-bold ${isSoldOut ? "text-red-700" : "text-green-700"}`}>
              {isSoldOut ? "Habis" : `${item.available_seats} kursi`}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mb-4 px-2">
          <View className="items-center">
            <Text className="text-xl font-bold text-gray-900">
              {item.departure_time.substring(0, 5)}
            </Text>
            <Text className="text-xs text-gray-500">{item.route.origin}</Text>
          </View>

          <View className="items-center flex-1 px-4">
            <Text className="text-[10px] text-gray-400 mb-1">
              {item.route.estimated_duration}
            </Text>
            <View className="w-full h-[2px] bg-gray-100 relative justify-center items-center rounded-full">
              <View className="w-2 h-2 rounded-full bg-gray-300 absolute left-0" />
              <View className="w-2 h-2 rounded-full bg-gray-300 absolute right-0" />
            </View>
            <Text className="text-[10px] text-gray-400 mt-1">Langsung</Text>
          </View>

          <View className="items-center">
            <Text className="text-xl font-bold text-gray-900">–</Text>
            <Text className="text-xs text-gray-500">{item.route.destination}</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-2 pt-4 border-t border-gray-100">
          <View>
            <Text className="text-lg font-extrabold text-gray-900">
              {formatPrice(item.route.price)}
            </Text>
            <Text className="text-xs text-gray-400">/ penumpang</Text>
          </View>
          <TouchableOpacity
            disabled={isSoldOut}
            onPress={() =>
              router.push({
                pathname: "/pilih-kursi",
                params: {
                  schedule_id: item.id,
                  origin_name: item.route.origin,
                  destination_name: item.route.destination,
                  departure_date: item.departure_date,
                  departure_time: item.departure_time,
                  price: item.route.price,
                  vehicle_brand: item.vehicle.brand,
                  available_seats: item.available_seats,
                },
              } as any)
            }
            className={`px-6 py-2 rounded-lg ${isSoldOut ? "bg-gray-200" : "bg-[#0D3B66]"}`}
          >
            <Text className={`font-bold text-sm ${isSoldOut ? "text-gray-400" : "text-white"}`}>
              {isSoldOut ? "Habis" : "Pilih"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      {/* Header Pencarian */}
      <View className="bg-white px-4 pt-4 pb-3 border-b border-gray-200">
        {/* Baris asal & tujuan */}
        <View className="flex-row items-center mb-3">
          <TouchableOpacity
            onPress={() => setModalType("origin")}
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
          >
            <Text className="text-[10px] text-gray-400 font-bold">DARI</Text>
            <Text className="font-bold text-[#0D3B66] text-sm">
              {originCity ? originCity.name : "Pilih kota"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSwap} className="mx-2">
            <Ionicons name="swap-horizontal" size={22} color="#00B4D8" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalType("destination")}
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100"
          >
            <Text className="text-[10px] text-gray-400 font-bold">KE</Text>
            <Text className="font-bold text-[#0D3B66] text-sm">
              {destinationCity ? destinationCity.name : "Pilih kota"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Baris tanggal & tombol cari */}
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => changeDate(-1)} className="p-1">
            <Ionicons name="chevron-back" size={18} color="#0D3B66" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            className="flex-1 bg-gray-50 rounded-xl px-3 py-2 border border-gray-100 mx-1 items-center"
          >
            <Text className="text-[10px] text-gray-400 font-bold">TANGGAL</Text>
            <Text className="font-bold text-[#0D3B66] text-sm">
              {formatDisplayDate(departureDate)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeDate(1)} className="p-1">
            <Ionicons name="chevron-forward" size={18} color="#0D3B66" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSearch} className="ml-2 bg-[#0D3B66] px-4 py-3 rounded-xl">
            <Ionicons name="search" size={18} color="white" />
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

        {/* Filter chips */}
        {hasSearched && (
          <View className="flex-row justify-between items-end mt-3">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <FilterChip label="Direkomendasikan" />
              <FilterChip label="Harga termurah ↑" />
              <FilterChip label="Jam berangkat" />
            </ScrollView>
            <TouchableOpacity
              onPress={() => setFilterVisible(true)}
              className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 ml-2"
            >
              <MaterialCommunityIcons name="tune-variant" size={16} color="#0D3B66" />
              <Text className="text-[#0D3B66] text-xs font-bold ml-1">Filter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Konten */}
      {!hasSearched ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl mb-4">🔍</Text>
          <Text className="text-slate-700 text-lg font-bold text-center">
            Cari Jadwal Perjalanan
          </Text>
          <Text className="text-slate-400 text-sm text-center mt-2">
            Pilih kota asal, tujuan, dan tanggal lalu tap ikon cari.
          </Text>
        </View>
      ) : isLoadingSchedules ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0D3B66" />
          <Text className="text-gray-400 text-sm mt-3">Mencari jadwal...</Text>
        </View>
      ) : schedules.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl mb-4">😔</Text>
          <Text className="text-slate-700 text-lg font-bold text-center">
            Jadwal Tidak Tersedia
          </Text>
          <Text className="text-slate-400 text-sm text-center mt-2">
            Tidak ada jadwal untuk rute dan tanggal yang dipilih.
          </Text>
        </View>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderScheduleCard}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          ListHeaderComponent={
            <View className="mb-3">
              <Text className="text-[#0D3B66] text-xl font-extrabold">
                {originCity?.name} → {destinationCity?.name}
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                {formatDate(departureDate)} • {schedules.length} jadwal ditemukan
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}

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

      {/* Modal Filter */}
      <Modal
        animationType="slide"
        transparent
        visible={isFilterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <TouchableOpacity className="flex-1" onPress={() => setFilterVisible(false)} />
          <View className="bg-white rounded-t-3xl p-6 h-[40%]">
            <View className="flex-row justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <Text className="text-xl font-extrabold text-[#0D3B66]">Urutkan</Text>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="close" size={20} color="#0D3B66" />
              </TouchableOpacity>
            </View>
            {["Direkomendasikan", "Harga termurah ↑", "Jam berangkat"].map((label) => (
              <TouchableOpacity
                key={label}
                onPress={() => { setActiveFilter(label); setFilterVisible(false); handleSearch(); }}
                className="flex-row items-center justify-between py-3 border-b border-gray-50"
              >
                <Text className="text-gray-700 font-medium">{label}</Text>
                {activeFilter === label && (
                  <Ionicons name="checkmark" size={20} color="#0D3B66" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
