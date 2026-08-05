import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock driver license data
const MOCK_DRIVER_LICENSE = {
  fullName: "John Michael Smith",
  idNumber: "800101 5000 086",
  licenseNumber: "DL-2024-0789",
  dateOfBirth: "1980-01-01",
  dateOfIssue: "2024-06-15",
  dateOfExpiry: "2029-06-14",
  country: "South Africa",
  province: "Gauteng",
  licenseClass: "B (Light Motor Vehicle)",
  restrictions: "None",
  status: "Valid",
  profilePicture: null, // Would be a URI in real app
};

// NEW FEATURE: License class options
const LICENSE_CLASSES = [
  { code: "A1", description: "Motorcycle (up to 125cc)" },
  { code: "A", description: "Motorcycle (unlimited)" },
  { code: "B", description: "Light Motor Vehicle" },
  { code: "C1", description: "Medium Motor Vehicle" },
  { code: "C", description: "Heavy Motor Vehicle" },
  { code: "EC1", description: "Articulated Medium Vehicle" },
  { code: "EC", description: "Articulated Heavy Vehicle" },
];

// NEW FEATURE: License status types
type LicenseStatus = "Valid" | "Expired" | "Suspended" | "Revoked";

const STATUS_COLORS: Record<LicenseStatus, string> = {
  Valid: "#4CAF50",
  Expired: "#F44336",
  Suspended: "#FF9800",
  Revoked: "#D32F2F",
};

