import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function UserGuideScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Guide</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <Text style={styles.cardText}>
            Welcome to Traffic Connect! This guide will help you navigate the app and make the most of its features.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Home Screen</Text>
          <Text style={styles.cardText}>
            The home screen gives you an overview of your important information:
          </Text>
          <Text style={styles.listItem}>• Quick stats for vehicles, fines, and appointments</Text>
          <Text style={styles.listItem}>• Status cards for license, fines, and appointments</Text>
          <Text style={styles.listItem}>• Quick action buttons for common tasks</Text>
          <Text style={styles.listItem}>• Real-time traffic and weather updates</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Vehicle License</Text>
          <Text style={styles.cardText}>
            Manage your vehicle license information:
          </Text>
          <Text style={styles.listItem}>• View vehicle details and registration</Text>
          <Text style={styles.listItem}>• Track license expiry date</Text>
          <Text style={styles.listItem}>• Renew vehicle license</Text>
          <Text style={styles.listItem}>• Download or share license information</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Driver's License</Text>
          <Text style={styles.cardText}>
            Access and manage your driver's license:
          </Text>
          <Text style={styles.listItem}>• View license details and class</Text>
          <Text style={styles.listItem}>• Track expiry and renew</Text>
          <Text style={styles.listItem}>• View digital license</Text>
          <Text style={styles.listItem}>• Update personal information</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Traffic Fines</Text>
          <Text style={styles.cardText}>
            Handle your traffic fines:
          </Text>
          <Text style={styles.listItem}>• View all fines with status</Text>
          <Text style={styles.listItem}>• Pay fines individually or in bulk</Text>
          <Text style={styles.listItem}>• Download fine notices</Text>
          <Text style={styles.listItem}>• Dispute fines if necessary</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Appointments</Text>
          <Text style={styles.cardText}>
            Schedule and manage appointments:
          </Text>
          <Text style={styles.listItem}>• Book new appointments</Text>
          <Text style={styles.listItem}>• View upcoming appointments</Text>
          <Text style={styles.listItem}>• Cancel or reschedule</Text>
          <Text style={styles.listItem}>• Get reminders</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Profile Settings</Text>
          <Text style={styles.cardText}>
            Manage your account:
          </Text>
          <Text style={styles.listItem}>• View your personal information</Text>
          <Text style={styles.listItem}>• Access settings</Text>
          <Text style={styles.listItem}>• Logout securely</Text>
        </View>

        <View style={styles.footerCard}>
          <Ionicons name="bulb-outline" size={24} color="#003366" />
          <Text style={styles.footerText}>
            For additional help, visit our Help & Support section or contact our support team.
          </Text>
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
  cardTitle: { fontSize: 20, fontWeight: "700", color: "#1a1a1a", marginBottom: 8 },
  sectionTitle: { fontSize: 17, fontWeight: "600", color: "#003366", marginBottom: 8 },
  cardText: { fontSize: 15, lineHeight: 24, color: "#555", marginBottom: 8 },
  listItem: { fontSize: 14, lineHeight: 22, color: "#555", paddingLeft: 16, marginBottom: 4 },
  footerCard: {
    backgroundColor: "#E8EEF5",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },
  footerText: { flex: 1, fontSize: 14, color: "#003366", lineHeight: 20 },
});