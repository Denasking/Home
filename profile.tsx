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
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock user profile data
const MOCK_USER = {
  id: "1",
  fullName: "Choene Richard Mashala",
  idNumber: "0411055361088",
  email: "Choeneden12@gmail.com",
  phone: "+27 61 064 0843",
  dateOfBirth: "2004-11-05",
  address: "67 Visagie, Pretoria, Gauteng",
  profilePicture: null, // Would be a URI in real app
  accountCreated: "2023-11-30",
  membershipStatus: "Active",
};

// NEW FEATURE: Menu items
const MENU_ITEMS = [
  {
    id: "personal",
    title: "Personal Information",
    icon: "person-outline",
    screen: "PersonalDetails",
    color: "#4CAF50",
  },
  {
    id: "driver",
    title: "Driver Licence Information",
    icon: "card-outline",
    screen: "DriverLicense",
    color: "#2196F3",
  },
  {
    id: "vehicle",
    title: "Vehicle Information",
    icon: "car-outline",
    screen: "VehicleLicense",
    color: "#FF9800",
  },
  {
    id: "addresses",
    title: "Saved Addresses",
    icon: "location-outline",
    screen: "Addresses",
    color: "#9C27B0",
  },
  {
    id: "notifications",
    title: "Notification Settings",
    icon: "notifications-outline",
    screen: "Notifications",
    color: "#607D8B",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "shield-outline",
    screen: "Privacy",
    color: "#795548",
  },
  {
    id: "help",
    title: "Help & Support",
    icon: "help-circle-outline",
    screen: "Help",
    color: "#00BCD4",
  },
  {
    id: "about",
    title: "About the App",
    icon: "information-circle-outline",
    screen: "About",
    color: "#78909C",
  },
];

// NEW FEATURE: Quick action items
const QUICK_ACTIONS = [
  {
    id: "edit",
    title: "Edit Profile",
    icon: "create-outline",
    color: "#003366",
  },
  {
    id: "password",
    title: "Change Password",
    icon: "key-outline",
    color: "#FF9800",
  },
  {
    id: "logout",
    title: "Logout",
    icon: "log-out-outline",
    color: "#F44336",
  },
];

