import { UserProvider } from "@/contexts/UserContext";
import { router, Stack } from "expo-router";
import { useEffect, useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  useEffect(() => {
    const fetchToken = async () => {
      const token = await SecureStore.getItemAsync("token");
      const parent = await SecureStore.getItemAsync("parent");

      if (token && parent) {
        router.replace("/(tabs)");
      } else {
        router.replace("/");
      }
    };

    fetchToken();
  }, []);
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
      </Stack>
    </UserProvider>
  );
}
