/// <reference types="nativewind/types" />
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export default function PetaLokasiScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    passenger_index?: string;
  }>();

  const mapRef = useRef<MapView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState<Region>({
    latitude: 5.1801,   // default: Lhokseumawe
    longitude: 97.1522,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [markerCoord, setMarkerCoord] = useState({
    latitude: 5.1801,
    longitude: 97.1522,
  });
  const [address, setAddress] = useState<string>("");
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);

  // Minta izin dan ambil lokasi GPS saat ini
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Izin Lokasi Ditolak",
          "Aktifkan izin lokasi di pengaturan HP untuk menggunakan fitur ini.",
        );
        setIsLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        const { latitude, longitude } = location.coords;
        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setRegion(newRegion);
        setMarkerCoord({ latitude, longitude });
        await reverseGeocode(latitude, longitude);
      } catch {
        Alert.alert("Error", "Gagal mendapatkan lokasi GPS.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Konversi koordinat ke alamat
  const reverseGeocode = async (latitude: number, longitude: number) => {
    setIsGeocodingLoading(true);
    try {
      const results = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (results.length > 0) {
        const r = results[0];
        const parts = [r.street, r.district, r.city, r.region].filter(Boolean);
        setAddress(parts.join(", "));
      }
    } catch {
      setAddress("");
    } finally {
      setIsGeocodingLoading(false);
    }
  };

  // Saat marker dipindahkan
  const handleMarkerDrag = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoord({ latitude, longitude });
    await reverseGeocode(latitude, longitude);
  };

  // Saat tap di peta
  const handleMapPress = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerCoord({ latitude, longitude });
    await reverseGeocode(latitude, longitude);
  };

  // Kembali ke lokasi GPS sekarang
  const handleMyLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setMarkerCoord({ latitude, longitude });
      mapRef.current?.animateToRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      await reverseGeocode(latitude, longitude);
    } catch {
      Alert.alert("Error", "Gagal mendapatkan lokasi.");
    }
  };

  // Konfirmasi lokasi — kirim balik ke data-penumpang
  const handleKonfirmasi = () => {
    router.back();
    // Kirim data via global state atau params
    // Karena expo-router tidak support callback langsung,
    // kita simpan di global store sederhana
    globalThis.__petaLokasi = {
      passengerIndex: Number(params.passenger_index ?? 0),
      latitude: markerCoord.latitude,
      longitude: markerCoord.longitude,
      address: address,
    };
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#0D3B66" />
        <Text className="text-gray-500 text-sm mt-3">Mendapatkan lokasi GPS...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <View className="bg-white px-5 py-3 flex-row items-center justify-between border-b border-gray-100 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#0D3B66" />
        </TouchableOpacity>
        <Text className="text-base font-extrabold text-[#0D3B66]">Pilih Lokasi Jemput</Text>
        <View className="w-10" />
      </View>

      {/* PETA */}
      <View className="flex-1">
        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={region}
          onPress={handleMapPress}
          showsUserLocation
          showsMyLocationButton={false}
        >
          <Marker
            coordinate={markerCoord}
            draggable
            onDragEnd={handleMarkerDrag}
            title="Lokasi Jemput"
            description={address}
          />
        </MapView>

        {/* Tombol lokasi saya */}
        <TouchableOpacity
          onPress={handleMyLocation}
          className="absolute top-4 right-4 bg-white w-12 h-12 rounded-full items-center justify-center shadow-md border border-gray-100"
        >
          <Ionicons name="locate" size={22} color="#0D3B66" />
        </TouchableOpacity>
      </View>

      {/* PANEL BAWAH */}
      <View className="bg-white px-5 pt-4 pb-6 border-t border-gray-100 shadow-lg">
        <Text className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
          Lokasi yang dipilih
        </Text>
        {isGeocodingLoading ? (
          <View className="flex-row items-center mb-4">
            <ActivityIndicator size="small" color="#0D3B66" />
            <Text className="text-sm text-gray-400 ml-2">Memuat alamat...</Text>
          </View>
        ) : (
          <View className="flex-row items-start mb-4">
            <Ionicons name="location" size={16} color="#EF4444" className="mt-0.5 mr-2" />
            <Text className="text-sm font-semibold text-gray-800 flex-1 ml-1">
              {address || "Geser pin atau tap peta untuk memilih lokasi"}
            </Text>
          </View>
        )}

        <Text className="text-[10px] text-gray-400 mb-4 text-center">
          Geser pin 📍 atau tap peta untuk memilih titik jemput yang tepat
        </Text>

        <TouchableOpacity
          onPress={handleKonfirmasi}
          disabled={!address}
          className={`py-4 rounded-xl items-center flex-row justify-center ${
            address ? "bg-[#0D3B66]" : "bg-gray-300"
          }`}
        >
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text className="text-white font-extrabold text-base ml-2">
            Konfirmasi Lokasi Ini
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