export default function ProfileScreen() {
  // NEW FEATURE: State management
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(MOCK_USER);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // NEW FEATURE: Edit form state
  const [editData, setEditData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  });

  // NEW FEATURE: Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // NEW FEATURE: Handle edit profile
  const handleEditProfile = () => {
    if (!editData.fullName || !editData.email || !editData.phone) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowEditModal(false);
      setUserData({
        ...userData,
        fullName: editData.fullName,
        email: editData.email,
        phone: editData.phone,
        address: editData.address,
      });
      Alert.alert("Success", "Profile updated successfully!");
      // TODO: Update profile in Firebase
    }, 1500);
  };

  // NEW FEATURE: Handle change password
  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      Alert.alert("Success", "Password changed successfully!");
      // TODO: Update password in Firebase
    }, 1500);
  };

  // NEW FEATURE: Handle logout
  const handleLogout = () => {
    setShowLogoutModal(false);
    Alert.alert("Logout", "You have been logged out successfully.");
    // TODO: Logout user from Firebase
  };

  // NEW FEATURE: Handle menu item press
  const handleMenuItemPress = (item: any) => {
    Alert.alert(
      "Navigate",
      `Navigate to ${item.title} screen`,
      [{ text: "OK" }]
    );
    // TODO: Navigate to the respective screen
  };

  // NEW FEATURE: Handle quick action press
  const handleQuickAction = (action: any) => {
    switch (action.id) {
      case "edit":
        setShowEditModal(true);
        break;
      case "password":
        setShowPasswordModal(true);
        break;
      case "logout":
        setShowLogoutModal(true);
        break;
      default:
        break;
    }
  };

  // NEW FEATURE: Render profile header
  const renderProfileHeader = () => (
    <View style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitials}>
                {userData.fullName.split(" ").map(n => n[0]).join("")}
              </Text>
            </View>
          )}
          <TouchableOpacity style={styles.editImageButton}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userData.fullName}</Text>
          <Text style={styles.profileId}>ID: {userData.idNumber}</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{userData.membershipStatus}</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.profileDetail}>
          <Ionicons name="mail-outline" size={18} color="#666" />
          <Text style={styles.profileDetailText}>{userData.email}</Text>
        </View>
        <View style={styles.profileDetail}>
          <Ionicons name="call-outline" size={18} color="#666" />
          <Text style={styles.profileDetailText}>{userData.phone}</Text>
        </View>
        <View style={styles.profileDetail}>
          <Ionicons name="location-outline" size={18} color="#666" />
          <Text style={styles.profileDetailText}>{userData.address}</Text>
        </View>
        <View style={styles.profileDetail}>
          <Ionicons name="calendar-outline" size={18} color="#666" />
          <Text style={styles.profileDetailText}>Member since {userData.accountCreated}</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.quickAction, action.id === "logout" && styles.quickActionLogout]}
            onPress={() => handleQuickAction(action)}
          >
            <Ionicons name={action.icon as any} size={22} color={action.id === "logout" ? "#F44336" : "#003366"} />
            <Text style={[
              styles.quickActionText,
              action.id === "logout" && styles.quickActionTextLogout
            ]}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // NEW FEATURE: Render menu items
  const renderMenuItems = () => (
    <View style={styles.menuCard}>
      <Text style={styles.menuTitle}>Account Settings</Text>
      {MENU_ITEMS.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            index === MENU_ITEMS.length - 1 && styles.menuItemLast,
          ]}
          onPress={() => handleMenuItemPress(item)}
        >
          <View style={styles.menuItemLeft}>
            <View style={[styles.menuIconContainer, { backgroundColor: item.color + "20" }]}>
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      ))}
    </View>
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
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={editData.email}
                onChangeText={(text) =>
                  setEditData({ ...editData, email: text })
                }
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={editData.phone}
                onChangeText={(text) =>
                  setEditData({ ...editData, phone: text })
                }
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                placeholder="Enter your address"
                value={editData.address}
                onChangeText={(text) =>
                  setEditData({ ...editData, address: text })
                }
                multiline
                numberOfLines={3}
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

            {/* TODO: Upload profile picture to Firebase */}
            {/* // TODO: Update profile information in Firebase */}
            {/* // TODO: Save edited profile */}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render password modal
  const renderPasswordModal = () => (
    <Modal
      visible={showPasswordModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowPasswordModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TouchableOpacity
              onPress={() => setShowPasswordModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Current Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter current password"
                value={passwordData.currentPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, currentPassword: text })
                }
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>New Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                value={passwordData.newPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, newPassword: text })
                }
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm New Password *</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                value={passwordData.confirmPassword}
                onChangeText={(text) =>
                  setPasswordData({ ...passwordData, confirmPassword: text })
                }
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleChangePassword}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Changing..." : "Change Password"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render logout modal
  const renderLogoutModal = () => (
    <Modal
      visible={showLogoutModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowLogoutModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.logoutModalContainer}>
          <View style={styles.logoutIconContainer}>
            <Ionicons name="log-out-outline" size={48} color="#F44336" />
          </View>
          <Text style={styles.logoutTitle}>Confirm Logout</Text>
          <Text style={styles.logoutDescription}>
            Are you sure you want to logout? You'll need to login again to access your account.
          </Text>
          <View style={styles.logoutButtons}>
            <TouchableOpacity
              style={[styles.logoutButton, styles.logoutCancelButton]}
              onPress={() => setShowLogoutModal(false)}
            >
              <Text style={styles.logoutCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.logoutButton, styles.logoutConfirmButton]}
              onPress={handleLogout}
            >
              <Text style={styles.logoutConfirmText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render loading state
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#003366" />
      <Text style={styles.loadingText}>Loading profile...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {loading && !showEditModal && !showPasswordModal ? (
        renderLoadingState()
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderProfileHeader()}
          {renderMenuItems()}
        </ScrollView>
      )}

      {renderEditModal()}
      {renderPasswordModal()}
      {renderLogoutModal()}
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
    paddingBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003366",
  },
  scrollContent: {
    paddingBottom: 30,
  },
  // NEW FEATURE: Loading state
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
  // NEW FEATURE: Profile card styles
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  profileImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: "700",
    color: "#003366",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#003366",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  profileId: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  statusText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
  },
  profileDetails: {
    gap: 8,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  profileDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileDetailText: {
    fontSize: 14,
    color: "#555",
  },
  // NEW FEATURE: Quick actions
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  quickAction: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
  },
  quickActionLogout: {
    opacity: 0.8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#003366",
    fontWeight: "500",
  },
  quickActionTextLogout: {
    color: "#F44336",
  },
  // NEW FEATURE: Menu styles
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 15,
    color: "#1a1a1a",
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
  // NEW FEATURE: Form styles
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
  inputMultiline: {
    height: 80,
    textAlignVertical: "top",
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
  // NEW FEATURE: Logout modal
  logoutModalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 340,
    alignItems: "center",
    alignSelf: "center",
  },
  logoutIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoutTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  logoutDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  logoutButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  logoutButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutCancelButton: {
    backgroundColor: "#F5F5F5",
  },
  logoutCancelText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutConfirmButton: {
    backgroundColor: "#F44336",
  },
  logoutConfirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});