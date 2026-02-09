import * as SecureStore from "expo-secure-store";
import { TChild, TIncident } from "@/types";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Incident from "@/components/Incident";
import { colors } from "@/themes/colors";
import Svg, { Path } from "react-native-svg";

export default function ChildIncidents() {
  const { id } = useLocalSearchParams();
  const [child, setChild] = useState<TChild | null>(null);
  const [incidents, setIncidents] = useState<TIncident[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const fetchChild = async () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/child/${id}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);

        setChild(res.data);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data || err.message || "An unexpected error occurred.";
        alert("There was an error: " + errorMsg);
        console.log(errorMsg);
        setError(errorMsg);
      });
  };
  const fetchIncidents = async () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/incidents/child/${id}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      })
      .then((res) => {
        setIncidents((prev) => {
          const unfiltered = [...prev, ...res.data];

          const filtered = new Map(
            unfiltered.map((item) => [item.id, item]),
          ).values();

          return Array.from(filtered);
        });
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        setError(
          err.response?.data || err.message || "An unexpected error occurred.",
        );
      });
  };
  useEffect(() => {
    fetchChild();
    fetchIncidents();
  }, []);
  return (
    <View style={{ alignItems: "center", marginVertical: 200, gap: 30 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <View
          style={{
            padding: 10,
            borderRadius: 100,
            backgroundColor: "#e6e6e6",
          }}
        >
          <Svg
            fill={colors.brandColor}
            width={36}
            height={36}
            viewBox="0 0 640 640"
          >
            <Path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
          </Svg>
        </View>
        <Text
          style={{
            textTransform: "capitalize",
            fontSize: 24,
            fontWeight: "600",
          }}
        >
          {child?.name.split(" ")[0].toLocaleLowerCase()}
        </Text>
      </View>
      {error && (
        <Text style={{ color: colors.dangerColor, fontSize: 18 }}>{error}</Text>
      )}
      {incidents.map((incident) => (
        <Incident key={incident.id} incident={incident} />
      ))}
    </View>
  );
}
