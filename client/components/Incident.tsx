import { colors } from "@/themes/colors";
import { TIncident } from "@/types";
import moment from "moment";
import { MotiView } from "moti";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Incident({ incident }: { incident: TIncident }) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1 }}
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        gap: 10,
        margin: 15,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      key={incident.id}
    >
      <View style={{ gap: 5, width: "80%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "500" }}>{incident.title}</Text>
          <Text style={{ color: colors.secondaryText }}>
            {moment(incident.occurredAt).fromNow()}
          </Text>
        </View>
        <Text>{incident.description}</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 5,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <Text style={{ textTransform: "capitalize" }}>
              {String(incident.child.name.split(" ")[0].toLocaleLowerCase()) ??
                "Unknown"}
            </Text>
          </View>
          {incident.type.toString() == "negative" && (
            <View
              style={{
                backgroundColor: "white",
                padding: 5,
                paddingHorizontal: 15,
                borderRadius: 15,
              }}
            >
              <Text style={{ textTransform: "capitalize" }}>
                Severity: {incident.severity}
              </Text>
            </View>
          )}
        </View>
      </View>
    </MotiView>
  );
}
