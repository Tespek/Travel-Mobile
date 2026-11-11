/// <reference types="nativewind/types" />
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import WebView from "react-native-webview";

export default function MidtransPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    snap_token?: string;
    booking_code?: string;
    seats?: string;
    origin_name?: string;
    destination_name?: string;
    departure_date?: string;
    departure_time?: string;
    total_price?: string;
  }>();

  const snapToken = params.snap_token;

  // HTML halaman Midtrans Snap
  const snapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="Mid-client-AZ24UrOVWa7aPPyI"></script>
    </head>
    <body>
      <script>
        window.onload = function() {
          snap.pay('${snapToken}', {
            onSuccess: function(result) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'SUCCESS',
                result: result
              }));
            },
            onPending: function(result) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'PENDING',
                result: result
              }));
            },
            onError: function(result) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'ERROR',
                result: result
              }));
            },
            onClose: function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'CLOSE'
              }));
            }
          });
        }
      </script>
    </body>
    </html>
  `;

  const handleMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === 'SUCCESS' || data.type === 'PENDING') {
        // Update status booking di backend
        try {
          const { default: api } = await import("../services/api");
          await api.post("/payment/status", {
            booking_code: params.booking_code,
            transaction_status: data.type === 'SUCCESS' ? 'settlement' : 'pending',
          });
        } catch {}

        router.replace({
          pathname: "/sukses-pembayaran",
          params: {
            booking_code: params.booking_code,
            seats: params.seats,
            origin_name: params.origin_name,
            destination_name: params.destination_name,
            departure_date: params.departure_date,
            departure_time: params.departure_time,
            total_price: params.total_price,
            payment_method: "midtrans",
          },
        } as any);

      } else if (data.type === 'ERROR') {
        router.replace("/(tabs)");
      } else if (data.type === 'CLOSE') {
        router.back();
      }
    } catch {}
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
    >
      <WebView
        source={{ html: snapHTML }}
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => (
          <View className="flex-1 items-center justify-center bg-white">
            <ActivityIndicator size="large" color="#0D3B66" />
            <Text className="text-gray-400 text-sm mt-3">Memuat halaman pembayaran...</Text>
          </View>
        )}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
      />
    </SafeAreaView>
  );
}
