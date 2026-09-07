import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last Updated: August 2026</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.cardText}>
            Traffic Connect ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our mobile application.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Information We Collect</Text>
          <Text style={styles.cardText}>
            We collect information that you voluntarily provide to us, including:
          </Text>
          <Text style={styles.listItem}>• Personal identification information (name, ID number, contact details)</Text>
          <Text style={styles.listItem}>• Vehicle and license information</Text>
          <Text style={styles.listItem}>• Payment and transaction history</Text>
          <Text style={styles.listItem}>• Device information for app functionality</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
          <Text style={styles.cardText}>
            We use your information to:
          </Text>
          <Text style={styles.listItem}>• Process license applications and renewals</Text>
          <Text style={styles.listItem}>• Send notifications and reminders</Text>
          <Text style={styles.listItem}>• Process payments and generate receipts</Text>
          <Text style={styles.listItem}>• Improve our services and user experience</Text>
          <Text style={styles.listItem}>• Comply with legal requirements</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Data Protection</Text>
          <Text style={styles.cardText}>
            We implement appropriate technical and organizational measures to protect your personal information, including encryption, access controls, and regular security audits.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.cardText}>
            You have the right to:
          </Text>
          <Text style={styles.listItem}>• Access your personal data</Text>
          <Text style={styles.listItem}>• Request data correction or deletion</Text>
          <Text style={styles.listItem}>• Opt-out of marketing communications</Text>
          <Text style={styles.listItem}>• Data portability</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Contact Us</Text>
          <Text style={styles.cardText}>
            If you have questions about this Privacy Policy, contact us at:
          </Text>
          <Text style={styles.contactText}>Email: choene@gmail.com</Text>
          <Text style={styles.contactText}>Phone: 067 092 3899</Text>
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
  cardTitle: { fontSize: 22, fontWeight: "700", color: "#1a1a1a", marginBottom: 4 },
  lastUpdated: { fontSize: 14, color: "#999", marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#003366", marginBottom: 8 },
  cardText: { fontSize: 15, lineHeight: 24, color: "#555", marginBottom: 8 },
  listItem: { fontSize: 14, lineHeight: 22, color: "#555", paddingLeft: 16, marginBottom: 4 },
  contactText: { fontSize: 15, color: "#003366", fontWeight: "500", marginTop: 8 },
});