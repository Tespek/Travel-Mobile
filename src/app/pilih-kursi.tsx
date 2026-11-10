/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PilihKursiScreen() {
  const router = useRouter();

  const {
    schedule_id,
    origin_name,
    destination_name,
    departure_date,
    departure_time,
    price,
    vehicle_brand,
    available_seats,
  } = useLocalSearchParams<{
    schedule_id?: string;
    origin_name?: string;
    destination_name?: string;
    departure_date?: string;
    departure_time?: string;
    price?: string;
    vehicle_brand?: string;
    available_seats?: string;
  }>();

  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const bookedSeats: number[] = [];

  const handleIncrease = () => {
    if (passengerCount < 6) setPassengerCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (passengerCount > 1) {
      const newCount = passengerCount - 1;
      setPassengerCount(newCount);
      if (selectedSeats.length > newCount) {
        setSelectedSeats(selectedSeats.slice(0, newCount));
      }
    }
  };

  const handleSelectSeat = (seatNumber: number) => {
    if (bookedSeats.includes(seatNumber)) return;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatNumber));
    } else {
      if (selectedSeats.length < passengerCount) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const Seat = ({
    id,
    label,
    isDriver = false,
  }: {
    id: number;
    label?: string;
    isDriver?: boolean;
  }) => {
    const isBooked = bookedSeats.includes(id);
    const isSelected = selectedSeats.includes(id);

    let bgColor = "bg-[#BCA37F]";
    let borderColor = "border-[#8C7A61]";

    if (isDriver) {
      bgColor = "bg-[#BCA37F]";
      borderColor = "border-[#8C7A61]";
    } else if (isBooked) {
      bgColor = "bg-[#D1D5DB]";
      borderColor = "border-[#9CA3AF]";
    } else if (isSelected) {
      bgColor = "bg-[#00B4D8]";
      borderColor = "border-[#0D3B66]";
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => !isDriver && handleSelectSeat(id)}
        className={`w-[45px] h-[60px] rounded-xl border-2 ${borderColor} ${bgColor} items-center justify-between py-1.5 shadow-sm`}
      >
        <Text className={`font-extrabold text-[11px] ${isBooked ? "text-gray-400" : "text-gray-900"}`}>
          {label || id}
        </Text>
        <View className={`w-1.5 h-1.5 rounded-full ${isBooked ? "bg-gray-400" : "bg-red-700"}`} />
        <View className="w-8 h-2.5 rounded-full bg-white/90 shadow-sm" />
      </TouchableOpacity>
    );
  };

  const handleLanjutkan = () => {
    router.push({
      pathname: "/data-penumpang",
      params: {
        seats: JSON.stringify(selectedSeats),
        schedule_id: schedule_id ?? "",
        origin_name: origin_name ?? "",
        destination_name: destination_name ?? "",
        departure_date: departure_date ?? "",
        departure_time: departure_time ?? "",
        price: price ?? "0",
        vehicle_brand: vehicle_brand ?? "",
      },
    } as any);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      <View className="bg-[#F8FAFC] pt-4 pb-2 z-10">
        <View className="flex-row items-center px-5 justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm border border-gray-100"
          >
            <Ionicons name="chevron-back" size={20} color="#0D3B66" />
          </TouchableOpacity>
          <Text className="text-base font-extrabold text-[#0D3B66]">Pilih kursi</Text>
          <View className="w-10" />
        </View>

        <View className="flex-row px-5 mt-5">
          <View className="h-1 flex-1 bg-teal-600 rounded-full mr-2" />
          <View className="h-1 flex-1 bg-teal-600/30 rounded-full mr-2" />
          <View className="h-1 flex-1 bg-teal-600/30 rounded-full" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* INFO JADWAL */}
        <View className="px-5 mt-6 mb-4">
          <Text className="text-2xl font-black text-[#0D3B66] mb-1">Pilih kursi penumpang</Text>
          <Text className="text-xs text-gray-500 font-medium">
            {vehicle_brand ?? "Kendaraan"} • {origin_name} → {destination_name}
          </Text>
          {departure_time && (
            <Text className="text-xs text-gray-400 mt-1">
              Berangkat {departure_time.substring(0, 5)} • {departure_date}
            </Text>
          )}
        </View>

        {/* COUNTER JUMLAH PENUMPANG */}
        <View className="mx-5 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex-row justify-between items-center">
          <View className="flex-1 pr-4">
            <Text className="text-sm font-bold text-[#0D3B66] mb-1">Jumlah penumpang</Text>
            <Text className="text-[10px] text-gray-400 leading-relaxed">Maksimal 6 kursi per pesanan.</Text>
          </View>
          <View className="flex-row items-center border border-gray-200 rounded-lg">
            <TouchableOpacity onPress={handleDecrease} className="px-3 py-2 border-r border-gray-200 bg-gray-50 rounded-l-lg">
              <Text className="font-bold text-gray-600 text-base">-</Text>
            </TouchableOpacity>
            <View className="px-4">
              <Text className="font-black text-gray-900 text-sm">{passengerCount}</Text>
            </View>
            <TouchableOpacity onPress={handleIncrease} className="px-3 py-2 border-l border-gray-200 bg-gray-50 rounded-r-lg">
              <Text className="font-bold text-gray-600 text-base">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* DENAH KURSI */}
        <View className="mx-5 mb-6">
          <View className="flex-row items-center justify-between mb-3 px-1">
            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BAGIAN DEPAN</Text>
            <Ionicons name="bus" size={16} color="#00B4D8" />
          </View>

          <View className="border-[7px] border-[#2C3E50] rounded-[40px] p-5 bg-[#E2E8F0] shadow-sm">
            <View className="w-full h-12 bg-[#1A252F] rounded-t-2xl rounded-b-lg mb-6" />
            <View className="flex-row justify-between items-center w-full mb-4 px-2">
              <Seat id={1} />
              <View className="items-center justify-center">
                <Text className="text-[9px] font-black text-gray-500 tracking-[3px]">ENGINE</Text>
              </View>
              <Seat id={0} label="DRIVER" isDriver={true} />
            </View>

            <View className="items-center mb-5">
              <View className="bg-[#1A252F] px-8 py-1.5 rounded-full">
                <Text className="text-white text-[9px] font-bold">LED TV</Text>
              </View>
            </View>

            <View className="flex-row justify-between w-full px-6 mb-4">
              <Seat id={2} />
              <Seat id={3} />
              <Seat id={4} />
            </View>
            <View className="flex-row justify-between w-full px-6 mb-4">
              <Seat id={5} />
              <Seat id={6} />
              <Seat id={7} />
            </View>
            <View className="flex-row justify-between w-full px-6 pb-2">
              <Seat id={8} />
              <Seat id={9} />
              <Seat id={10} />
            </View>
          </View>

          {/* LEGENDA */}
          <View className="flex-row justify-center gap-4 mt-4">
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded bg-[#BCA37F] mr-1" />
              <Text className="text-[10px] text-gray-500">Tersedia</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded bg-[#00B4D8] mr-1" />
              <Text className="text-[10px] text-gray-500">Dipilih</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-4 h-4 rounded bg-[#D1D5DB] mr-1" />
              <Text className="text-[10px] text-gray-500">Dipesan</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TOMBOL LANJUTKAN */}
      <View className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 shadow-lg">
        <Text className="text-center text-xs text-gray-400 mb-2">
          {selectedSeats.length} dari {passengerCount} kursi dipilih
        </Text>
        <TouchableOpacity
          onPress={handleLanjutkan}
          disabled={selectedSeats.length !== passengerCount}
          className={`py-4 rounded-xl items-center flex-row justify-center shadow-sm ${
            selectedSeats.length === passengerCount ? "bg-[#00B4D8]" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-extrabold text-base mr-2">Lanjutkan</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
