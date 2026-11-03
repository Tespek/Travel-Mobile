import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function SplashScreen() {
  const router = useRouter();
  const { width } = Dimensions.get("window");

  useEffect(() => {
    // Simulasi loading selama 3 detik, lalu pindah ke halaman pilih peran
    const timer = setTimeout(() => {
      router.replace("/(auth)/pilih-role"); // <-- Sudah diubah ke pilih-role
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      {/* KONTEN TENGAH */}
      <View className="flex-1 items-center justify-center z-10 px-5">
        {/* Logo */}
        <Text className="text-5xl font-black text-[#0D3B66] tracking-tight mb-2">
          Jalan<Text className="text-[#0CA789]">Ku</Text>
        </Text>

        {/* Subtitle Perusahaan */}
        <Text className="text-[10px] font-bold text-[#64748B] tracking-[2px] mb-8">
          PT BINTANG LESTARI PUTRA
        </Text>

        {/* Tagline */}
        <Text className="text-sm font-medium text-[#475569] text-center leading-relaxed mb-16">
          Bersama Mengantarkan{"\n"}Perjalanan yang Lebih Baik.
        </Text>

        {/* Indikator Loading */}
        <View className="items-center mt-8">
          {/* ActivityIndicator standar bawaan React Native */}
          <ActivityIndicator size="large" color="#0CA789" />
          <Text className="text-xs font-medium text-[#94A3B8] mt-4">
            Memuat...
          </Text>
        </View>
      </View>

      {/* VEKTOR LENGKUNGAN (WAVE) DI BAWAH */}
      <View className="absolute bottom-0 w-full">
        <Svg height="160" width={width} viewBox="0 0 1440 320">
          {/* Ombak Belakang (Biru Gelap) */}
          <Path
            fill="#0D3B66"
            fillOpacity="1"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,229.3C840,256,960,288,1080,282.7C1200,277,1320,235,1380,213.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
          {/* Ombak Depan (Tosca / Teal) */}
          <Path
            fill="#0CA789"
            fillOpacity="1"
            d="M0,288L60,277.3C120,267,240,245,360,213.3C480,181,600,139,720,149.3C840,160,960,224,1080,250.7C1200,277,1320,267,1380,261.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </Svg>
      </View>
    </SafeAreaView>
  );
}
