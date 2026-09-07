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
  Animated,
  PanResponder,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// NEW FEATURE: Mock notifications data
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "Vehicle License",
    title: "Vehicle License Renewal Reminder",
    description: "Your vehicle license (BW 21 XB GP) will expire in 30 days. Renew now to avoid penalties.",
    time: "2026-07-29T10:30:00",
    read: false,
    icon: "car",
  },
  {
    id: "2",
    type: "Driver License",
    title: "Driver's License Ready for Collection",
    description: "Your renewed driver's license is ready for collection at the Pretoria DLTC. Bring your ID and current license.",
    time: "2026-07-28T15:45:00",
    read: false,
    icon: "card",
  },
  {
    id: "3",
    type: "Traffic Fine",
    title: "Traffic Fine Payment Confirmed",
    description: "Your payment of R500.00 for fine reference TF20260001 has been confirmed and processed.",
    time: "2026-07-27T09:20:00",
    read: true,
    icon: "warning",
  },
  {
    id: "4",
    type: "Appointment",
    title: "Appointment Confirmed",
    description: "Your driver's license renewal appointment has been confirmed for August 15, 2026 at 09:30 AM.",
    time: "2026-07-26T14:00:00",
    read: true,
    icon: "calendar",
  },
  {
    id: "5",
    type: "Vehicle License",
    title: "Vehicle License Renewed",
    description: "Your vehicle license for BW 21 XB GP has been renewed successfully. New disc number: VD-2026-0789",
    time: "2026-07-25T11:30:00",
    read: true,
    icon: "checkmark-circle",
  },
];

// NEW FEATURE: Notification type colors
const TYPE_COLORS: Record<string, string> = {
  "Vehicle License": "#FF9800",
  "Driver License": "#4CAF50",
  "Traffic Fine": "#F44336",
  Appointment: "#2196F3",
  Payment: "#9C27B0",
  Announcement: "#607D8B",
};

