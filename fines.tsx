import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock fine data
const MOCK_FINES = [
  {
    id: "1",
    reference: "TF20260001",
    violation: "Speeding",
    dateIssued: "2026-07-15",
    time: "14:30",
    location: "Pretoria CBD, N1 Highway",
    amount: 500,
    status: "Unpaid",
    speedRecorded: 85,
    speedLimit: 60,
    officerName: "Officer M. Nkosi",
    vehicle: "ABC123GP",
    description: "Exceeding speed limit by 25 km/h",
  },
  {
    id: "2",
    reference: "TF20260002",
    violation: "Reckless Driving",
    dateIssued: "2026-07-10",
    time: "08:15",
    location: "Centurion, Old Johannesburg Road",
    amount: 750,
    status: "Unpaid",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer J. Van der Merwe",
    vehicle: "ABC123GP",
    description: "Failure to maintain lane discipline",
  },
  {
    id: "3",
    reference: "TF20260003",
    violation: "Parking Violation",
    dateIssued: "2026-06-28",
    time: "11:45",
    location: "Sandton City Mall",
    amount: 250,
    status: "Paid",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer T. Dlamini",
    vehicle: "ABC123GP",
    description: "Parking in a no-parking zone",
  },
  {
    id: "4",
    reference: "TF20260004",
    violation: "Driving Without License",
    dateIssued: "2026-06-20",
    time: "16:20",
    location: "Midrand, New Road",
    amount: 1000,
    status: "Disputed",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer S. Botha",
    vehicle: "ABC123GP",
    description: "Unable to produce valid driver's license",
  },
  {
    id: "5",
    reference: "TF20260005",
    violation: "Running Red Light",
    dateIssued: "2026-06-05",
    time: "09:30",
    location: "Johannesburg, Rivonia Road",
    amount: 650,
    status: "Paid",
    speedRecorded: null,
    speedLimit: null,
    officerName: "Officer P. Naidoo",
    vehicle: "ABC123GP",
    description: "Disregarded traffic light signal",
  },
];

// NEW FEATURE: Fine status types
type FineStatus = "Unpaid" | "Paid" | "Disputed";

const STATUS_COLORS: Record<FineStatus, string> = {
  Unpaid: "#F44336",
  Paid: "#4CAF50",
  Disputed: "#FF9800",
};

type IoniconsName = React.ComponentProps<typeof Ionicons>["name"];

const STATUS_ICONS: Record<FineStatus, IoniconsName> = {
  Unpaid: "alert-circle",
  Paid: "checkmark-circle",
  Disputed: "help-circle",
};

// NEW FEATURE: Filter options
type FilterOption = "All" | "Unpaid" | "Paid" | "Disputed";

