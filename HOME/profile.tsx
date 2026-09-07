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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// NEW FEATURE: Mock user profile data
const MOCK_USER = {
  id: "1",
  fullName: "Richard Mashala",
  idNumber: "800101 5000 086",
  email: "richard.mashala@email.com",
  phone: "+27 82 123 4567",
  dateOfBirth: "1980-01-01",
  address: "123 Main Street, Pretoria, Gauteng",
  profilePicture: null,
  accountCreated: "2024-01-15",
  membershipStatus: "Active",
};

// NEW FEATURE: Menu items (removed Personal Information and Saved Addresses)
const MENU_ITEMS = [
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
    id: "notifications",
    title: "Notification Settings",
    icon: "notifications-outline",
    screen: "NotificationsSettings",
    color: "#607D8B",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: "shield-outline",
    screen: "PrivacySecurity",
    color: "#795548",
  },
  {
    id: "help",
    title: "Help & Support",
    icon: "help-circle-outline",
    screen: "HelpSupport",
    color: "#00BCD4",
  },
  {
    id: "about",
    title: "About the App",
    icon: "information-circle-outline",
    screen: "AboutApp",
    color: "#78909C",
  },
];

// NEW FEATURE: Only Logout action
const QUICK_ACTIONS = [
  {
    id: "logout",
    title: "Logout",
    icon: "log-out-outline",
    color: "#F44336",
  },
];

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [userData] = useState(MOCK_USER);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // NEW FEATURE: Handle logout
  const handleLogout = () => {
    setShowLogoutModal(false);
    Alert.alert("Logout", "You have been logged out successfully.");
    // TODO: Logout user from Firebase
  };

  // NEW FEATURE: Handle menu item press with correct navigation
  const handleMenuItemPress = (item: any) => {
    if (item.screen === "AboutApp") {
      navigation.navigate("AboutApp");
    } else if (item.screen === "DriverLicense") {
      navigation.navigate("DriverLicense");
    } else if (item.screen === "VehicleLicense") {
      navigation.navigate("VehicleLicense");
    } else if (item.screen === "NotificationsSettings") {
      navigation.navigate("NotificationsSettings");
    } else if (item.screen === "PrivacySecurity") {
      navigation.navigate("PrivacySecurity");
    } else if (item.screen === "HelpSupport") {
      navigation.navigate("HelpSupport");
    } else {
      Alert.alert("Navigate", `Navigate to ${item.title} screen`, [{ text: "OK" }]);
    }
  };

  // NEW FEATURE: Handle quick action (only logout)
  const handleQuickAction = (action: any) => {
    if (action.id === "logout") {
      setShowLogoutModal(true);
    }
  };

  // NEW FEATURE: Get initials from name
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  // NEW FEATURE: Render profile header (no edit buttons)
  const renderProfileHeader = () => (
    <View style={styles.profileCard}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          {userData.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitials}>
                {getInitials(userData.fullName)}
              </Text>
            </View>
          )}
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

      {/* NEW FEATURE: Only Logout button */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => handleQuickAction(QUICK_ACTIONS[0])}
        >
          <Ionicons name="log-out-outline" size={22} color="#F44336" />
          <Text style={styles.quickActionTextLogout}>Logout</Text>
        </TouchableOpacity>
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

      {loading ? (
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

      {renderLogoutModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FB" },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5 },
  title: { fontSize: 28, fontWeight: "700", color: "#003366" },
  scrollContent: { paddingBottom: 30 },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 60 },
  loadingText: { marginTop: 12, fontSize: 16, color: "#666" },

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
  profileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  profileImageContainer: { position: "relative", marginRight: 16 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitials: { fontSize: 32, fontWeight: "700", color: "#003366" },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: "600", color: "#1a1a1a", marginBottom: 2 },
  profileId: { fontSize: 14, color: "#666", marginBottom: 6 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#4CAF50" },
  statusText: { fontSize: 12, color: "#4CAF50", fontWeight: "500" },

  profileDetails: { gap: 8, marginBottom: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#f0f0f0" },
  profileDetail: { flexDirection: "row", alignItems: "center", gap: 10 },
  profileDetailText: { fontSize: 14, color: "#555" },

  quickActions: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },
  quickAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  quickActionTextLogout: { fontSize: 16, color: "#F44336", fontWeight: "600" },

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
  menuTitle: { fontSize: 16, fontWeight: "600", color: "#1a1a1a", paddingHorizontal: 16, paddingVertical: 12 },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuItemLast: { borderBottomWidth: 0 },
  menuItemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuIconContainer: { width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },
  menuItemTitle: { fontSize: 15, color: "#1a1a1a" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  
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
  logoutTitle: { fontSize: 20, fontWeight: "600", color: "#1a1a1a", marginBottom: 8 },
  logoutDescription: { fontSize: 14, color: "#666", textAlign: "center", lineHeight: 20, marginBottom: 24 },
  logoutButtons: { flexDirection: "row", gap: 12, width: "100%" },
  logoutButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  logoutCancelButton: { backgroundColor: "#F5F5F5" },
  logoutCancelText: { color: "#666", fontSize: 16, fontWeight: "500" },
  logoutConfirmButton: { backgroundColor: "#F44336" },
  logoutConfirmText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});