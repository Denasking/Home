import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock data for appointments
const MOCK_APPOINTMENTS = [
  {
    id: "1",
    type: "Driver's License Renewal",
    date: "2026-08-15",
    time: "09:30 AM",
    location: "Pretoria DLTC",
    status: "Confirmed",
    reference: "DL-2026-0845",
    officer: "Ms. Nkosi",
  },
  {
    id: "2",
    type: "Vehicle License Renewal",
    date: "2026-08-22",
    time: "11:00 AM",
    location: "Centurion Licensing Office",
    status: "Pending",
    reference: "VL-2026-0923",
    officer: "Mr. Van der Merwe",
  },
  {
    id: "3",
    type: "Driving Test",
    date: "2026-09-05",
    time: "02:15 PM",
    location: "Johannesburg Driving Test Center",
    status: "Confirmed",
    reference: "DT-2026-1056",
    officer: "Mrs. Botha",
  },
  {
    id: "4",
    type: "Learner's License",
    date: "2026-07-10",
    time: "10:45 AM",
    location: "Sandton Traffic Department",
    status: "Completed",
    reference: "LL-2026-0678",
    officer: "Mr. Smith",
  },
  {
    id: "5",
    type: "Vehicle Inspection",
    date: "2026-09-12",
    time: "03:30 PM",
    location: "Midrand Vehicle Testing Station",
    status: "Cancelled",
    reference: "VI-2026-1123",
    officer: "Ms. Dlamini",
  },
];

// NEW FEATURE: Appointment status types and colors
type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled";

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  Confirmed: "#4CAF50",
  Pending: "#FF9800",
  Completed: "#2196F3",
  Cancelled: "#F44336",
};

// NEW FEATURE: Filter options
type FilterOption = "All" | "Upcoming" | "Past" | "Cancelled";