export default function DriverLicenseScreen() {
  // NEW FEATURE: State management
  const [loading, setLoading] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("B");
  const [licenseData, setLicenseData] = useState(MOCK_DRIVER_LICENSE);
  const [editData, setEditData] = useState({
    fullName: licenseData.fullName,
    idNumber: licenseData.idNumber,
    province: licenseData.province,
  });

  // NEW FEATURE: Calculate days until expiry
  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilExpiry = getDaysUntilExpiry(licenseData.dateOfExpiry);

  // NEW FEATURE: Handle license renewal
  const handleRenewLicense = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowRenewModal(false);
      const newExpiry = new Date(licenseData.dateOfExpiry);
      newExpiry.setFullYear(newExpiry.getFullYear() + 5);
      setLicenseData({
        ...licenseData,
        dateOfExpiry: newExpiry.toISOString().split('T')[0],
        dateOfIssue: new Date().toISOString().split('T')[0],
        status: "Valid",
      });
      Alert.alert(
        "Success",
        "Your driver's license has been renewed successfully!"
      );
      // TODO: Update license in Firebase
    }, 2000);
  };

  // NEW FEATURE: Handle edit profile
  const handleEditProfile = () => {
    if (!editData.fullName || !editData.idNumber) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowEditModal(false);
      setLicenseData({
        ...licenseData,
        fullName: editData.fullName,
        idNumber: editData.idNumber,
        province: editData.province,
      });
      Alert.alert("Success", "Profile updated successfully!");
      // TODO: Update profile in Firebase
    }, 1500);
  };

  // NEW FEATURE: Get status color
  const getStatusColor = (status: LicenseStatus) => {
    return STATUS_COLORS[status] || "#999";
  };

  // NEW FEATURE: Get expiry warning text
  const getExpiryWarning = (days: number) => {
    if (days < 0) return "EXPIRED";
    if (days < 30) return `EXPIRING SOON - ${days} days remaining`;
    if (days < 90) return `Expires in ${days} days`;
    return `${days} days remaining`;
  };

  const expiryColor = daysUntilExpiry < 0 ? "#F44336" : 
                      daysUntilExpiry < 30 ? "#FF9800" : 
                      daysUntilExpiry < 90 ? "#2196F3" : "#4CAF50";

  // NEW FEATURE: Render license card
  const renderLicenseCard = () => (
    <View style={styles.licenseCard}>
      <View style={styles.licenseHeader}>
        <View style={styles.licenseIconContainer}>
          <Ionicons name="id-card" size={40} color="#fff" />
        </View>
        <View style={styles.licenseTitleContainer}>
          <Text style={styles.licenseTitle}>Driver's License</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(licenseData.status as LicenseStatus) }]}>
            <Text style={styles.statusText}>{licenseData.status}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.editIconButton}
          onPress={() => setShowEditModal(true)}
        >
          <Ionicons name="pencil" size={22} color="#003366" />
        </TouchableOpacity>
      </View>

      <View style={styles.licenseDivider} />

      <View style={styles.licenseBody}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {licenseData.profilePicture ? (
              <Image source={{ uri: licenseData.profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Ionicons name="person" size={50} color="#003366" />
              </View>
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{licenseData.fullName}</Text>
            <Text style={styles.profileId}>{licenseData.idNumber}</Text>
            <Text style={styles.profileClass}>{licenseData.licenseClass}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date of Issue</Text>
              <Text style={styles.infoValue}>{licenseData.dateOfIssue}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Date of Expiry</Text>
              <Text style={styles.infoValue}>{licenseData.dateOfExpiry}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>License Number</Text>
              <Text style={styles.infoValue}>{licenseData.licenseNumber}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Province</Text>
              <Text style={styles.infoValue}>{licenseData.province}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="car-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>License Class</Text>
              <Text style={styles.infoValue}>{licenseData.licenseClass}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="alert-circle-outline" size={18} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Restrictions</Text>
              <Text style={styles.infoValue}>{licenseData.restrictions}</Text>
            </View>
          </View>
        </View>

        <View style={styles.expiryContainer}>
          <View style={[styles.expiryIndicator, { backgroundColor: expiryColor }]} />
          <View style={styles.expiryTextContainer}>
            <Text style={styles.expiryTitle}>License Validity</Text>
            <Text style={[styles.expiryDays, { color: expiryColor }]}>
              {getExpiryWarning(daysUntilExpiry)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.licenseFooter}>
        <TouchableOpacity 
          style={styles.renewButton}
          onPress={() => setShowRenewModal(true)}
        >
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text style={styles.renewButtonText}>Renew License</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={20} color="#003366" />
          <Text style={styles.downloadButtonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // NEW FEATURE: Render license classes section
  const renderLicenseClasses = () => (
    <View style={styles.classesCard}>
      <Text style={styles.classesTitle}>Available License Classes</Text>
      <Text style={styles.classesSubtitle}>
        View the different classes of driver's licenses available
      </Text>

      {LICENSE_CLASSES.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.classItem,
            selectedClass === item.code && styles.classItemActive,
          ]}
          onPress={() => setSelectedClass(item.code)}
        >
          <View style={styles.classCodeContainer}>
            <Text style={[
              styles.classCode,
              selectedClass === item.code && styles.classCodeActive,
            ]}>
              {item.code}
            </Text>
          </View>
          <Text style={[
            styles.classDescription,
            selectedClass === item.code && styles.classDescriptionActive,
          ]}>
            {item.description}
          </Text>
          {selectedClass === item.code && (
            <Ionicons name="checkmark-circle" size={24} color="#003366" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  // NEW FEATURE: Render renewal modal
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
            <Text style={styles.modalTitle}>Renew Driver's License</Text>
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
                You are about to renew your driver's license. The renewal process will extend your license validity for 5 years.
              </Text>
            </View>

            <View style={styles.renewDetails}>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Current License</Text>
                <Text style={styles.renewValue}>{licenseData.licenseNumber}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Expiry Date</Text>
                <Text style={styles.renewValue}>{licenseData.dateOfExpiry}</Text>
              </View>
              <View style={styles.renewRow}>
                <Text style={styles.renewLabel}>Status</Text>
                <View style={[styles.renewStatusBadge, { backgroundColor: getStatusColor(licenseData.status as LicenseStatus) }]}>
                  <Text style={styles.renewStatusText}>{licenseData.status}</Text>
                </View>
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
                  <Ionicons name="checkmark-circle" size={20} color="#fff" />
                  <Text style={styles.renewSubmitText}>Confirm Renewal</Text>
                </>
              )}
            </TouchableOpacity>

            {/* TODO: Add Firebase functionality */}
            {/* // TODO: Process license renewal in Firebase */}
            {/* // TODO: Update license expiry date */}
            {/* // TODO: Send renewal confirmation email */}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render edit modal
  const renderEditModal = () => (
    <Modal
      visible={showEditModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowEditModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity
              onPress={() => setShowEditModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={editData.fullName}
                onChangeText={(text) =>
                  setEditData({ ...editData, fullName: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>ID Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your ID number"
                value={editData.idNumber}
                onChangeText={(text) =>
                  setEditData({ ...editData, idNumber: text })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Province</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your province"
                value={editData.province}
                onChangeText={(text) =>
                  setEditData({ ...editData, province: text })
                }
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleEditProfile}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Updating..." : "Update Profile"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Driver's License</Text>
          <Text style={styles.subtitle}>
            Manage and view your driver's license information
          </Text>
        </View>

        {/* NEW FEATURE: Loading state */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#003366" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        ) : (
          <>
            {renderLicenseCard()}
            {renderLicenseClasses()}
          </>
        )}
      </ScrollView>

      {renderRenewModal()}
      {renderEditModal()}
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
  // NEW FEATURE: Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
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
    marginBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  licenseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  licenseIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  licenseTitleContainer: {
    flex: 1,
  },
  licenseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  editIconButton: {
    padding: 8,
  },
  licenseDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  licenseBody: {
    gap: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profilePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  profileId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  profileClass: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "500",
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "400",
  },
  infoValue: {
    fontSize: 14,
    color: "#1a1a1a",
    fontWeight: "500",
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  expiryIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  expiryTextContainer: {
    flex: 1,
  },
  expiryTitle: {
    fontSize: 12,
    color: "#999",
    fontWeight: "400",
  },
  expiryDays: {
    fontSize: 16,
    fontWeight: "600",
  },
  licenseFooter: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  renewButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  renewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  downloadButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#003366",
  },
  downloadButtonText: {
    color: "#003366",
    fontSize: 14,
    fontWeight: "600",
  },
  // NEW FEATURE: License classes styles
  classesCard: {
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
  classesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  classesSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  classItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F8F9FA",
  },
  classItemActive: {
    backgroundColor: "#E8EEF5",
    borderWidth: 1,
    borderColor: "#003366",
  },
  classCodeContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#003366",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  classCode: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  classCodeActive: {
    backgroundColor: "#003366",
  },
  classDescription: {
    flex: 1,
    fontSize: 14,
    color: "#555",
  },
  classDescriptionActive: {
    color: "#1a1a1a",
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
  // NEW FEATURE: Edit form styles
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
});