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
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "Appointment",
    title: "Appointment Confirmed",
    description: "Your driver's license renewal appointment has been confirmed for August 15, 2026 at 09:30 AM.",
    time: "2 hours ago",
    read: false,
    icon: "calendar",
    screen: "Appointments",
  },
  {
    id: "2",
    type: "Traffic Fine",
    title: "Traffic Fine Issued",
    description: "A traffic fine has been issued for your vehicle ABC123GP. Amount: R500.00",
    time: "5 hours ago",
    read: false,
    icon: "warning",
    screen: "Fines",
  },
  {
    id: "3",
    type: "Driver Licence",
    title: "Driver Licence Reminder",
    description: "Your driver's license will expire in 30 days. Please renew before August 14, 2026.",
    time: "1 day ago",
    read: false,
    icon: "card",
    screen: "DriverLicense",
  },
  {
    id: "4",
    type: "Vehicle Licence",
    title: "Vehicle Licence Reminder",
    description: "Your vehicle license for ABC123GP will expire in 45 days. Renew online to avoid penalties.",
    time: "2 days ago",
    read: true,
    icon: "car",
    screen: "VehicleLicense",
  },
  {
    id: "5",
    type: "Payment",
    title: "Fine Payment Successful",
    description: "Your payment of R250.00 for fine reference TF20260003 has been processed successfully.",
    time: "3 days ago",
    read: true,
    icon: "wallet",
    screen: "Fines",
  },
  {
    id: "6",
    type: "Appointment",
    title: "Appointment Cancelled",
    description: "Your driving test appointment scheduled for July 20, 2026 has been cancelled.",
    time: "5 days ago",
    read: true,
    icon: "calendar",
    screen: "Appointments",
  },
  {
    id: "7",
    type: "Licence Renewal",
    title: "Licence Renewal Approved",
    description: "Your vehicle license renewal has been approved. New license disc number: VD-2026-0789",
    time: "1 week ago",
    read: true,
    icon: "checkmark-circle",
    screen: "VehicleLicense",
  },
  {
    id: "8",
    type: "Announcement",
    title: "System Announcement",
    description: "The Traffic Connect System will undergo maintenance on August 20, 2026 from 02:00 AM to 04:00 AM.",
    time: "1 week ago",
    read: true,
    icon: "megaphone",
    screen: null,
  },
  {
    id: "9",
    type: "Traffic Fine",
    title: "Fine Dispute Resolved",
    description: "Your dispute for fine reference TF20260004 has been resolved in your favor. Amount: R0.00",
    time: "2 weeks ago",
    read: true,
    icon: "warning",
    screen: "Fines",
  },
  {
    id: "10",
    type: "Appointment",
    title: "Appointment Reminder",
    description: "Reminder: Your vehicle license renewal appointment is tomorrow at 11:00 AM.",
    time: "2 weeks ago",
    read: true,
    icon: "calendar",
    screen: "Appointments",
  },
  {
    id: "11",
    type: "Driver Licence",
    title: "Driver Licence Updated",
    description: "Your driver's license information has been updated successfully.",
    time: "3 weeks ago",
    read: true,
    icon: "card",
    screen: "DriverLicense",
  },
  {
    id: "12",
    type: "Payment",
    title: "Payment Reminder",
    description: "You have outstanding fines totaling R1,250.00. Please make payment to avoid penalties.",
    time: "3 weeks ago",
    read: true,
    icon: "wallet",
    screen: "Fines",
  },
];

// NEW FEATURE: Notification type colors
const TYPE_COLORS: Record<string, string> = {
  Appointment: "#2196F3",
  "Traffic Fine": "#F44336",
  "Driver Licence": "#4CAF50",
  "Vehicle Licence": "#FF9800",
  Payment: "#9C27B0",
  Announcement: "#607D8B",
  "Licence Renewal": "#00BCD4",
};

