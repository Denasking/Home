import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NotificationsSettingsScreen() {
  const navigation = useNavigation();
  const [settings, setSettings] = React.useState({
    appointments: true,
    licenseRenewals: true,
    trafficFines: true,
    payments: true,
    announcements: true,
    emailNotifications: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Push Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="calendar" size={22} color="#2196F3" />
              <View>
                <Text style={styles.settingTitle}>Appointments</Text>
                <Text style={styles.settingDescription}>Reminders and updates about appointments</Text>
              </View>
            </View>
            <Switch value={settings.appointments} onValueChange={() => toggleSetting('appointments')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="car" size={22} color="#FF9800" />
              <View>
                <Text style={styles.settingTitle}>License Renewals</Text>
                <Text style={styles.settingDescription}>Alerts for license expirations</Text>
              </View>
            </View>
            <Switch value={settings.licenseRenewals} onValueChange={() => toggleSetting('licenseRenewals')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="warning" size={22} color="#F44336" />
              <View>
                <Text style={styles.settingTitle}>Traffic Fines</Text>
                <Text style={styles.settingDescription}>New fines and payment confirmations</Text>
              </View>
            </View>
            <Switch value={settings.trafficFines} onValueChange={() => toggleSetting('trafficFines')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="wallet" size={22} color="#9C27B0" />
              <View>
                <Text style={styles.settingTitle}>Payments</Text>
                <Text style={styles.settingDescription}>Payment confirmations and reminders</Text>
              </View>
            </View>
            <Switch value={settings.payments} onValueChange={() => toggleSetting('payments')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="megaphone" size={22} color="#607D8B" />
              <View>
                <Text style={styles.settingTitle}>Announcements</Text>
                <Text style={styles.settingDescription}>System updates and announcements</Text>
              </View>
            </View>
            <Switch value={settings.announcements} onValueChange={() => toggleSetting('announcements')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingItemLeft}>
              <Ionicons name="mail" size={22} color="#003366" />
              <View>
                <Text style={styles.settingTitle}>Receive Email Updates</Text>
                <Text style={styles.settingDescription}>Get important updates via email</Text>
              </View>
            </View>
            <Switch value={settings.emailNotifications} onValueChange={() => toggleSetting('emailNotifications')} trackColor={{ false: "#ccc", true: "#003366" }} />
          </View>
        </View>

        <View style={styles.prefsCard}>
          <Text style={styles.prefsText}>Choose which notifications you want to receive.</Text>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FB" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#003366" },
  headerRight: { width: 32 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a1a", marginBottom: 16 },
  
  settingItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  settingItemLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  settingTitle: { fontSize: 15, color: "#1a1a1a" },
  settingDescription: { fontSize: 12, color: "#999" },
  
  prefsCard: { backgroundColor: "#E8EEF5", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 10 },
  prefsText: { fontSize: 14, color: "#003366", textAlign: "center", marginBottom: 12 },
  resetButton: { backgroundColor: "#003366", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  resetButtonText: { color: "#fff", fontSize: 14, fontWeight: "500" },
});