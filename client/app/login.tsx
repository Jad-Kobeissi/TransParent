import { Svg, Path } from "react-native-svg";
import { colors } from "@/themes/colors";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { TUserContext, UserContext } from "@/contexts/UserContext";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setParent } = useContext<TUserContext>(
    UserContext as React.Context<TUserContext>,
  );
  return loading ? (
    <ActivityIndicator
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    />
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ alignItems: "center", gap: 5, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>Welcome Back!</Text>
        <Text style={{ color: colors.placeholderText }}>
          Sign in to your account to continue
        </Text>
      </View>
      <View style={{ gap: 5, marginBottom: 20 }}>
        <View>
          <Text style={{ color: colors.placeholderText }}>SIS Identifier</Text>
          <TextInput
            placeholder="Identifier"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            style={{
              color: "black",
              borderColor: colors.borderColor,
              borderWidth: 1,
              paddingHorizontal: 80,
              paddingVertical: 8,
              borderRadius: 5,
              marginBottom: 10,
              fontSize: 12,
            }}
            placeholderTextColor={colors.placeholderText}
          />
        </View>
        <View>
          <Text style={{ color: colors.placeholderText }}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholderTextColor={colors.placeholderText}
            style={{
              color: "black",
              borderColor: colors.borderColor,
              borderWidth: 1,
              paddingHorizontal: 80,
              paddingVertical: 8,
              borderRadius: 5,
              marginBottom: 10,
              fontSize: 12,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.brandColor,
            padding: 10,
            borderRadius: 5,
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
          onPress={() => {
            setLoading(true);
            axios
              .post(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
                identifier,
                password,
              })
              .then(async (res) => {
                await SecureStore.setItemAsync("token", res.data.token);
                setParent(res.data.parent);
                console.log("parent: " + res.data.parent);
                console.log("children: " + res.data.parent.children);

                router.push("/(tabs)");
              })
              .catch((err) => {
                console.log("error: " + err);

                alert(err.response.data || "Error logging in");
              })
              .finally(() => setLoading(false));
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>LogIn</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        onPress={() => router.replace("/")}
      >
        <Svg width={24} height={24} viewBox="0 0 640 640" fill={"black"}>
          <Path d="M73.4 297.4C60.9 309.9 60.9 330.2 73.4 342.7L233.4 502.7C245.9 515.2 266.2 515.2 278.7 502.7C291.2 490.2 291.2 469.9 278.7 457.4L173.3 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L173.3 288L278.7 182.6C291.2 170.1 291.2 149.8 278.7 137.3C266.2 124.8 245.9 124.8 233.4 137.3L73.4 297.3z" />
        </Svg>
        <Text>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
