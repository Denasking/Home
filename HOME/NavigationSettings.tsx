import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NavigationSettingsScreen() {
  const navigation = useNavigation<any>();
  const [keepScreenOn, setKeepScreenOn] = React.useState(true);
  const [animations, setAnimations] = React.useState(true);
  const [gestures, setGestures] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Navigation Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Navigation Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="phone-portrait" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Keep Screen On</Text>
                <Text style={styles.settingDescription}>Prevent screen from turning off during navigation</Text>
              </View>
            </View>
            <Switch value={keepScreenOn} onValueChange={setKeepScreenOn} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="move" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Screen Animations</Text>
                <Text style={styles.settingDescription}>Enable smooth transitions between screens</Text>
              </View>
            </View>
            <Switch value={animations} onValueChange={setAnimations} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="hand-left" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Gesture Navigation</Text>
                <Text style={styles.settingDescription}>Use swipe gestures to navigate</Text>
              </View>
            </View>
            <Switch value={gestures} onValueChange={setGestures} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Navigation</Text>
          
          {/* FIXED: Changed Onicons to Ionicons and fixed spacing */}
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => navigation.navigate("Home")}
          >
            <View style={styles.navItemLeft}>
              <Ionicons name="home" size={22} color="#003366" />
              <Text style={styles.navItemTitle}>Go to Home</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => navigation.navigate("Profile")}
          >
            <View style={styles.navItemLeft}>
              <Ionicons name="person" size={22} color="#003366" />
              <Text style={styles.navItemTitle}>Go to Profile</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => navigation.navigate("Notifications")}
          >
            <View style={styles.navItemLeft}>
              <Ionicons name="notifications" size={22} color="#003366" />
              <Text style={styles.navItemTitle}>Go to Notifications</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#003366" />
          <Text style={styles.infoText}>
            Customize your navigation experience. Changes apply immediately.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#003366",
  },
  headerRight: {
    width: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  settingDescription: {
    fontSize: 12,
    color: "#999",
  },
  navItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  navItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  navItemTitle: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8EEF5",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: "#003366",
    lineHeight: 20,
  },
});