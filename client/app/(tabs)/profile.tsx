import { TUserContext, UserContext } from "@/contexts/UserContext";
import { colors } from "@/themes/colors";
import { router } from "expo-router";
import { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Profile() {
  const { parent, logout } = useContext<TUserContext>(
    UserContext as React.Context<TUserContext>,
  );
  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
            gap: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.brandColor,
              padding: 10,
              borderRadius: 100,
            }}
          >
            <Svg fill={"white"} width={36} height={36} viewBox="0 0 640 640">
              <Path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
            </Svg>
          </View>
          <Text
            style={{
              textTransform: "capitalize",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            The {parent?.name} family
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", paddingHorizontal: 20, gap: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 10 }}>
          My Children:{" "}
        </Text>
        {parent?.child.map((c) => (
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: `/child/[id]`,
                params: { id: c.id },
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              borderColor: colors.borderColor,
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
            }}
            key={c.id}
          >
            <View
              style={{
                padding: 10,
                borderRadius: 100,
                backgroundColor: "#e6e6e6",
              }}
            >
              <Svg
                fill={"#9732a8"}
                width={18}
                height={18}
                viewBox="0 0 640 640"
              >
                <Path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
              </Svg>
            </View>
            <Text style={{ textTransform: "capitalize" }}>
              {c.name.split(" ")[0]}
            </Text>
            <Text style={{ color: colors.secondaryText, fontWeight: "500" }}>
              {c.grade}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.dangerColor,
          margin: 20,
          paddingVertical: 10,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={logout}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
