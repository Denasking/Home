import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HELP_ITEMS = [
  { id: "faq", title: "Frequently Asked Questions", icon: "help-circle", screen: "FAQ" },
  { id: "guide", title: "User Guide", icon: "book", screen: "UserGuide" },
  { id: "report", title: "Report an Issue", icon: "bug", screen: null },
  { id: "feedback", title: "Send Feedback", icon: "chatbubble", screen: null },
];

export default function HelpSupportScreen() {
  const navigation = useNavigation<any>();
  
  const handleCall = () => {
    Linking.openURL("tel:0670923899").catch(() => {
      Alert.alert("Error", "Phone calls are not supported on this device.");
    });
  };

  const handleEmail = () => {
    Linking.openURL("mailto:choene@gmail.com").catch(() => {
      Alert.alert("Error", "Email is not supported on this device.");
    });
  };

  const handleChat = () => {
    Linking.openURL("sms:0670923899").catch(() => {
      Alert.alert("Error", "SMS is not supported on this device.");
    });
  };

  // FIXED: Properly closed parentheses and fixed string formatting
  const handleHelpItemPress = (item: any) => {
    if (item.screen === "FAQ") {
      navigation.navigate("FAQ");
    } else if (item.screen === "UserGuide") {
      navigation.navigate("UserGuide");
    } else if (item.id === "report") {
      Alert.alert("Report an Issue", "Please describe the issue you're experiencing and we'll help you resolve it.");
    } else if (item.id === "feedback") {
      Alert.alert("Send Feedback", "We value your feedback! Please share your thoughts with us.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Ionicons name="headset" size={48} color="#003366" />
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>Find answers to your questions or contact our support team</Text>
        </View>

        {HELP_ITEMS.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.helpItem}
            onPress={() => handleHelpItemPress(item)}
          >
            <View style={styles.helpItemLeft}>
              <Ionicons name={item.icon as any} size={22} color="#003366" />
              <Text style={styles.helpItemTitle}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Contact Support</Text>
          <Text style={styles.contactText}>Our support team is available 24/7 to assist you</Text>
          
          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Call Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.contactButton, styles.contactButtonSecondary]} onPress={handleEmail}>
            <Ionicons name="mail" size={20} color="#003366" />
            <Text style={[styles.contactButtonText, styles.contactButtonTextSecondary]}>Email Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.contactButton, styles.contactButtonSecondary]} onPress={handleChat}>
            <Ionicons name="chatbubble" size={20} color="#003366" />
            <Text style={[styles.contactButtonText, styles.contactButtonTextSecondary]}>Chat Support</Text>
          </TouchableOpacity>
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
  heroSection: {
    alignItems: "center",
    marginVertical: 30,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginTop: 12,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 4,
  },
  helpItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  helpItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  helpItemTitle: {
    fontSize: 15,
    color: "#1a1a1a",
  },
  contactCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
    marginBottom: 10,
  },
  contactButtonSecondary: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#003366",
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contactButtonTextSecondary: {
    color: "#003366",
  },
});