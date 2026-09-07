import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AboutAppScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About the App</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Ionicons name="car-sport" size={60} color="#003366" />
          </View>
          <Text style={styles.appName}>Traffic Connect</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About This App</Text>
          <Text style={styles.cardText}>
            Traffic Connect is a comprehensive vehicle license management system designed to streamline 
            the process of managing vehicle licenses, driver's licenses, and related transport services 
            in South Africa.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Features</Text>
          
          <View style={styles.featureItem}>
            <Ionicons name="car-outline" size={20} color="#003366" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Vehicle License Management</Text>
              <Text style={styles.featureDescription}>Track and manage your vehicle license renewals and documents</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="card-outline" size={20} color="#003366" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Driver's License</Text>
              <Text style={styles.featureDescription}>Store and manage your driver's license information securely</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="calendar-outline" size={20} color="#003366" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Appointment Scheduling</Text>
              <Text style={styles.featureDescription}>Book and manage appointments for license renewals</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="warning-outline" size={20} color="#003366" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Traffic Fine Management</Text>
              <Text style={styles.featureDescription}>View and manage traffic fines online</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Ionicons name="notifications-outline" size={20} color="#003366" />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Notifications</Text>
              <Text style={styles.featureDescription}>Get instant updates about your licenses and appointments</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Why Traffic Connect?</Text>
          <Text style={styles.cardText}>
            • Eliminate the need for physical visits to licensing departments{'\n'}
            • Secure digital storage of all your license information{'\n'}
            • Real-time reminders for renewals and appointments{'\n'}{'\n'}
            • Government-compliant platform{'\n'}
            • Accessible anytime, anywhere
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Support</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#003366" />
            <Text style={styles.contactText}>support@trafficconnect.gov.za</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#003366" />
            <Text style={styles.contactText}>0800 123 456</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="globe-outline" size={20} color="#003366" />
            <Text style={styles.contactText}>www.trafficconnect.gov.za</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2026 Department of Transport</Text>
          <Text style={styles.footerText}>All rights reserved</Text>
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
  logoContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#003366",
  },
  appVersion: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
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
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#555",
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 15,
    color: "#555",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 4,
  },
});