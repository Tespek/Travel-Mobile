import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function NotifikasiScreen() {
  const router = useRouter();

  return (
    <SafeAreaView
      className="flex-1 bg-[#F8FAFC]"
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View className="bg-white px-5 pt-4 pb-4 flex-row items-center border-b border-gray-100 shadow-sm z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100"
        >
          <Ionicons name="chevron-back" size={24} color="#0D3B66" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#0D3B66] ml-4">
          Notifikasi
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20 }}
      >
        {/* Item Notifikasi 1 */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4 flex-row">
          <View className="w-12 h-12 bg-emerald-50 rounded-full items-center justify-center mr-4">
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#0D3B66] mb-1">
              Pembayaran Berhasil!
            </Text>
            <Text className="text-xs text-gray-500 leading-relaxed mb-2">
              Tiket perjalanan dari Banda Aceh ke Medan sudah lunas dan
              tersimpan di menu Tiket.
            </Text>
            <Text className="text-[10px] font-bold text-gray-400">
              Baru saja
            </Text>
          </View>
        </View>

        {/* Item Notifikasi 2 */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-4 flex-row">
          <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mr-4">
            <Ionicons name="pricetag" size={24} color="#00B4D8" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#0D3B66] mb-1">
              Promo Pengguna Baru
            </Text>
            <Text className="text-xs text-gray-500 leading-relaxed mb-2">
              Dapatkan diskon 20% untuk perjalanan pertamamu dengan kode:
              JALANKUY20.
            </Text>
            <Text className="text-[10px] font-bold text-gray-400">
              1 Hari yang lalu
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
