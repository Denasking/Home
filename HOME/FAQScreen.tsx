import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FAQ_DATA = [
  {
    id: "1",
    question: "How do I renew my vehicle license?",
    answer: "To renew your vehicle license, go to the Vehicle License screen and tap the 'Renew' button. You will be directed to the Appointments screen to schedule a renewal appointment.",
  },
  {
    id: "2",
    question: "How can I pay my traffic fines?",
    answer: "Navigate to the Traffic Fines screen, select the fines you want to pay, and tap the 'Pay Now' button. You can pay using card, EFT, or mobile payment methods.",
  },
  {
    id: "3",
    question: "What documents do I need for a driver's license renewal?",
    answer: "You need your current driver's license, ID document, proof of address, and passport-sized photos. You'll also need to complete the application form.",
  },
  {
    id: "4",
    question: "How do I change my vehicle ownership?",
    answer: "Go to the Services section and select 'Change of Ownership'. You'll need the vehicle registration certificate, ID of both parties, and proof of address.",
  },
  {
    id: "5",
    question: "What are the operating hours for licensing departments?",
    answer: "Most licensing departments operate Monday to Friday from 8:00 AM to 4:00 PM. Some branches may have extended hours on Wednesdays.",
  },
  {
    id: "6",
    question: "How can I get a digital copy of my license?",
    answer: "Your digital license is available in the Driver License section. Tap 'Digital License' to view and download your digital copy.",
  },
  {
    id: "7",
    question: "What happens if I lose my driver's license?",
    answer: "Report the loss to the nearest police station and obtain a police report. Then visit your local licensing department with the report, ID, and photos to apply for a re-issue.",
  },
  {
    id: "8",
    question: "How do I schedule a driving test?",
    answer: "Navigate to Services > Driver's Test. You'll find available dates and times. Select your preferred slot and complete the booking process.",
  },
];

export default function FAQScreen() {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#003366" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {FAQ_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.faqItem, expandedId === item.id && styles.faqItemExpanded]}
            onPress={() => toggleExpand(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Ionicons
                name={expandedId === item.id ? "chevron-up" : "chevron-down"}
                size={20}
                color="#003366"
              />
            </View>
            {expandedId === item.id && (
              <View style={styles.faqAnswerContainer}>
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  faqItemExpanded: {
    borderLeftWidth: 3,
    borderLeftColor: "#003366",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a1a",
    flex: 1,
    marginRight: 12,
  },
  faqAnswerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});