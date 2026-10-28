import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-slate-50 items-center justify-center">
      <Text className="text-slate-800 text-xl font-bold">Beranda</Text>
      <Text className="text-slate-400 text-sm mt-2">Cari jadwal perjalanan Anda</Text>
    </View>
  );
}
