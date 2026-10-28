import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import "../../global.css";

export default function RootLayout() {
  const { token, loadToken } = useAuthStore();

  useEffect(() => {
    loadToken().then(() => {
      if (!token) {
        router.replace("/(auth)/login");
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