export default function FinesScreen() {
  // NEW FEATURE: State management
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedFine, setSelectedFine] = useState<any>(null);
  const [selectedFines, setSelectedFines] = useState<string[]>([]);

  // NEW FEATURE: Calculate summary statistics
  const getSummary = () => {
    const unpaid = MOCK_FINES.filter(f => f.status === "Unpaid");
    const totalUnpaid = unpaid.reduce((sum, f) => sum + f.amount, 0);
    return {
      outstandingBalance: totalUnpaid,
      unpaidCount: unpaid.length,
      totalFines: MOCK_FINES.length,
    };
  };

  // NEW FEATURE: Filter fines based on selected filter
  const getFilteredFines = () => {
    switch (selectedFilter) {
      case "Unpaid":
        return MOCK_FINES.filter(f => f.status === "Unpaid");
      case "Paid":
        return MOCK_FINES.filter(f => f.status === "Paid");
      case "Disputed":
        return MOCK_FINES.filter(f => f.status === "Disputed");
      default:
        return MOCK_FINES;
    }
  };

  const summary = getSummary();
  const filteredFines = getFilteredFines();

  // NEW FEATURE: Get status color
  const getStatusColor = (status: FineStatus) => {
    return STATUS_COLORS[status] || "#999";
  };

  // NEW FEATURE: Get status icon
  const getStatusIcon = (status: FineStatus) => {
    return STATUS_ICONS[status] || "information-circle";
  };

  // NEW FEATURE: Handle view fine details
  const handleViewDetails = (fine: any) => {
    setSelectedFine(fine);
    setShowDetailsModal(true);
  };

  // NEW FEATURE: Handle pay fine
  const handlePayFine = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPayModal(false);
      Alert.alert(
        "Success",
        "Your fine payment has been processed successfully!"
      );
      // TODO: Process fine payment in Firebase
    }, 2000);
  };

  // NEW FEATURE: Handle download fine notice
  const handleDownload = () => {
    Alert.alert(
      "Download Notice",
      "Your fine notice is being downloaded.",
      [{ text: "OK" }]
    );
    // TODO: Download fine notice PDF
  };

  // NEW FEATURE: Handle dispute fine
  const handleDispute = () => {
    Alert.alert(
      "Dispute Fine",
      "Your dispute has been submitted. You will be notified of the outcome.",
      [{ text: "OK" }]
    );
    // TODO: Submit dispute to Firebase
  };

  // NEW FEATURE: Handle bulk pay
  const handleBulkPay = () => {
    if (selectedFines.length === 0) {
      Alert.alert("Info", "Please select at least one fine to pay.");
      return;
    }
    setShowPayModal(true);
  };

  // NEW FEATURE: Toggle fine selection
  const toggleFineSelection = (fineId: string) => {
    setSelectedFines(prev =>
      prev.includes(fineId)
        ? prev.filter(id => id !== fineId)
        : [...prev, fineId]
    );
  };

  // NEW FEATURE: Render summary card
  const renderSummaryCard = () => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Outstanding Balance</Text>
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryAmount}>R{summary.outstandingBalance}</Text>
          <Text style={styles.summaryLabel}>Total Outstanding</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryCount}>{summary.unpaidCount}</Text>
          <Text style={styles.summaryLabel}>Unpaid Fines</Text>
        </View>
      </View>
      <View style={styles.summaryActions}>
        <TouchableOpacity 
          style={styles.payNowButton}
          onPress={handleBulkPay}
        >
          <Ionicons name="card-outline" size={20} color="#fff" />
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryInfoButton}>
          <Ionicons name="information-circle-outline" size={20} color="#003366" />
          <Text style={styles.summaryInfoText}>Total Fines: {summary.totalFines}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // NEW FEATURE: Render filter chips
  const renderFilterChips = () => {
    const filters: FilterOption[] = ["All", "Unpaid", "Paid", "Disputed"];
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === filter && styles.filterChipTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  // NEW FEATURE: Render fine card
  const renderFineCard = (fine: any) => {
    const statusColor = getStatusColor(fine.status as FineStatus);
    const isSelected = selectedFines.includes(fine.id);

    return (
      <View key={fine.id} style={styles.fineCard}>
        <View style={styles.fineHeader}>
          <View style={styles.fineTitleContainer}>
            <View style={styles.fineIconContainer}>
              <Ionicons
                name={fine.violation.includes("Speeding") ? "speedometer-outline" :
                      fine.violation.includes("Parking") ? "car-outline" :
                      fine.violation.includes("Red Light") ? "alert-circle-outline" :
                      "alert-circle-outline"}
                size={24}
                color="#003366"
              />
            </View>
            <View>
              <Text style={styles.fineViolation}>{fine.violation}</Text>
              <Text style={styles.fineReference}>{fine.reference}</Text>
            </View>
          </View>
          <View style={[styles.fineStatusBadge, { backgroundColor: statusColor }]}>
            <Ionicons name={getStatusIcon(fine.status as FineStatus)} size={12} color="#fff" />
            <Text style={styles.fineStatusText}>{fine.status}</Text>
          </View>
        </View>

        <View style={styles.fineBody}>
          <View style={styles.fineDetails}>
            <View style={styles.fineDetail}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.fineDetailText}>{fine.dateIssued}</Text>
            </View>
            <View style={styles.fineDetail}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.fineDetailText}>{fine.time}</Text>
            </View>
            <View style={styles.fineDetail}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.fineDetailText}>{fine.location}</Text>
            </View>
            <View style={styles.fineDetail}>
              <Ionicons name="cash-outline" size={16} color="#666" />
              <Text style={[styles.fineDetailText, styles.fineAmount]}>
                R{fine.amount}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.fineFooter}>
          <View style={styles.fineActions}>
            {fine.status === "Unpaid" && (
              <TouchableOpacity
                style={[styles.selectButton, isSelected && styles.selectButtonActive]}
                onPress={() => toggleFineSelection(fine.id)}
              >
                <Ionicons
                  name={isSelected ? "checkbox" : "square-outline"}
                  size={20}
                  color={isSelected ? "#003366" : "#999"}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => handleViewDetails(fine)}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
              <Ionicons name="arrow-forward" size={16} color="#003366" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // NEW FEATURE: Render details modal
  const renderDetailsModal = () => (
    <Modal
      visible={showDetailsModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDetailsModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Fine Details</Text>
            <TouchableOpacity
              onPress={() => setShowDetailsModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedFine && (
              <View style={styles.detailsContainer}>
                <View style={styles.detailsHeader}>
                  <View style={styles.detailsIconContainer}>
                    <Ionicons
                      name={selectedFine.violation.includes("Speeding") ? "speedometer" :
                            selectedFine.violation.includes("Parking") ? "car" :
                            selectedFine.violation.includes("Red Light") ? "alert-circle" :
                            "alert-circle"}
                      size={40}
                      color="#003366"
                    />
                  </View>
                  <View>
                    <Text style={styles.detailsViolation}>{selectedFine.violation}</Text>
                    <View style={[styles.detailsStatusBadge, { backgroundColor: getStatusColor(selectedFine.status as FineStatus) }]}>
                      <Ionicons name={getStatusIcon(selectedFine.status as FineStatus)} size={14} color="#fff" />
                      <Text style={styles.detailsStatusText}>{selectedFine.status}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailsDivider} />

                <View style={styles.detailsGrid}>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Reference</Text>
                    <Text style={styles.detailsValue}>{selectedFine.reference}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Amount</Text>
                    <Text style={[styles.detailsValue, styles.detailsAmount]}>R{selectedFine.amount}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Date Issued</Text>
                    <Text style={styles.detailsValue}>{selectedFine.dateIssued}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Time</Text>
                    <Text style={styles.detailsValue}>{selectedFine.time}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Location</Text>
                    <Text style={styles.detailsValue}>{selectedFine.location}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Officer</Text>
                    <Text style={styles.detailsValue}>{selectedFine.officerName}</Text>
                  </View>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Vehicle</Text>
                    <Text style={styles.detailsValue}>{selectedFine.vehicle}</Text>
                  </View>
                  {selectedFine.speedRecorded && (
                    <>
                      <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Speed Recorded</Text>
                        <Text style={styles.detailsValue}>{selectedFine.speedRecorded} km/h</Text>
                      </View>
                      <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Speed Limit</Text>
                        <Text style={styles.detailsValue}>{selectedFine.speedLimit} km/h</Text>
                      </View>
                    </>
                  )}
                  <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Description</Text>
                    <Text style={[styles.detailsValue, styles.detailsDescription]}>
                      {selectedFine.description}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsActions}>
                  {selectedFine.status === "Unpaid" && (
                    <TouchableOpacity
                      style={[styles.detailsActionButton, styles.payActionButton]}
                      onPress={() => {
                        setShowDetailsModal(false);
                        setShowPayModal(true);
                      }}
                    >
                      <Ionicons name="card-outline" size={20} color="#fff" />
                      <Text style={styles.detailsActionText}>Pay Fine</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.detailsActionButton, styles.downloadActionButton]}
                    onPress={handleDownload}
                  >
                    <Ionicons name="download-outline" size={20} color="#003366" />
                    <Text style={[styles.detailsActionText, { color: "#003366" }]}>
                      Download
                    </Text>
                  </TouchableOpacity>
                  {selectedFine.status === "Unpaid" && (
                    <TouchableOpacity
                      style={[styles.detailsActionButton, styles.disputeActionButton]}
                      onPress={handleDispute}
                    >
                      <Ionicons name="help-circle-outline" size={20} color="#FF9800" />
                      <Text style={[styles.detailsActionText, { color: "#FF9800" }]}>
                        Dispute
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* TODO: Add Firebase functionality */}
                {/* // TODO: Fetch traffic fines from Firebase */}
                {/* // TODO: Fetch outstanding balance */}
                {/* // TODO: Pay fine */}
                {/* // TODO: Download fine notice */}
                {/* // TODO: Dispute fine */}
                {/* // TODO: Listen for real-time updates */}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render pay modal
  const renderPayModal = () => (
    <Modal
      visible={showPayModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPayModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pay Fine</Text>
            <TouchableOpacity
              onPress={() => setShowPayModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.payInfoCard}>
              <Ionicons name="information-circle" size={32} color="#003366" />
              <Text style={styles.payInfoText}>
                You are about to pay {selectedFines.length} fine(s) totaling R
                {selectedFines.reduce((sum, id) => {
                  const fine = MOCK_FINES.find(f => f.id === id);
                  return sum + (fine ? fine.amount : 0);
                }, 0)}
              </Text>
            </View>

            <View style={styles.payDetails}>
              {selectedFines.map((id) => {
                const fine = MOCK_FINES.find(f => f.id === id);
                return fine && (
                  <View key={id} style={styles.payItem}>
                    <Text style={styles.payItemReference}>{fine.reference}</Text>
                    <Text style={styles.payItemAmount}>R{fine.amount}</Text>
                  </View>
                );
              })}
              <View style={styles.payTotal}>
                <Text style={styles.payTotalLabel}>Total</Text>
                <Text style={styles.payTotalAmount}>
                  R{selectedFines.reduce((sum, id) => {
                    const fine = MOCK_FINES.find(f => f.id === id);
                    return sum + (fine ? fine.amount : 0);
                  }, 0)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.paySubmitButton, loading && styles.submitButtonDisabled]}
              onPress={handlePayFine}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.paySubmitText}>Confirm Payment</Text>
                </>
              )}
            </TouchableOpacity>

            {/* TODO: Process payment with payment gateway */}
            {/* // TODO: Process fine payment */}
            {/* // TODO: Update fine status in Firebase */}
            {/* // TODO: Send payment confirmation */}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render loading state
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#003366" />
      <Text style={styles.loadingText}>Loading fines...</Text>
    </View>
  );

  // NEW FEATURE: Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="checkmark-done-circle" size={80} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>No Traffic Fines</Text>
      <Text style={styles.emptySubtitle}>
        You currently have no {selectedFilter.toLowerCase()} traffic fines.
        Keep up the good driving!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Traffic Fines</Text>
        <Text style={styles.subtitle}>
          View and manage your traffic fines
        </Text>
      </View>

      {loading ? (
        renderLoadingState()
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderSummaryCard()}
          {renderFilterChips()}
          
          {filteredFines.length === 0 ? (
            renderEmptyState()
          ) : (
            filteredFines.map((fine) => renderFineCard(fine))
          )}
        </ScrollView>
      )}

      {renderDetailsModal()}
      {renderPayModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  // NEW FEATURE: Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  // NEW FEATURE: Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  // NEW FEATURE: Summary card styles
  summaryCard: {
    backgroundColor: "#003366",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#003366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryTitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "400",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  summaryCount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  summaryLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  summaryActions: {
    flexDirection: "row",
    gap: 12,
  },
  payNowButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  payNowButtonText: {
    color: "#003366",
    fontSize: 16,
    fontWeight: "600",
  },
  summaryInfoButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  summaryInfoText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  // NEW FEATURE: Filter styles
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterChipActive: {
    backgroundColor: "#003366",
    borderColor: "#003366",
  },
  filterChipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#fff",
  },
  // NEW FEATURE: Fine card styles
  fineCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  fineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  fineTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  fineViolation: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  fineReference: {
    fontSize: 12,
    color: "#999",
  },
  fineStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  fineStatusText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
  fineBody: {
    marginBottom: 12,
  },
  fineDetails: {
    gap: 6,
  },
  fineDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fineDetailText: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },
  fineAmount: {
    fontWeight: "600",
    color: "#003366",
  },
  fineFooter: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  fineActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButton: {
    padding: 4,
  },
  selectButtonActive: {
    backgroundColor: "#E8EEF5",
    borderRadius: 4,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  detailsButtonText: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "500",
  },
  // NEW FEATURE: Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 300,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  modalCloseButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  // NEW FEATURE: Details modal styles
  detailsContainer: {
    paddingBottom: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  detailsIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsViolation: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  detailsStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 4,
  },
  detailsStatusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
  detailsDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  detailsGrid: {
    gap: 12,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  detailsLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  detailsValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "400",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  detailsAmount: {
    fontWeight: "600",
    color: "#003366",
  },
  detailsDescription: {
    textAlign: "left",
    fontStyle: "italic",
  },
  detailsActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 8,
  },
  detailsActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  payActionButton: {
    backgroundColor: "#003366",
  },
  downloadActionButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#003366",
  },
  disputeActionButton: {
    backgroundColor: "#FFF3E0",
    borderWidth: 1,
    borderColor: "#FF9800",
  },
  detailsActionText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
  },
  // NEW FEATURE: Pay modal styles
  payInfoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8EEF5",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20,
  },
  payInfoText: {
    flex: 1,
    fontSize: 14,
    color: "#003366",
    lineHeight: 20,
  },
  payDetails: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  payItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  payItemReference: {
    fontSize: 14,
    color: "#666",
  },
  payItemAmount: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  payTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#003366",
  },
  payTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#003366",
  },
  payTotalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },
  paySubmitButton: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  paySubmitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});