export default function NotificationsScreen() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  // NEW FEATURE: Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // NEW FEATURE: Mark all as read
  const markAllAsRead = () => {
    if (unreadCount === 0) {
      Alert.alert("Info", "No unread notifications to mark as read.");
      return;
    }
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    Alert.alert("Success", "All notifications marked as read.");
  };

  // NEW FEATURE: Delete all notifications - FIXED: Permanently removes notifications
  const deleteAllNotifications = () => {
    setShowDeleteAllModal(false);
    setNotifications([]);
    Alert.alert("Success", "All notifications have been deleted.");
  };

  // NEW FEATURE: Delete single notification - FIXED: Permanently removes notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    Alert.alert("Success", "Notification deleted.");
  };

  // NEW FEATURE: Mark as read
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // NEW FEATURE: Handle notification press - View Details
  const handleNotificationPress = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    setSelectedNotification(notification);
    setShowDetailsModal(true);
  };

  // NEW FEATURE: Handle swipe to delete
  const handleSwipeDelete = (id: string) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteNotification(id) }
      ]
    );
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

  // NEW FEATURE: Format time
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // NEW FEATURE: Render notification card with swipe
  const renderNotificationCard = (notification: any) => {
    const typeColor = TYPE_COLORS[notification.type] || "#757575";
    const isUnread = !notification.read;
    const pan = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dx < 0) {
          pan.x.setValue(gesture.dx);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -80) {
          handleSwipeDelete(notification.id);
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    });

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.cardWrapper, { transform: [{ translateX: pan.x }] }]}
      >
        <TouchableOpacity
          style={[
            styles.notificationCard,
            isUnread && styles.notificationCardUnread,
          ]}
          onPress={() => handleNotificationPress(notification)}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: typeColor }]}>
              <Ionicons name={getNotificationIcon(notification.icon)} size={22} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={[styles.notificationTitle, isUnread && styles.notificationTitleUnread]}>
                  {notification.title}
                </Text>
                {isUnread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notificationDescription} numberOfLines={2}>
                {notification.description}
              </Text>
              <View style={styles.footerContainer}>
                <Text style={styles.notificationType}>{notification.type}</Text>
                <Text style={styles.notificationTime}>{formatTime(notification.time)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.deleteIndicator}>
          <Ionicons name="trash" size={24} color="#fff" />
        </View>
      </Animated.View>
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
          <Ionicons name="checkmark-done-outline" size={24} color={unreadCount > 0 ? "#003366" : "#ccc"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowDeleteAllModal(true)}
          disabled={notifications.length === 0}
        >
          <Ionicons name="trash-outline" size={24} color={notifications.length > 0 ? "#F44336" : "#ccc"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // NEW FEATURE: Render details modal
  const renderDetailsModal = () => (
    <Modal visible={showDetailsModal} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
              <Ionicons name="arrow-back" size={24} color="#003366" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Notification Details</Text>
            <TouchableOpacity onPress={() => {
              setShowDetailsModal(false);
              if (selectedNotification) deleteNotification(selectedNotification.id);
            }}>
              <Ionicons name="trash-outline" size={24} color="#F44336" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            {selectedNotification && (
              <View style={styles.detailsContainer}>
                <View style={[styles.detailsIconContainer, { 
                  backgroundColor: TYPE_COLORS[selectedNotification.type] || "#757575" 
                }]}>
                  <Ionicons 
                    name={getNotificationIcon(selectedNotification.icon)} 
                    size={40} 
                    color="#fff" 
                  />
                </View>
                <Text style={styles.detailsTitle}>{selectedNotification.title}</Text>
                <View style={styles.detailsMeta}>
                  <Text style={styles.detailsType}>{selectedNotification.type}</Text>
                  <Text style={styles.detailsTime}>{formatTime(selectedNotification.time)}</Text>
                </View>
                <View style={styles.detailsDivider} />
                <Text style={styles.detailsDescription}>{selectedNotification.description}</Text>
                {!selectedNotification.read && (
                  <TouchableOpacity 
                    style={styles.markReadButton}
                    onPress={() => {
                      markAsRead(selectedNotification.id);
                      setSelectedNotification({ ...selectedNotification, read: true });
                    }}
                  >
                    <Text style={styles.markReadButtonText}>Mark as Read</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  // NEW FEATURE: Render delete all modal
  const renderDeleteAllModal = () => (
    <Modal visible={showDeleteAllModal} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.deleteAllContainer}>
          <View style={styles.deleteAllIconContainer}>
            <Ionicons name="trash-outline" size={48} color="#F44336" />
          </View>
          <Text style={styles.deleteAllTitle}>Delete All Notifications</Text>
          <Text style={styles.deleteAllDescription}>
            Are you sure you want to delete all notifications? This action cannot be undone.
          </Text>
          <View style={styles.deleteAllButtons}>
            <TouchableOpacity 
              style={[styles.deleteAllButton, styles.deleteAllCancel]}
              onPress={() => setShowDeleteAllModal(false)}
            >
              <Text style={styles.deleteAllCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.deleteAllButton, styles.deleteAllConfirm]}
              onPress={deleteAllNotifications}
            >
              <Text style={styles.deleteAllConfirmText}>Delete All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#003366" />
        }
      >
        {notifications.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={styles.notificationsContainer}>
            {notifications.map((notification) => renderNotificationCard(notification))}
          </View>
        )}
      </ScrollView>

      {renderDetailsModal()}
      {renderDeleteAllModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FB" },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { fontSize: 28, fontWeight: "700", color: "#003366" },
  unreadBadge: {
    backgroundColor: "#F44336",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: "center",
  },
  unreadBadgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  headerActions: { flexDirection: "row", gap: 12 },
  headerButton: { padding: 4 },

  scrollView: { flex: 1 },
  notificationsContainer: { paddingHorizontal: 20, paddingBottom: 20 },

  // Notification card with swipe
  cardWrapper: { marginBottom: 12, position: "relative" },
  deleteIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: "#F44336",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
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
  cardContent: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  textContainer: { flex: 1, gap: 4 },
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  notificationTitle: { fontSize: 15, fontWeight: "500", color: "#1a1a1a", flex: 1 },
  notificationTitleUnread: { fontWeight: "700", color: "#003366" },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#2196F3" },
  notificationDescription: { fontSize: 13, color: "#666", lineHeight: 18 },
  footerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 4 },
  notificationType: { fontSize: 11, color: "#999", fontWeight: "500" },
  notificationTime: { fontSize: 11, color: "#999" },

  // Details modal
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
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
  modalTitle: { fontSize: 18, fontWeight: "600", color: "#1a1a1a" },
  modalBody: { padding: 20 },
  detailsContainer: { alignItems: "center" },
  detailsIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  detailsTitle: { fontSize: 20, fontWeight: "600", color: "#1a1a1a", textAlign: "center", marginBottom: 8 },
  detailsMeta: { flexDirection: "row", gap: 16, marginBottom: 16 },
  detailsType: { fontSize: 14, color: "#666" },
  detailsTime: { fontSize: 14, color: "#999" },
  detailsDivider: { width: "100%", height: 1, backgroundColor: "#f0f0f0", marginVertical: 16 },
  detailsDescription: { fontSize: 16, color: "#555", lineHeight: 24, textAlign: "center" },
  markReadButton: {
    marginTop: 20,
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  markReadButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  // Delete all modal
  deleteAllContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 340,
    alignItems: "center",
    alignSelf: "center",
  },
  deleteAllIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteAllTitle: { fontSize: 20, fontWeight: "600", color: "#1a1a1a", marginBottom: 8 },
  deleteAllDescription: { fontSize: 14, color: "#666", textAlign: "center", lineHeight: 20, marginBottom: 24 },
  deleteAllButtons: { flexDirection: "row", gap: 12, width: "100%" },
  deleteAllButton: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  deleteAllCancel: { backgroundColor: "#F5F5F5" },
  deleteAllCancelText: { color: "#666", fontSize: 16, fontWeight: "500" },
  deleteAllConfirm: { backgroundColor: "#F44336" },
  deleteAllConfirmText: { color: "#fff", fontSize: 16, fontWeight: "500" },

  // Empty state
  emptyContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 40, 
    paddingVertical: 60 
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
  emptyTitle: { fontSize: 22, fontWeight: "600", color: "#1a1a1a", marginBottom: 8 },
  emptySubtitle: { fontSize: 16, color: "#666", textAlign: "center", lineHeight: 24 },
});