import { Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import { useAuthStore } from "../stores/authStore";

export default function RootLayout() {
  const { token, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken().then(() => {
      // SEMENTARA DIMATIKAN AGAR TIDAK PINDAH OTOMATIS
      // if (!token) {
      //   router.replace("/(auth)/login");
      // }
    });
  }, []); // Hapus 'token' dari array jika sebelumnya ada

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
