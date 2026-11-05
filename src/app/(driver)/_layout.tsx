import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function DriverLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0CA789", // Warna tosca JalanKu
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perjalanan"
        options={{
          title: "Perjalanan",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="penumpang"
        options={{
          title: "Penumpang",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />

      {/* --- TAMBAHKAN DUA HALAMAN INI --- */}
      <Tabs.Screen
        name="detail-perjalanan"
        options={{
          href: null, // Berfungsi untuk menyembunyikan dari menu bawah
        }}
      />
      <Tabs.Screen
        name="riwayat-perjalanan"
        options={{
          href: null, // Berfungsi untuk menyembunyikan dari menu bawah
        }}
      />
      {/* --------------------------------- */}
    </Tabs>
  );
}
