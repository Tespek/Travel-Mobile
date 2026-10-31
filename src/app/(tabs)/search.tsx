import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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

const TICKET_DATA = [
  {
    id: "1",
    operator: "PT Bintang Lestari Putra Perkasa",
    vehicle: "Toyota Hiace • AC Executive",
    badge: "Mitra utama",
    badgeColor: "bg-green-100 text-green-700",
    departureTime: "19:00",
    departureCity: "Lhokseumawe",
    duration: "± 7 jam",
    arrivalTime: "02:00",
    arrivalCity: "Medan",
    price: "Rp180.000",
  },
  {
    id: "2",
    operator: "L300 Aceh Mandiri",
    vehicle: "Mitsubishi L300 • AC Reguler",
    badge: "Harga termurah",
    badgeColor: "bg-yellow-100 text-yellow-700",
    departureTime: "20:30",
    departureCity: "Lhokseumawe",
    duration: "± 7,5 jam",
    arrivalTime: "04:00",
    arrivalCity: "Medan",
    price: "Rp120.000",
  },
  {
    id: "3",
    operator: "Sempati Star Travel",
    vehicle: "Toyota Innova • AC VIP",
    badge: "Jadwal alternatif",
    badgeColor: "bg-blue-100 text-blue-700",
    departureTime: "18:30",
    departureCity: "Lhokseumawe",
    duration: "± 6,5 jam",
    arrivalTime: "01:00",
    arrivalCity: "Medan",
    price: "Rp180.000",
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("Direkomendasikan");
  const [isFilterVisible, setFilterVisible] = useState(false);

  const FilterChip = ({ label }: { label: string }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(label)}
      className={`px-4 py-2 rounded-full border mr-2 ${
        activeFilter === label
          ? "bg-blue-50 border-[#0D3B66]"
          : "bg-white border-gray-200"
      }`}
    >
      <Text
        className={
          activeFilter === label ? "text-[#0D3B66] font-bold" : "text-gray-600"
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderTicketCard = ({ item }: { item: any }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center flex-1">
          <View className="bg-blue-50 p-2 rounded-full mr-3">
            <Ionicons name="bus" size={24} color="#0D3B66" />
          </View>
          <View className="flex-1 pr-2">
            <Text className="text-base font-bold text-gray-900 leading-tight">
              {item.operator}
            </Text>
            <Text className="text-xs text-gray-500 mt-1">{item.vehicle}</Text>
          </View>
        </View>
        <View className={`px-2 py-1 rounded-md ${item.badgeColor}`}>
          <Text className="text-[10px] font-bold">{item.badge}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4 px-2">
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-900">
            {item.departureTime}
          </Text>
          <Text className="text-xs text-gray-500">{item.departureCity}</Text>
        </View>

        <View className="items-center flex-1 px-4">
          <Text className="text-[10px] text-gray-400 mb-1">
            {item.duration}
          </Text>
          <View className="w-full h-[2px] bg-gray-100 relative justify-center items-center rounded-full">
            <View className="w-2 h-2 rounded-full bg-gray-300 absolute left-0" />
            <View className="w-2 h-2 rounded-full bg-gray-300 absolute right-0" />
          </View>
          <Text className="text-[10px] text-gray-400 mt-1">Langsung</Text>
        </View>

        <View className="items-center">
          <Text className="text-xl font-bold text-gray-900">
            {item.arrivalTime}
          </Text>
          <Text className="text-xs text-gray-500">{item.arrivalCity}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-2 pt-4 border-t border-gray-100">
        <View>
          <Text className="text-lg font-extrabold text-gray-900">
            {item.price}
          </Text>
          <Text className="text-xs text-gray-400">/ penumpang</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/pilih-kursi",
              params: { operator: item.operator, vehicle: item.vehicle },
            })
          }
          className="bg-[#0D3B66] px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-bold text-sm">Pilih</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="bg-white px-4 pt-4 pb-3 border-b border-gray-200 z-10">
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 bg-gray-100 rounded-full"
          >
            <Ionicons name="chevron-back" size={20} color="#0D3B66" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-base font-bold text-[#0D3B66]">
              Lhokseumawe → Medan
            </Text>
            <Text className="text-xs text-gray-500">Senin, 2 November</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push("/FormPencarian")}
            className="p-2 bg-blue-50 rounded-full"
          >
            <Ionicons name="search" size={20} color="#0D3B66" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-end mb-4 mt-2">
          <View>
            <Text className="text-xl font-extrabold text-gray-900">
              Pilih perjalanan
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Pilihan jadwal dari berbagai mitra travel
            </Text>
            <TouchableOpacity className="flex-row items-center mt-2">
              <Ionicons name="heart-outline" size={14} color="#00B4D8" />
              <Text className="text-[#00B4D8] text-xs font-bold ml-1">
                Simpan rute favorit
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            className="flex-row items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200"
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={16}
              color="#0D3B66"
            />
            <Text className="text-[#0D3B66] text-xs font-bold ml-1">
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row mb-2">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FilterChip label="Direkomendasikan" />
            <FilterChip label="Harga termurah ↑" />
            <FilterChip label="Jam berangkat" />
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={TICKET_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderTicketCard}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />

      {/* MODAL FILTER */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <TouchableOpacity
            className="flex-1"
            activeOpacity={1}
            onPress={() => setFilterVisible(false)}
          />
          <View className="bg-white rounded-t-3xl p-6 h-[75%]">
            <View className="flex-row justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <Text className="text-xl font-extrabold text-[#0D3B66]">
                Filter Pencarian
              </Text>
              <TouchableOpacity
                onPress={() => setFilterVisible(false)}
                className="p-2 bg-gray-100 rounded-full"
              >
                <Ionicons name="close" size={20} color="#0D3B66" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
              <Text className="font-bold text-gray-900 mb-3">
                Waktu Keberangkatan
              </Text>
              <View className="flex-row flex-wrap mb-6">
                {[
                  "Pagi (06:00 - 12:00)",
                  "Siang (12:00 - 18:00)",
                  "Malam (18:00 - 00:00)",
                ].map((time, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="border border-gray-200 rounded-lg px-4 py-2 mr-2 mb-2 bg-gray-50"
                  >
                    <Text className="text-gray-600 text-sm font-medium">
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="font-bold text-gray-900 mb-3">
                Fasilitas Travel
              </Text>
              <View className="mb-6">
                {[
                  "Full AC",
                  "Colokan USB / Listrik",
                  "Bagasi Luas",
                  "Kursi Recliner",
                ].map((fasilitas, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="flex-row items-center mb-3"
                  >
                    <Ionicons
                      name={idx === 0 ? "checkbox" : "square-outline"}
                      size={22}
                      color={idx === 0 ? "#00B4D8" : "#9ca3af"}
                    />
                    <Text className="ml-3 text-gray-700 font-medium">
                      {fasilitas}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text className="font-bold text-gray-900 mb-3">Mitra Travel</Text>
              <View className="mb-6">
                {[
                  "PT Bintang Lestari Putra Perkasa",
                  "L300 Aceh Mandiri",
                  "Sempati Star Travel",
                ].map((operator, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="flex-row items-center mb-3"
                  >
                    <Ionicons name="square-outline" size={22} color="#9ca3af" />
                    <Text className="ml-3 text-gray-700 font-medium">
                      {operator}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text className="text-gray-500 font-bold px-4">
                  Hapus Semua
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilterVisible(false)}
                className="bg-[#0D3B66] px-8 py-3.5 rounded-xl flex-1 ml-4 items-center"
              >
                <Text className="text-white font-extrabold text-base">
                  Terapkan Filter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
