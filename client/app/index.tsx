import { MotiView } from "moti";
import { colors } from "@/themes/colors";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Index() {
  const cards = [
    {
      title: "Real-time Notifications",
      description: "Get instant alerts about school incidents",
      iconColor: "#12e34a",
      bgColor: "#12e34a34",
    },
    {
      title: "Track Multiple Children",
      description: "Manage all of your children in one place",
      iconColor: "#125fe3",
      bgColor: "#125fe334",
    },
    {
      title: "Detailed Reports",
      description: "View complete incident history and details",
      iconColor: "#9612e3",
      bgColor: "#9612e334",
    },
  ];
  function Card({
    title,
    description,
    iconColor,
    bgColor,
    delay,
  }: {
    title: string;
    description: string;
    iconColor: string;
    bgColor: string;
    delay: number;
  }) {
    return (
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 500, delay }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          width: 300,
        }}
      >
        <View
          style={{
            backgroundColor: bgColor,
            borderRadius: 100,
            padding: 4,
          }}
        >
          <Svg width={30} height={30} viewBox="0 0 24 24" fill={"none"}>
            <Path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 2.99994 12 2.99994C7.0294 2.99994 2.99994 7.0294 2.99994 12C2.99994 16.9706 7.0294 21 12 21Z"
              stroke={iconColor}
              stroke-linecap="square"
              stroke-linejoin="round"
              strokeWidth="1.3"
            />
            <Path
              d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
              fill={iconColor}
            />
            <Path d="M12 17V11" stroke={iconColor} strokeWidth="2" />
          </Svg>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
          <Text style={{ color: colors.secondaryText, textAlign: "center" }}>
            {description}
          </Text>
        </View>
      </MotiView>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
        gap: 60,
      }}
    >
      <View
        style={{ flexDirection: "column", justifyContent: "center", gap: 20 }}
      >
        <View style={{ alignItems: "center", gap: 10 }}>
          <View
            style={{
              backgroundColor: colors.brandColor,
              borderRadius: 100,
              padding: 10,
            }}
          >
            <Svg width={70} height={70} viewBox="0 0 24 24" fill={"none"}>
              <Path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.0294 16.9706 2.99994 12 2.99994C7.0294 2.99994 2.99994 7.0294 2.99994 12C2.99994 16.9706 7.0294 21 12 21Z"
                stroke={"white"}
                stroke-linecap="square"
                stroke-linejoin="round"
                strokeWidth="1.3"
              />
              <Path
                d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                fill={"white"}
              />
              <Path d="M12 17V11" stroke={"white"} strokeWidth="2" />
            </Svg>
          </View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            Welcome To TransParent
          </Text>
          <Text style={{ color: colors.secondaryText, textAlign: "center" }}>
            Stay informed about your children's school activities and incidents
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.brandColor,
              marginHorizontal: 20,
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 5,
            }}
            onPress={() => router.push("/login")}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              LogIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            bgColor={card.bgColor}
            iconColor={card.iconColor}
            delay={index * 100}
          />
        ))}
      </View>
    </ScrollView>
  );
}