export default function AppointmentsScreen() {
  // NEW FEATURE: State management
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>("All");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // NEW FEATURE: Booking form state
  const [newAppointment, setNewAppointment] = useState({
    type: "",
    date: "",
    time: "",
    location: "",
  });

  // NEW FEATURE: Filter appointments based on selected filter
  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (selectedFilter) {
      case "Upcoming":
        return MOCK_APPOINTMENTS.filter(
          (apt) =>
            new Date(apt.date) >= today &&
            apt.status !== "Completed" &&
            apt.status !== "Cancelled"
        );
      case "Past":
        return MOCK_APPOINTMENTS.filter(
          (apt) =>
            new Date(apt.date) < today ||
            apt.status === "Completed"
        );
      case "Cancelled":
        return MOCK_APPOINTMENTS.filter(
          (apt) => apt.status === "Cancelled"
        );
      default:
        return MOCK_APPOINTMENTS;
    }
  };

  // NEW FEATURE: Handle appointment booking
  const handleBookAppointment = () => {
    if (!newAppointment.type || !newAppointment.date || !newAppointment.time) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowBookingModal(false);
      setNewAppointment({ type: "", date: "", time: "", location: "" });
      Alert.alert(
        "Success",
        "Your appointment has been booked successfully!"
      );
      // TODO: Add appointment to Firebase
    }, 1500);
  };

  // NEW FEATURE: Handle appointment details view
  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  // NEW FEATURE: Get status color
  const getStatusColor = (status: AppointmentStatus) => {
    return STATUS_COLORS[status] || "#999";
  };

  // NEW FEATURE: Get status icon
  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case "Confirmed":
        return "checkmark-circle";
      case "Pending":
        return "time";
      case "Completed":
        return "checkmark-done-circle";
      case "Cancelled":
        return "close-circle";
      default:
        return "information-circle";
    }
  };

  // NEW FEATURE: Get appointment type icon
  const getAppointmentIcon = (type: string) => {
    if (type.includes("Driver")) return "car";
    if (type.includes("Vehicle")) return "bus";
    if (type.includes("Test")) return "clipboard";
    if (type.includes("Learner")) return "school";
    if (type.includes("Inspection")) return "construct";
    return "calendar";
  };

  // NEW FEATURE: Render filter chips
  const renderFilterChips = () => {
    const filters: FilterOption[] = ["All", "Upcoming", "Past", "Cancelled"];
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

  // NEW FEATURE: Render appointment card
  const renderAppointmentCard = (appointment: any) => {
    const statusColor = getStatusColor(appointment.status as AppointmentStatus);
    return (
      <TouchableOpacity
        key={appointment.id}
        style={styles.card}
        onPress={() => handleViewDetails(appointment)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={getAppointmentIcon(appointment.type)}
                size={24}
                color="#003366"
              />
            </View>
            <View style={styles.cardTitleWrapper}>
              <Text style={styles.cardType}>{appointment.type}</Text>
              <View style={styles.referenceContainer}>
                <Text style={styles.cardReference}>{appointment.reference}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Ionicons
              name={getStatusIcon(appointment.status as AppointmentStatus)}
              size={14}
              color="#fff"
            />
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardDetail}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text style={styles.cardDetailText}>
              {appointment.date} at {appointment.time}
            </Text>
          </View>
          <View style={styles.cardDetail}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.cardDetailText}>{appointment.location}</Text>
          </View>
          <View style={styles.cardDetail}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <Text style={styles.cardDetailText}>
              Officer: {appointment.officer}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleViewDetails(appointment)}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
            <Ionicons name="arrow-forward" size={16} color="#003366" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // NEW FEATURE: Render booking modal
  const renderBookingModal = () => (
    <Modal
      visible={showBookingModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowBookingModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book New Appointment</Text>
            <TouchableOpacity
              onPress={() => setShowBookingModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Appointment Type *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Driver's License Renewal"
                value={newAppointment.type}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, type: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date *</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={newAppointment.date}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, date: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 09:30 AM"
                value={newAppointment.time}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, time: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Pretoria DLTC"
                value={newAppointment.location}
                onChangeText={(text) =>
                  setNewAppointment({ ...newAppointment, location: text })
                }
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleBookAppointment}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Booking..." : "Book Appointment"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

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
            <Text style={styles.modalTitle}>Appointment Details</Text>
            <TouchableOpacity
              onPress={() => setShowDetailsModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedAppointment && (
              <View style={styles.detailsContainer}>
                <View style={styles.detailsIconContainer}>
                  <Ionicons
                    name={getAppointmentIcon(selectedAppointment.type)}
                    size={48}
                    color="#003366"
                  />
                </View>

                <Text style={styles.detailsTitle}>
                  {selectedAppointment.type}
                </Text>

                <View
                  style={[
                    styles.detailsStatusBadge,
                    {
                      backgroundColor: getStatusColor(
                        selectedAppointment.status as AppointmentStatus
                      ),
                    },
                  ]}
                >
                  <Ionicons
                    name={getStatusIcon(
                      selectedAppointment.status as AppointmentStatus
                    )}
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.detailsStatusText}>
                    {selectedAppointment.status}
                  </Text>
                </View>

                <View style={styles.detailsDivider} />

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsLabel}>Reference</Text>
                  <Text style={styles.detailsValue}>
                    {selectedAppointment.reference}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsLabel}>Date</Text>
                  <Text style={styles.detailsValue}>
                    {selectedAppointment.date}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsLabel}>Time</Text>
                  <Text style={styles.detailsValue}>
                    {selectedAppointment.time}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsLabel}>Location</Text>
                  <Text style={styles.detailsValue}>
                    {selectedAppointment.location}
                  </Text>
                </View>

                <View style={styles.detailsRow}>
                  <Text style={styles.detailsLabel}>Officer</Text>
                  <Text style={styles.detailsValue}>
                    {selectedAppointment.officer}
                  </Text>
                </View>

                <View style={styles.detailsActions}>
                  <TouchableOpacity style={styles.detailsActionButton}>
                    <Ionicons name="calendar-outline" size={20} color="#003366" />
                    <Text style={styles.detailsActionText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailsActionButton}>
                    <Ionicons name="close-outline" size={20} color="#F44336" />
                    <Text style={[styles.detailsActionText, { color: "#F44336" }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* TODO: Add Firebase functionality */}
                {/* // TODO: Fetch appointment details from Firebase */}
                {/* // TODO: Cancel appointment */}
                {/* // TODO: Reschedule appointment */}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const filteredAppointments = getFilteredAppointments();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Appointments</Text>
          <Text style={styles.subtitle}>
            {filteredAppointments.length} appointments found
          </Text>
        </View>
        {/* NEW FEATURE: Book appointment button */}
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => setShowBookingModal(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* NEW FEATURE: Filter chips */}
      {renderFilterChips()}

      {/* NEW FEATURE: Loading state */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <Ionicons name="refresh" size={40} color="#003366" />
          <Text style={styles.loadingText}>Loading appointments...</Text>
        </View>
      ) : filteredAppointments.length === 0 ? (
        // NEW FEATURE: Empty state
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No Appointments Found</Text>
          <Text style={styles.emptySubtitle}>
            {selectedFilter === "All"
              ? "You don't have any appointments scheduled yet."
              : `No ${selectedFilter.toLowerCase()} appointments available.`}
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => setShowBookingModal(true)}
          >
            <Text style={styles.emptyButtonText}>Book an Appointment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredAppointments.map((appointment) =>
            renderAppointmentCard(appointment)
          )}
        </ScrollView>
      )}

      {/* NEW FEATURE: Modals */}
      {renderBookingModal()}
      {renderDetailsModal()}
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003366",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  // NEW FEATURE: Book button styles
  bookButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#003366",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
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
  // NEW FEATURE: Card styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTitleContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardTitleWrapper: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  referenceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardReference: {
    fontSize: 12,
    color: "#999",
    fontWeight: "400",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
  cardBody: {
    marginBottom: 12,
    gap: 6,
  },
  cardDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardDetailText: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  submitButton: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // NEW FEATURE: Details modal styles
  detailsContainer: {
    alignItems: "center",
  },
  detailsIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  detailsStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    marginBottom: 16,
  },
  detailsStatusText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  detailsDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  detailsLabel: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  detailsValue: {
    fontSize: 15,
    color: "#1a1a1a",
    fontWeight: "400",
    textAlign: "right",
    flex: 1,
    marginLeft: 16,
  },
  detailsActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
    gap: 12,
  },
  detailsActionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  detailsActionText: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "500",
  },
  // NEW FEATURE: Loading state styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#003366",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});