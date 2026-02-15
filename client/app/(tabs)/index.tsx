import * as SecureStore from "expo-secure-store";
import { TUserContext, UserContext } from "@/contexts/UserContext";
import moment from "moment";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { TIncident } from "@/types";
import axios from "axios";
import { colors } from "@/themes/colors";
import Incident from "@/components/Incident";
import { FlatList } from "react-native";

export default function Page() {
  const [incidents, setIncidents] = useState<TIncident[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const context = useContext<TUserContext>(
    UserContext as React.Context<TUserContext>,
  );

  const fetchIncidents = async () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/incidents?page=${page}`, {
        headers: {
          Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
        },
      })
      .then((res) => {
        setIncidents(res.data);
        setPage((prev) => prev + 1);
      })
      .catch((err) => {
        setError(err.response.data || "Error fetching incidents");
      });
  };
  useEffect(() => {
    const validateToken = async () => {
      if (!(await SecureStore.getItemAsync("token"))) {
        alert("Please LogIn");
        router.replace("/login");
      }
    };
    validateToken();
  }, []);
  useEffect(() => {
    if (!context.parent) return;
    fetchIncidents();
  }, [context.parent]);
  return !context.parent ? (
    <ActivityIndicator
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
    />
  ) : (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 22,
          marginVertical: 40,
          fontWeight: "500",
        }}
      >
        Welcome Mr. / Mrs. {context.parent?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          zIndex: 50,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            {context.parent?.children.length}
          </Text>
          <Text style={{ color: colors.secondaryText, fontWeight: 500 }}>
            Children
          </Text>
        </View>
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            {incidents.length}
          </Text>
          <Text style={{ color: colors.secondaryText, fontWeight: "500" }}>
            Total Incidents
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "500",
            marginLeft: 20,
            marginVertical: 20,
          }}
        >
          Recent Incidents
        </Text>
        <FlatList
          style={{ flex: 1 }}
          data={incidents}
          onEndReached={fetchIncidents}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <Incident incident={item} key={item.id} />}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            error !== "" && error !== null ? (
              <Text
                style={{
                  color: colors.dangerColor,
                  fontSize: 18,
                  textAlign: "center",
                  marginVertical: 60,
                  fontWeight: "500",
                }}
              >
                {error}
              </Text>
            ) : null
          }
        ></FlatList>
      </View>
    </View>
  );
}
