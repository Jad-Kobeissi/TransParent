import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { JSX } from "react";

function Nav() {
  return (
    <View style={styles.nav}>
      <View style={styles.navLeft}>
        <Text style={styles.navTitle}>TransParent</Text>
        <Text style={styles.navSubtitle}>Know more. Worry less</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>SignIn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Home() {
  return (
    <View style={styles.home}>
      <Text style={styles.homeTitle}>
        TransParent Communication Between Teachers and Parents
      </Text>
      <Text style={styles.homeDescription}>
        Keep parents informed with instant incident reports and maintain a clear
        record of student behavior and academic progress.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Features() {
  function Card({
    title,
    description,
    icon,
  }: {
    title: string;
    description: string;
    icon: string;
  }) {
    return (
      <View id="features" style={styles.card}>
        <View style={styles.cardIconContainer}>
          <Text style={styles.cardIcon}>{icon}</Text>
        </View>
        <View>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </View>
    );
  }

  const cards: Array<{ title: string; description: string; icon: string }> = [
    {
      title: "Instant Reports",
      description:
        "Send incident reports to parents immediately with detailed descriptions and severity levels.",
      icon: "💬",
    },
    {
      title: "Secure Platform",
      description:
        "All communications are encrypted and stored securely, ensuring student privacy and data protection",
      icon: "🔒",
    },
    {
      title: "Track History",
      description:
        "Maintain a complete record of all incidents and communications for each student.",
      icon: "⏱️",
    },
  ];

  return (
    <View style={styles.features}>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          icon={card.icon}
        />
      ))}
    </View>
  );
}

export default function Page() {
  return (
    <ScrollView style={styles.container}>
      <Nav />
      <Home />
      <Features />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginTop: 35,
  },
  navLeft: {
    alignItems: "center",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  navSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 16,
  },
  buttonSecondaryText: {
    color: "#000",
  },
  home: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 120,
    marginHorizontal: 12,
    gap: 12,
  },
  homeTitle: {
    fontSize: 32,
    textAlign: "center",
    maxWidth: 600,
    fontWeight: "600",
  },
  homeDescription: {
    color: "#666",
    textAlign: "center",
    maxWidth: 600,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  features: {
    alignItems: "center",
    marginVertical: 80,
    gap: 32,
  },
  card: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: "90%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 12,
  },
  cardIconContainer: {
    backgroundColor: "#E3F2FD",
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 8,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
});
