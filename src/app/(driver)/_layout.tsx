import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function DriverTabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#10B981", // Warna hijau khas driver
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: { height: 65, paddingBottom: 10, paddingTop: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Orderan",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan Tiket",
          tabBarIcon: ({ color }) => (
            <Ionicons name="qr-code-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Akun Mitra",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