export default function NotificationsScreen() {
  // NEW FEATURE: State management
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);

  // NEW FEATURE: Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // NEW FEATURE: Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // TODO: Fetch notifications from Firebase
    }, 1500);
  };

  // NEW FEATURE: Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    Alert.alert("Success", "All notifications marked as read.");
    // TODO: Save notification status in Firebase
  };

  // NEW FEATURE: Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setShowDeleteModal(false);
    Alert.alert("Success", "Notification deleted successfully.");
    // TODO: Delete notification from Firebase
  };

  // NEW FEATURE: Mark as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
    // TODO: Update notification status in Firebase
  };

  // NEW FEATURE: Handle notification press
  const handleNotificationPress = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
    // TODO: Navigate to the related screen
    // Navigation logic would go here
    Alert.alert(
      "Navigate",
      `Navigate to ${notification.screen || "Home"} screen`,
      [{ text: "OK" }]
    );
  };

  // NEW FEATURE: Handle long press (delete)
  const handleLongPress = (notification: any) => {
    setSelectedNotification(notification);
    setShowDeleteModal(true);
  };

  // NEW FEATURE: Get notification icon
  const getNotificationIcon = (iconName: string) => {
    switch (iconName) {
      case "calendar": return "calendar-outline";
      case "warning": return "warning-outline";
      case "card": return "card-outline";
      case "car": return "car-outline";
      case "wallet": return "wallet-outline";
      case "megaphone": return "megaphone-outline";
      case "checkmark-circle": return "checkmark-circle-outline";
      default: return "notifications-outline";
    }
  };

  // NEW FEATURE: Get notification type color
  const getTypeColor = (type: string) => {
    return TYPE_COLORS[type] || "#757575";
  };

  // NEW FEATURE: Format time
  const formatTime = (time: string) => {
    return time;
  };

  // NEW FEATURE: Render notification card
  const renderNotificationCard = (notification: any) => {
    const typeColor = getTypeColor(notification.type);
    const isUnread = !notification.read;

    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationCard,
          isUnread && styles.notificationCardUnread,
        ]}
        onPress={() => handleNotificationPress(notification)}
        onLongPress={() => handleLongPress(notification)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          <View style={[styles.iconContainer, { backgroundColor: typeColor }]}>
            <Ionicons
              name={getNotificationIcon(notification.icon)}
              size={22}
              color="#fff"
            />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={[
                styles.notificationTitle,
                isUnread && styles.notificationTitleUnread,
              ]}>
                {notification.title}
              </Text>
              {isUnread && (
                <View style={styles.unreadDot} />
              )}
            </View>
            <Text style={styles.notificationDescription} numberOfLines={2}>
              {notification.description}
            </Text>
            <View style={styles.footerContainer}>
              <Text style={styles.notificationType}>{notification.type}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // NEW FEATURE: Render header
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Ionicons
            name="checkmark-done-outline"
            size={24}
            color={unreadCount > 0 ? "#003366" : "#ccc"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onRefresh}
        >
          <Ionicons name="refresh-outline" size={24} color="#003366" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // NEW FEATURE: Render loading state
  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#003366" />
      <Text style={styles.loadingText}>Loading notifications...</Text>
    </View>
  );

  // NEW FEATURE: Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <Ionicons name="notifications-off-outline" size={80} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>No Notifications</Text>
      <Text style={styles.emptySubtitle}>
        You're all caught up! You'll receive important updates here.
      </Text>
    </View>
  );

  // NEW FEATURE: Render delete modal
  const renderDeleteModal = () => (
    <Modal
      visible={showDeleteModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDeleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalIconContainer}>
            <Ionicons name="trash-outline" size={48} color="#F44336" />
          </View>
          <Text style={styles.modalTitle}>Delete Notification</Text>
          <Text style={styles.modalDescription}>
            Are you sure you want to delete this notification?
            This action cannot be undone.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setShowDeleteModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalDeleteButton]}
              onPress={() => selectedNotification && deleteNotification(selectedNotification.id)}
            >
              <Text style={styles.modalDeleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render statistics
  const renderStatistics = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const read = notifications.filter(n => n.read).length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#F44336" }]}>{unread}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: "#4CAF50" }]}>{read}</Text>
          <Text style={styles.statLabel}>Read</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderStatistics()}

      {loading ? (
        renderLoadingState()
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#003366"
            />
          }
        >
          {notifications.length === 0 ? (
            renderEmptyState()
          ) : (
            <View style={styles.notificationsContainer}>
              {notifications.map((notification) =>
                renderNotificationCard(notification)
              )}
            </View>
          )}
        </ScrollView>
      )}

      {renderDeleteModal()}

      {/* TODO: Add Firebase functionality */}
      {/* // TODO: Fetch notifications from Firebase */}
      {/* // TODO: Listen for real-time updates */}
      {/* // TODO: Mark notification as read */}
      {/* // TODO: Delete notification */}
      {/* // TODO: Save notification status */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  // NEW FEATURE: Header styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#003366",
  },
  unreadBadge: {
    backgroundColor: "#F44336",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: "center",
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 4,
  },
  // NEW FEATURE: Statistics styles
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
  },
  // NEW FEATURE: Scroll view
  scrollView: {
    flex: 1,
  },
  notificationsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  // NEW FEATURE: Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
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
  // NEW FEATURE: Notification card styles
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  notificationCardUnread: {
    backgroundColor: "#E8F4FD",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a1a",
    flex: 1,
  },
  notificationTitleUnread: {
    fontWeight: "700",
    color: "#003366",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2196F3",
  },
  notificationDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  notificationType: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  notificationTime: {
    fontSize: 11,
    color: "#999",
  },
  // NEW FEATURE: Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 340,
    alignItems: "center",
  },
  modalIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButton: {
    backgroundColor: "#F5F5F5",
  },
  modalCancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
  modalDeleteButton: {
    backgroundColor: "#F44336",
  },
  modalDeleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});