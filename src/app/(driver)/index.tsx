import { SafeAreaView, Text } from "react-native";

export default function DashboardDriverScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-2xl font-bold text-[#10B981]">
        Dashboard Driver
      </Text>
      <Text className="text-gray-500">Selamat datang, Mitra!</Text>
    </SafeAreaView>
  );
}
