import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { type Schedule, searchSchedules } from "../services/scheduleService";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatTime(time: string): string {
  // time format: HH:MM:SS atau HH:MM
  return time.substring(0, 5);
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ScheduleCard({
  schedule,
  onPress,
}: {
  schedule: Schedule;
  onPress: () => void;
}) {
  const isSoldOut = schedule.available_seats === 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isSoldOut}
      className={`bg-white rounded-2xl p-4 mb-3 shadow-sm border ${
        isSoldOut ? "border-slate-100 opacity-60" : "border-slate-100"
      }`}
    >
      {/* Jam & Harga */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <Text className="text-slate-800 text-2xl font-bold">
            {formatTime(schedule.departure_time)}
          </Text>
          <Text className="text-slate-400 text-xs mt-0.5">
            {schedule.route.origin} → {schedule.route.destination}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-emerald-600 text-lg font-bold">
            {formatPrice(schedule.route.price)}
          </Text>
          <Text className="text-slate-400 text-xs">per penumpang</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="border-t border-dashed border-slate-200 my-2" />

      {/* Info bawah */}
      <View className="flex-row justify-between items-center mt-1">
        <View className="flex-row gap-3">
          <View className="flex-row items-center gap-1">
            <Text className="text-slate-400 text-xs">🚐</Text>
            <Text className="text-slate-500 text-xs">{schedule.vehicle.brand}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-slate-400 text-xs">⏱</Text>
            <Text className="text-slate-500 text-xs">{schedule.route.estimated_duration}</Text>
          </View>
        </View>

        <View
          className={`px-2.5 py-1 rounded-full ${
            isSoldOut ? "bg-red-50" : "bg-emerald-50"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              isSoldOut ? "text-red-500" : "text-emerald-600"
            }`}
          >
            {isSoldOut ? "Habis" : `${schedule.available_seats} kursi`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function SchedulesScreen() {
  const params = useLocalSearchParams<{
    origin_city_id: string;
    destination_city_id: string;
    departure_date: string;
    origin_name: string;
    destination_name: string;
  }>();

  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchSchedules({
      origin_city_id: Number(params.origin_city_id),
      destination_city_id: Number(params.destination_city_id),
      departure_date: params.departure_date,
    })
      .then(setSchedules)
      .catch(() => Alert.alert("Gagal", "Tidak dapat memuat jadwal. Coba lagi."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSelectSchedule = (schedule: Schedule) => {
    router.push({
      pathname: "/booking",
      params: {
        schedule_id: schedule.id,
        origin_name: params.origin_name,
        destination_name: params.destination_name,
        departure_date: schedule.departure_date,
        departure_time: schedule.departure_time,
        price: schedule.route.price,
        vehicle_brand: schedule.vehicle.brand,
        available_seats: schedule.available_seats,
      },
    } as any);
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-emerald-600 px-6 pt-14 pb-6">
        <TouchableOpacity onPress={() => router.back()} className="mb-3">
          <Text className="text-emerald-100 text-sm">← Kembali</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">
          {params.origin_name} → {params.destination_name}
        </Text>
        <Text className="text-emerald-100 text-sm mt-0.5">
          {formatDate(params.departure_date)}
        </Text>
      </View>

      {/* Konten */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#16a34a" />
          <Text className="text-slate-400 text-sm mt-3">Mencari jadwal...</Text>
        </View>
      ) : schedules.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-5xl mb-4">🔍</Text>
          <Text className="text-slate-700 text-lg font-bold text-center">
            Jadwal Tidak Tersedia
          </Text>
          <Text className="text-slate-400 text-sm text-center mt-2">
            Tidak ada jadwal untuk rute dan tanggal yang dipilih.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-6 bg-emerald-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-bold text-sm">Ubah Pencarian</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={
            <Text className="text-slate-500 text-sm mb-3">
              {schedules.length} jadwal ditemukan
            </Text>
          }
          renderItem={({ item }) => (
            <ScheduleCard
              schedule={item}
              onPress={() => handleSelectSchedule(item)}
            />
          )}
        />
      )}
    </View>
  );
}
