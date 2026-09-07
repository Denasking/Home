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
  Share,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// NEW FEATURE: Exact vehicle license data as specified with random engine number
const VEHICLE_DATA = {
  registration: "BW 21 XB GP",
  make: "Volkswagen",
  model: "Volkswagen Golf",
  year: "2022",
  colour: "Grey",
  ownerName: "Richard Mashala",
  vin: "WVWZZZ1KZMW123456",
  engineNumber: "VW7G8K9L2M4N6P8R", // Random engine number - not sequential
  licenseDiscNumber: "VD-2024-0789",
  expiryDate: "2026-12-31",
  roadworthyStatus: "Valid",
  status: "Valid" as const,
  mileage: "143,824 km",
  fuelType: "Petrol",
  transmission: "Automatic",
};

type LicenseStatus = "Valid" | "Expired" | "Suspended" | "Pending";

const STATUS_COLORS: Record<LicenseStatus, string> = {
  Valid: "#4CAF50",
  Expired: "#F44336",
  Suspended: "#FF9800",
  Pending: "#2196F3",
};

export default function VehicleLicenseScreen() {
  const navigation = useNavigation<any>(); // FIXED: Added type any to navigation
  const [loading, setLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [licenseData] = useState(VEHICLE_DATA);

  // NEW FEATURE: Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysUntilExpiry = getDaysUntilExpiry(licenseData.expiryDate);
  const statusColor = STATUS_COLORS[licenseData.status] || "#999";

  // NEW FEATURE: Get expiry warning text
  const getExpiryWarning = (days: number) => {
    if (days < 0) return "EXPIRED - Renew immediately!";
    if (days < 30) return `⚠️ EXPIRING SOON - ${days} days remaining`;
    if (days < 90) return `Expires in ${days} days`;
    return `${days} days remaining`;
  };

  const expiryColor = daysUntilExpiry < 0 ? "#F44336" : 
                      daysUntilExpiry < 30 ? "#FF9800" : 
                      daysUntilExpiry < 90 ? "#2196F3" : "#4CAF50";

  // NEW FEATURE: Handle renew - Navigate to Appointments
  const handleRenewLicense = () => {
    setShowRenewModal(false);
    // Navigate to appointments screen for renewal booking
    navigation.navigate("Appointments");
  };

  // NEW FEATURE: Handle download
  const handleDownload = () => {
    Alert.alert(
      "Download License",
      "Your vehicle license is being downloaded.",
      [{ text: "OK" }]
    );
    // TODO: Download vehicle license PDF
  };

  // NEW FEATURE: Handle share
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Vehicle License Details:
Registration: ${licenseData.registration}
Make: ${licenseData.make}
Model: ${licenseData.model}
Owner: ${licenseData.ownerName}
VIN: ${licenseData.vin}
Engine: ${licenseData.engineNumber}
Status: ${licenseData.status}
Expiry: ${licenseData.expiryDate}`,
        title: "Vehicle License - Traffic Connect",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share vehicle details");
    }
  };

  // NEW FEATURE: Render vehicle license card
  const renderVehicleCard = () => (
    <View style={styles.licenseCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="car" size={32} color="#fff" />
          </View>
          <View>
            <Text style={styles.cardTitle}>Vehicle License</Text>
            <Text style={styles.cardSubtitle}>{licenseData.registration}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{licenseData.status}</Text>
        </View>
      </View>

      <View style={styles.vehicleImageContainer}>
        <View style={styles.vehiclePlaceholder}>
          <Ionicons name="car-sport" size={80} color="#003366" />
          <Text style={styles.vehicleImageLabel}>{licenseData.make} {licenseData.model}</Text>
          <Text style={styles.vehicleRegLabel}>{licenseData.registration}</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.infoGrid}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="build-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Make</Text>
              <Text style={styles.infoValue}>{licenseData.make}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="grid-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Model</Text>
              <Text style={styles.infoValue}>{licenseData.model}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Year</Text>
              <Text style={styles.infoValue}>{licenseData.year}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="color-palette-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Colour</Text>
              <Text style={styles.infoValue}>{licenseData.colour}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="person-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Owner</Text>
              <Text style={styles.infoValue}>{licenseData.ownerName}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="speedometer-outline" size={18} color="#666" />
            <View>
              <Text style={styles.infoLabel}>Mileage</Text>
              <Text style={styles.infoValue}>{licenseData.mileage}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>VIN Number</Text>
          <Text style={styles.detailValue}>{licenseData.vin}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Engine Number</Text>
          <Text style={styles.detailValue}>{licenseData.engineNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>License Disc</Text>
          <Text style={styles.detailValue}>{licenseData.licenseDiscNumber}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Roadworthy Status</Text>
          <Text style={[styles.detailValue, { color: licenseData.roadworthyStatus === "Valid" ? "#4CAF50" : "#F44336" }]}>
            {licenseData.roadworthyStatus}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Fuel Type</Text>
          <Text style={styles.detailValue}>{licenseData.fuelType}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Transmission</Text>
          <Text style={styles.detailValue}>{licenseData.transmission}</Text>
        </View>
      </View>

      <View style={styles.expiryContainer}>
        <View style={[styles.expiryIndicator, { backgroundColor: expiryColor }]} />
        <View style={styles.expiryTextContainer}>
          <Text style={styles.expiryTitle}>License Expiry</Text>
          <Text style={[styles.expiryDate, { color: expiryColor }]}>
            {licenseData.expiryDate}
          </Text>
          <Text style={[styles.expiryDays, { color: expiryColor }]}>
            {getExpiryWarning(daysUntilExpiry)}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.renewButton}
          onPress={() => setShowRenewModal(true)}
        >
          <Text style={styles.renewButtonText}>Renew</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name="download-outline" size={20} color="#003366" />
          <Text style={styles.actionButtonText}>Download</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={20} color="#003366" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.actionButtonPrimary]} 
          onPress={() => setShowQRModal(true)}
        >
          <Ionicons name="qr-code-outline" size={20} color="#003366" />
          <Text style={styles.actionButtonText}>QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // NEW FEATURE: Render QR Code modal
  const renderQRModal = () => (
    <Modal
      visible={showQRModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowQRModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Vehicle License QR Code</Text>
            <TouchableOpacity
              onPress={() => setShowQRModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={180} color="#003366" />
            </View>
            <Text style={styles.qrTitle}>Scan to Verify</Text>
            <Text style={styles.qrDescription}>
              This QR code can be scanned by traffic officials to verify your vehicle license information instantly.
            </Text>
            <View style={styles.qrDetails}>
              <View style={styles.qrRow}>
                <Text style={styles.qrLabel}>Registration</Text>
                <Text style={styles.qrValue}>{licenseData.registration}</Text>
              </View>
              <View style={styles.qrRow}>
                <Text style={styles.qrLabel}>Owner</Text>
                <Text style={styles.qrValue}>{licenseData.ownerName}</Text>
              </View>
              <View style={styles.qrRow}>
                <Text style={styles.qrLabel}>Status</Text>
                <Text style={[styles.qrValue, { color: statusColor }]}>
                  {licenseData.status}
                </Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.shareQRButton}
              onPress={handleShare}
            >
              <Ionicons name="share-social-outline" size={20} color="#fff" />
              <Text style={styles.shareQRButtonText}>Share QR Code</Text>
            </TouchableOpacity>
          </View>

          {/* TODO: Generate QR Code with vehicle license data */}
          {/* // TODO: Generate QR Code from Firebase data */}
          {/* // TODO: Share QR Code */}
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render renewal modal - Navigates to Appointments
  const renderRenewModal = () => (
    <Modal
      visible={showRenewModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowRenewModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Renew Vehicle License</Text>
            <TouchableOpacity
              onPress={() => setShowRenewModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.renewInfoCard}>
              <Ionicons name="information-circle" size={32} color="#003366" />
              <Text style={styles.renewInfoText}>
                You are about to renew your vehicle license for {licenseData.make} {licenseData.model} ({licenseData.registration}).
                This will take you to the Appointments screen to schedule your renewal.
              </Text>
            </View>

            <View style={styles.renewDetails}>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Vehicle</Text>
                <Text style={styles.renewValue}>{licenseData.make} {licenseData.model}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Registration</Text>
                <Text style={styles.renewValue}>{licenseData.registration}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Current License</Text>
                <Text style={styles.renewValue}>{licenseData.licenseDiscNumber}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Expiry Date</Text>
                <Text style={styles.renewValue}>{licenseData.expiryDate}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Status</Text>
                <View style={[styles.renewStatusBadge, { backgroundColor: statusColor }]}>
                  <Text style={styles.renewStatusText}>{licenseData.status}</Text>
                </View>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Renewal Fee</Text>
                <Text style={styles.renewValue}>R 1,250.00</Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.renewSubmitButton, loading && styles.submitButtonDisabled]}
              onPress={handleRenewLicense}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Ionicons name="calendar-outline" size={20} color="#fff" />
                  <Text style={styles.renewSubmitText}>Book Renewal Appointment</Text>
                </>
              )}
            </TouchableOpacity>

            {/* TODO: Add Firebase functionality */}
            {/* // TODO: Process vehicle license renewal in Firebase */}
            {/* // TODO: Update license expiry date */}
            {/* // TODO: Generate new license disc number */}
            {/* // TODO: Send renewal confirmation */}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render loading state
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#003366" />
      <Text style={styles.loadingText}>Loading vehicle information...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Vehicle License</Text>
          <Text style={styles.subtitle}>
            View and manage your vehicle license information
          </Text>
        </View>

        {loading ? (
          renderLoadingState()
        ) : (
          renderVehicleCard()
        )}
      </ScrollView>

      {renderQRModal()}
      {renderRenewModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
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
  // NEW FEATURE: License card styles
  licenseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  vehicleImageContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  vehiclePlaceholder: {
    alignItems: "center",
  },
  vehicleImageLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginTop: 8,
  },
  vehicleRegLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
  },
  infoValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  detailsGrid: {
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  detailLabel: {
    fontSize: 13,
    color: "#666",
  },
  detailValue: {
    fontSize: 13,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  expiryIndicator: {
    width: 4,
    height: 50,
    borderRadius: 2,
    marginRight: 12,
  },
  expiryTextContainer: {
    flex: 1,
  },
  expiryTitle: {
    fontSize: 12,
    color: "#999",
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: "500",
  },
  expiryDays: {
    fontSize: 12,
    fontWeight: "400",
  },
  renewButton: {
    backgroundColor: "#003366",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  renewButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  actionButtonPrimary: {
    backgroundColor: "#E8EEF5",
  },
  actionButtonText: {
    fontSize: 13,
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
  // NEW FEATURE: QR Modal styles
  qrContainer: {
    alignItems: "center",
    padding: 20,
  },
  qrPlaceholder: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E8EEF5",
    borderStyle: "dashed",
    marginBottom: 16,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  qrDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  qrDetails: {
    width: "100%",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
  },
  qrRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qrLabel: {
    fontSize: 13,
    color: "#666",
  },
  qrValue: {
    fontSize: 13,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  shareQRButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  shareQRButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  // NEW FEATURE: Renew modal styles
  renewInfoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8EEF5",
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20,
  },
  renewInfoText: {
    flex: 1,
    fontSize: 14,
    color: "#003366",
    lineHeight: 20,
  },
  renewDetails: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 12,
  },
  renewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  renewLabel: {
    fontSize: 14,
    color: "#666",
  },
  renewValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  renewStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  renewStatusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  renewSubmitButton: {
    backgroundColor: "#003366",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  renewSubmitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
});