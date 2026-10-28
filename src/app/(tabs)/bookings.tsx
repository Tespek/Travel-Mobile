import { View, Text } from "react-native";

export default function BookingsScreen() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center">
      <Text className="text-slate-800 text-xl font-bold">Tiket Saya</Text>
      <Text className="text-slate-400 text-sm mt-2">Riwayat pemesanan tiket</Text>
    </View>
  );
}
