import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AccountSecurityScreen() {
  const navigation = useNavigation();
  const [twoFactor, setTwoFactor] = React.useState(true);
  const [biometrics, setBiometrics] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Security</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="shield-checkmark" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
                <Text style={styles.settingDescription}>Add an extra layer of security</Text>
              </View>
            </View>
            <Switch value={twoFactor} onValueChange={setTwoFactor} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="finger-print" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Biometric Login</Text>
                <Text style={styles.settingDescription}>Use fingerprint or face recognition</Text>
              </View>
            </View>
            <Switch value={biometrics} onValueChange={setBiometrics} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Security Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Use a strong, unique password</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Enable two-factor authentication</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Never share your credentials</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.tipText}>Logout from shared devices</Text>
          </View>
        </View>

        <View style={styles.securityCard}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Your account is secure</Text>
            <Text style={styles.securityDescription}>Last security scan: Today, 2:30 PM</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FB" },
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
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#003366" },
  headerRight: { width: 32 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
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
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a1a", marginBottom: 16 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingItemLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  settingTitle: { fontSize: 15, color: "#1a1a1a" },
  settingDescription: { fontSize: 12, color: "#999" },
  tipItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  tipText: { fontSize: 14, color: "#555" },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    gap: 12,
  },
  securityTextContainer: { flex: 1 },
  securityTitle: { fontSize: 14, fontWeight: "600", color: "#2E7D32" },
  securityDescription: { fontSize: 12, color: "#666" },
});