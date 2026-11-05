import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PenumpangScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [passengerToConfirm, setPassengerToConfirm] = useState({
    name: "",
    seat: 0,
  });

  const [seats, setSeats] = useState([
    {
      id: 1,
      name: "Nadia",
      fullName: "Nadia Putri",
      pickup: "Terminal utama",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 2,
      name: "Rizky",
      fullName: "Rizky Maulana",
      pickup: "Pool mitra",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 3,
      name: "Siti",
      fullName: "Siti Aisyah",
      pickup: "Simpang Lima",
      empty: false,
      status: "Sudah naik",
    },
    {
      id: 4,
      name: "Fajar",
      fullName: "Fajar Nugraha",
      pickup: "Terminal utama",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 5,
      name: "Dina",
      fullName: "Dina Mariana",
      pickup: "Pool mitra",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 6,
      name: "Arif",
      fullName: "Arif Rahman",
      pickup: "Simpang Lima",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 7,
      name: "Maya",
      fullName: "Maya Sari",
      pickup: "Terminal utama",
      empty: false,
      status: "Belum naik",
    },
    {
      id: 8,
      name: "Kosong",
      fullName: "",
      pickup: "",
      empty: true,
      status: "",
    },
    {
      id: 9,
      name: "Kosong",
      fullName: "",
      pickup: "",
      empty: true,
      status: "",
    },
    {
      id: 10,
      name: "Kosong",
      fullName: "",
      pickup: "",
      empty: true,
      status: "",
    },
  ]);

  const handleConfirmClick = (name: string, seat: number) => {
    setPassengerToConfirm({ name, seat });
    setModalVisible(true);
  };

  const handleConfirmAction = () => {
    const updatedSeats = seats?.map((seat) => {
      if (seat.id === passengerToConfirm.seat) {
        return { ...seat, status: "Sudah naik" };
      }
      return seat;
    });

    setSeats(updatedSeats);
    setModalVisible(false);
  };

  // Helper untuk merender kotak kursi individu dengan gaya Hiace
  const renderSeatBox = (seatId: number) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat) return null;

    const isBoarded = seat.status === "Sudah naik";

    return (
      <View
        key={`seat-${seat.id}`}
        className={`flex-1 border rounded-xl py-3 mx-1 items-center ${
          isBoarded
            ? "border-green-200 bg-green-50"
            : seat.empty
              ? "border-gray-100 bg-gray-50/50"
              : "border-gray-200 bg-white shadow-xs"
        }`}
      >
        <Text
          className={`text-sm font-black ${
            isBoarded
              ? "text-green-700"
              : seat.empty
                ? "text-gray-300"
                : "text-[#1e293b]"
          }`}
        >
          {seat.id}
        </Text>
        <Text
          className={`text-[11px] mt-0.5 font-medium px-1 truncate max-w-full ${
            isBoarded
              ? "text-green-700"
              : seat.empty
                ? "text-gray-300"
                : "text-gray-500"
          }`}
          numberOfLines={1}
        >
          {seat.name}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D3B66]">
      <StatusBar barStyle="light-content" backgroundColor="#0D3B66" />

      <View className="flex-1 bg-[#F8FAFC]">
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* HEADER */}
          <View className="bg-[#0D3B66] px-6 pt-10 pb-8 rounded-b-[40px]">
            <View className="flex-row justify-between items-center mb-8">
              <View className="flex-row items-center">
                <Text className="text-xl font-black text-white tracking-tighter">
                  <Text className="text-[#0CA789]">✦ Jalan</Text>Ku
                </Text>
                <Text className="text-[10px] font-bold text-gray-300 ml-2 mt-1 uppercase tracking-widest">
                  Driver
                </Text>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full justify-center items-center border border-white/20">
                <Feather name="user" size={18} color="white" />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-bold text-white mb-1">
              Daftar Penumpang
            </Text>
            <Text className="text-sm text-gray-300">
              Periksa kursi dan konfirmasi penumpang
            </Text>
          </View>

          {/* KONTEN UTAMA */}
          <View className="px-6 mt-6">
            <Text className="text-lg font-bold text-[#1e293b] mb-1">
              Daftar Penumpang
            </Text>
            <Text className="text-xs text-gray-500 mb-6">
              Total 7 penumpang. Tandai setelah penumpang naik.
            </Text>

            {/* KARTU DENAH KURSI TOYOTA HIACE */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-sm font-bold text-[#1e293b]">
                  Denah Kabin Toyota Hiace
                </Text>
                <View className="bg-gray-100 px-2.5 py-1 rounded-lg">
                  <Text className="text-[10px] font-bold text-gray-500">
                    Depan 🚙
                  </Text>
                </View>
              </View>

              {/* VISUALISASI KABIN HIACE (BARIS PER BARIS) */}
              <View className="space-y-3">
                {/* Baris 1: Depan (Driver + Kursi Penumpang Depan) */}
                <View className="flex-row justify-between items-center mb-3">
                  {/* Kotak Driver (Simulasi) */}
                  <View className="flex-1 border border-dashed border-gray-300 rounded-xl py-3 mx-1 items-center bg-gray-100/50">
                    <Ionicons
                      name="steering-wheel-outline"
                      size={16}
                      color="#9CA3AF"
                    />
                    <Text className="text-[10px] text-gray-400 font-bold mt-1">
                      DRIVER
                    </Text>
                  </View>
                  {renderSeatBox(1)}
                </View>

                {/* Baris 2 (Kursi 2, 3, 4) */}
                <View className="flex-row justify-between mb-3">
                  {renderSeatBox(2)}
                  {renderSeatBox(3)}
                  {renderSeatBox(4)}
                </View>

                {/* Baris 3 (Kursi 5, 6, 7) */}
                <View className="flex-row justify-between mb-3">
                  {renderSeatBox(5)}
                  {renderSeatBox(6)}
                  {renderSeatBox(7)}
                </View>

                {/* Baris 4 / Belakang (Kursi 8, 9, 10) */}
                <View className="flex-row justify-between">
                  {renderSeatBox(8)}
                  {renderSeatBox(9)}
                  {renderSeatBox(10)}
                </View>
              </View>

              <View className="bg-green-50 px-3 py-1.5 rounded-md self-start mt-4">
                <Text className="text-[10px] font-bold text-green-600">
                  Hijau = sudah naik
                </Text>
              </View>
            </View>

            {/* LIST SEMUA PENUMPANG */}
            {seats
              ?.filter((seat) => !seat.empty)
              ?.map((passenger) => (
                <View
                  key={`list-${passenger.id}`}
                  className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-4"
                >
                  <View
                    className={`flex-row items-center justify-between ${
                      passenger.status !== "Sudah naik" ? "mb-4" : ""
                    }`}
                  >
                    <View className="flex-row items-center flex-1">
                      <View
                        className={`w-10 h-10 rounded-xl justify-center items-center mr-3 ${
                          passenger.status === "Sudah naik"
                            ? "bg-green-100"
                            : "bg-[#0CA789]/10"
                        }`}
                      >
                        <Text
                          className={`text-base font-bold ${
                            passenger.status === "Sudah naik"
                              ? "text-green-600"
                              : "text-[#0CA789]"
                          }`}
                        >
                          {passenger.id}
                        </Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-bold text-[#1e293b]">
                          {passenger.fullName}
                        </Text>
                        <Text className="text-[11px] text-gray-500 mt-0.5">
                          Kursi {passenger.id} · Jemput: {passenger.pickup}
                        </Text>
                      </View>
                    </View>

                    <View
                      className={`px-3 py-1.5 rounded-full ml-2 border ${
                        passenger.status === "Sudah naik"
                          ? "bg-green-50 border-green-200"
                          : "bg-amber-50 border-amber-100"
                      }`}
                    >
                      <Text
                        className={`text-[10px] font-bold ${
                          passenger.status === "Sudah naik"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {passenger.status}
                      </Text>
                    </View>
                  </View>

                  {passenger.status !== "Sudah naik" && (
                    <TouchableOpacity
                      onPress={() =>
                        handleConfirmClick(passenger.fullName, passenger.id)
                      }
                      className="w-full bg-[#0CA789] py-3.5 rounded-xl items-center"
                    >
                      <Text className="text-white text-sm font-bold">
                        Konfirmasi Penumpang Naik
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>

      {/* POP-UP MODAL KONFIRMASI */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white w-full rounded-3xl p-6 items-center shadow-lg">
            <View className="w-16 h-16 bg-[#0CA789]/10 rounded-full justify-center items-center mb-4">
              <Ionicons
                name="checkmark-done-circle"
                size={32}
                color="#0CA789"
              />
            </View>

            <Text className="text-lg font-bold text-[#1e293b] mb-2">
              Konfirmasi Penumpang
            </Text>

            <Text className="text-sm text-gray-500 text-center mb-6 leading-relaxed">
              Apakah Anda yakin ingin menandai{" "}
              <Text className="font-bold text-[#1e293b]">
                {passengerToConfirm.name}
              </Text>{" "}
              (Kursi {passengerToConfirm.seat}) telah naik ke dalam kendaraan?
            </Text>

            <View className="flex-row w-full justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="flex-1 bg-gray-100 py-3.5 rounded-xl items-center mr-2"
              >
                <Text className="text-[#1e293b] text-sm font-bold">Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirmAction}
                className="flex-1 bg-[#0CA789] py-3.5 rounded-xl items-center ml-2"
              >
                <Text className="text-white text-sm font-bold">
                  Ya, Konfirmasi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
