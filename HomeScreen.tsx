import React, { useState } from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import DriverLicenseCard from "../components/DriverLicenseCard";

/* TYPES */
type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

type StatusCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  status?: string;
  statusColor?: string;
  hideChevron?: boolean;
  onPress?: () => void;
};

type QuickActionProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  badge?: string;
  onPress?: () => void;
};

// NEW FEATURE: Mock notification data
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Driver's license ready for collection",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Vehicle license renewal reminder",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "3",
    title: "Traffic fine payment confirmed",
    time: "1 day ago",
    read: true,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  // NEW FEATURE: State management
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications] = useState(MOCK_NOTIFICATIONS);

  // NEW FEATURE: Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  // NEW FEATURE: Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#003366"
            />
          }
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.title}>Department of Transport</Text>
              <Text style={styles.dateText}>South Africa • {new Date().toLocaleDateString('en-ZA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</Text>
            </View>

            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("Notifications")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="#003366"
                />
                {unreadCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate("Profile")}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="#003366"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* NEW FEATURE: Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="car" size={24} color="#003366" />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <MaterialIcons name="warning" size={24} color="#E65100" />
              <Text style={[styles.statNumber, { color: "#E65100" }]}>2</Text>
              <Text style={styles.statLabel}>Unpaid Fines</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCard}>
              <Ionicons name="calendar" size={24} color="#2196F3" />
              <Text style={[styles.statNumber, { color: "#2196F3" }]}>1</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
          </View>

          {/* STATUS CARDS */}
          <DriverLicenseCard />

          <StatusCard
            icon={
              <MaterialCommunityIcons
                name="car-info"
                size={26}
                color="#003366"
              />
            }
            title="Vehicle License"
            subtitle="ABC123GP • Toyota Corolla"
            status="Expires in 30 days"
            statusColor="#FF9800"
            onPress={() => navigation.navigate("VehicleLicense")}
          />

          <StatusCard
            icon={
              <MaterialIcons
                name="warning-amber"
                size={26}
                color="#E65100"
              />
            }
            title="Traffic Fines"
            subtitle="Outstanding Balance: R750 • 2 Unpaid"
            status="Action Required"
            statusColor="#F44336"
            onPress={() => navigation.navigate("Fines")}
          />
          
          <StatusCard
            icon={
              <Ionicons
                name="calendar-outline"
                size={24}
                color="#003366"
              />
            }
            title="Next Appointment"
            subtitle="Driver Licence Renewal"
            status="15 Jul 2026 • 09:30 AM"
            statusColor="#2E7D32"
            hideChevron
            onPress={() => navigation.navigate("Appointments")}
          />

          {/* QUICK ACTIONS */}
          <SectionHeader 
            title="Quick Actions" 
            subtitle="Manage your transport needs"
          />

          <View style={styles.grid}>
            <QuickAction 
              icon="payment" 
              title="Pay Fine" 
              badge="2"
              onPress={() => navigation.navigate("Fines")}
            />
            <QuickAction 
              icon="sync" 
              title="Renew Disk"
              onPress={() => navigation.navigate("VehicleLicense")}
            />
            <QuickAction 
              icon="calendar-month" 
              title="Appointment"
              onPress={() => navigation.navigate("Appointments")}
            />
            <QuickAction 
              icon="badge" 
              title="Digital License"
              onPress={() => navigation.navigate("DriverLicense")}
            />
          </View>

          {/* TRAFFIC */}
          <SectionHeader 
            title="Traffic Updates" 
            subtitle="Real-time traffic information"
          />

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <View style={styles.listIconContainer}>
                <MaterialCommunityIcons
                  name="traffic-light"
                  size={22}
                  color="#003366"
                />
              </View>
              <View style={styles.listContent}>
                <Text style={styles.listText}>Heavy Traffic on N1 North</Text>
                <Text style={styles.listSubtext}>Delays expected • 5 km ahead</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <View style={styles.listIconContainer}>
                <MaterialCommunityIcons
                  name="road-variant"
                  size={22}
                  color="#003366"
                />
              </View>
              <View style={styles.listContent}>
                <Text style={styles.listText}>Accident on N1 South</Text>
                <Text style={styles.listSubtext}>Lane closures • Seek alternative</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>

          {/* ROAD CLOSURES */}
          <SectionHeader 
            title="Road Closures" 
            subtitle="Planned and emergency closures"
          />

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <View style={[styles.listIconContainer, { backgroundColor: "#FFEBEE" }]}>
                <MaterialCommunityIcons
                  name="road-variant"
                  size={22}
                  color="#F44336"
                />
              </View>
              <View style={styles.listContent}>
                <Text style={styles.listText}>Mabopane Road Closed</Text>
                <Text style={styles.listSubtext}>Until further notice • Use alternative route</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#ccc" />
          </TouchableOpacity>

          {/* WEATHER */}
          <SectionHeader 
            title="Weather" 
            subtitle="Current conditions"
          />

          <TouchableOpacity style={styles.weatherCard}>
            <View style={styles.weatherContent}>
              <View style={styles.weatherInfo}>
                <Ionicons name="partly-sunny" size={32} color="#FF9800" />
                <View style={styles.weatherTextContainer}>
                  <Text style={styles.weatherTemp}>24°C</Text>
                  <Text style={styles.weatherDesc}>Partly Cloudy</Text>
                </View>
              </View>
              <View style={styles.weatherDetails}>
                <View style={styles.weatherDetail}>
                  <Ionicons name="water-outline" size={16} color="#666" />
                  <Text style={styles.weatherDetailText}>Humidity: 65%</Text>
                </View>
                <View style={styles.weatherDetail}>
                  <Ionicons name="speedometer-outline" size={16} color="#666" />
                  <Text style={styles.weatherDetailText}>Wind: 12 km/h</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* RECENT NOTIFICATIONS */}
          <SectionHeader 
            title="Recent Notifications" 
            subtitle={`${unreadCount} unread`}
            onPress={() => navigation.navigate("Notifications")}
          />

          {notifications.slice(0, 3).map((notification) => (
            <TouchableOpacity 
              key={notification.id} 
              style={[styles.notificationItem, !notification.read && styles.notificationItemUnread]}
              onPress={() => navigation.navigate("Notifications")}
            >
              <View style={styles.row}>
                <View style={styles.notificationIconContainer}>
                  <Ionicons
                    name="notifications-outline"
                    size={22}
                    color={notification.read ? "#999" : "#003366"}
                  />
                </View>
                <View style={styles.notificationContent}>
                  <Text style={[styles.notificationText, !notification.read && styles.notificationTextUnread]}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTime}>{notification.time}</Text>
                </View>
                {!notification.read && <View style={styles.unreadDot} />}
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Text style={styles.viewAllText}>View All Notifications</Text>
            <Ionicons name="arrow-forward" size={18} color="#003366" />
          </TouchableOpacity>

          {/* NEW FEATURE: Support Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Need help? Contact support</Text>
            <View style={styles.footerLinks}>
              <TouchableOpacity style={styles.footerLink}>
                <Ionicons name="call-outline" size={16} color="#003366" />
                <Text style={styles.footerLinkText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Ionicons name="mail-outline" size={16} color="#003366" />
                <Text style={styles.footerLinkText}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.footerLink}>
                <Ionicons name="chatbubble-outline" size={16} color="#003366" />
                <Text style={styles.footerLinkText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* COMPONENTS */

function SectionHeader({ title, subtitle, onPress }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function StatusCard({ 
  icon, 
  title, 
  subtitle, 
  status, 
  statusColor = "#4CAF50",
  hideChevron = false,
  onPress 
}: StatusCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.cardRow}>
        <View style={styles.cardIconContainer}>
          {icon}
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
          {status && (
            <View style={[styles.statusContainer, { backgroundColor: statusColor + '15' }]}>
              <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
            </View>
          )}
        </View>

        {!hideChevron && (
          <Ionicons name="chevron-forward" size={22} color="#ccc" />
        )}
      </View>
    </TouchableOpacity>
  );
}

function QuickAction({ icon, title, badge, onPress }: QuickActionProps) {
  return (
    <TouchableOpacity style={styles.action} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.actionIconContainer}>
        <MaterialIcons name={icon} size={28} color="#003366" />
        {badge && (
          <View style={styles.actionBadge}>
            <Text style={styles.actionBadgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* STYLES */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  wrapper: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },

  header: {
    paddingTop: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
  },

  greeting: {
    color: "#666",
    fontSize: 14,
    fontWeight: "400",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003366",
    marginTop: 2,
  },

  dateText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: "relative",
  },

  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#F44336",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  notificationBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  // NEW FEATURE: Stats Container
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#003366",
    marginTop: 2,
  },

  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 1,
  },

  statDivider: {
    width: 1,
    backgroundColor: "#f0f0f0",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 2,
  },

  cardSubtitle: {
    fontSize: 13,
    color: "#666",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
    alignSelf: "flex-start",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "500",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#003366",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  seeAllText: {
    fontSize: 13,
    color: "#003366",
    fontWeight: "500",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  action: {
    width: "48%",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  actionIconContainer: {
    position: "relative",
  },

  actionBadge: {
    position: "absolute",
    top: -8,
    right: -12,
    backgroundColor: "#F44336",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  actionBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "700",
  },

  actionText: {
    marginTop: 8,
    fontWeight: "600",
    color: "#1a1a1a",
    fontSize: 13,
  },

  listItem: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  listIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#E8EEF5",
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    flex: 1,
    marginLeft: 12,
  },

  listText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a1a",
  },

  listSubtext: {
    fontSize: 12,
    color: "#999",
    marginTop: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  // NEW FEATURE: Weather card
  weatherCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  weatherContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  weatherTextContainer: {
    marginLeft: 12,
  },

  weatherTemp: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
  },

  weatherDesc: {
    fontSize: 14,
    color: "#666",
  },

  weatherDetails: {
    alignItems: "flex-end",
  },

  weatherDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },

  weatherDetailText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },

  // NEW FEATURE: Notification items
  notificationItem: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },

  notificationItemUnread: {
    backgroundColor: "#E8F4FD",
    borderLeftWidth: 3,
    borderLeftColor: "#2196F3",
  },

  notificationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  notificationContent: {
    flex: 1,
    marginLeft: 12,
  },

  notificationText: {
    fontSize: 14,
    color: "#555",
  },

  notificationTextUnread: {
    fontWeight: "600",
    color: "#003366",
  },

  notificationTime: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2196F3",
    marginLeft: 8,
  },

  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 4,
    gap: 6,
  },

  viewAllText: {
    fontSize: 14,
    color: "#003366",
    fontWeight: "500",
  },

  // NEW FEATURE: Footer
  footer: {
    marginTop: 30,
    alignItems: "center",
  },

  footerText: {
    fontSize: 13,
    color: "#999",
    marginBottom: 12,
  },

  footerLinks: {
    flexDirection: "row",
    gap: 20,
  },

  footerLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  footerLinkText: {
    fontSize: 13,
    color: "#003366",
    fontWeight: "500",
  },
});