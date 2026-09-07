import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function DataPrivacyScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Data Privacy Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Data Privacy</Text>
          <Text style={styles.cardText}>
            We take your privacy seriously. Here's how we handle your data:
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Collection</Text>
          <Text style={styles.cardText}>
            • We collect only the information you provide{'\n'}
            • Your name, ID number, and contact details{'\n'}
            • Vehicle and license information{'\n'}
            • Payment and transaction history
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Usage</Text>
          <Text style={styles.cardText}>
            • Process license applications and renewals{'\n'}
            • Send notifications and reminders{'\n'}
            • Process payments and generate receipts{'\n'}
            • Improve our services and user experience
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Protection</Text>
          <Text style={styles.cardText}>
            • All data is encrypted in transit and at rest{'\n'}
            • Access is restricted to authorized personnel{'\n'}
            • Regular security audits and updates{'\n'}
            • GDPR and POPIA compliant
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Rights</Text>
          <Text style={styles.cardText}>
            • Access your data at any time{'\n'}
            • Request data correction or deletion{'\n'}
            • Opt-out of marketing communications{'\n'}
            • Data portability options
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
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a1a", marginBottom: 12 },
  cardText: { fontSize: 15, lineHeight: 24, color: "#555" },
});