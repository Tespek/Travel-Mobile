import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1e5b96", // Warna biru saat menu aktif
        tabBarInactiveTintColor: "#9CA3AF", // Warna abu-abu saat tidak aktif
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          elevation: 0, // Menghilangkan bayangan bawaan di Android
          shadowOpacity: 0, // Menghilangkan bayangan bawaan di iOS
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginTop: 4,
        },
      }}
    >
      {/* 1. Menu Beranda */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 2. Menu Cari */}
      <Tabs.Screen
        name="search"
        options={{
          title: "Cari",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-outline" size={24} color={color} />
          ),
        }}
      />

      {/* 3. Menu Tiket */}
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Tiket",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ticket-outline" size={24} color={color} />
          ),
        }}
      />

      {/* 4. Menu Akun (Sesuai desain menggunakan ikon smiley) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Akun",
          tabBarIcon: ({ color }) => (
            <Ionicons name="happy-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
