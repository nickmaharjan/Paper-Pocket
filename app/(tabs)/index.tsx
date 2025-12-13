import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { theme } from '../../lib/theme';
import PrimaryButton from '../../components/PrimaryButton';
import DocumentCard from '../../components/DocumentCard';
import { useRouter } from "expo-router";

interface DocumentData {
  id: string;
  title: string;
  category: string;
  date: string;
  icon: string;
}

const recentDocuments: DocumentData[] = [
  { id: '1', title: 'Passport', category: 'ID', date: 'Nov 15, 2024', icon: 'passport' },
  { id: '2', title: 'Electric Bill', category: 'Bills', date: 'Nov 14, 2024', icon: 'lightning-bolt' },
  { id: '3', title: 'Laptop Warranty', category: 'Warranty', date: 'Nov 10, 2024', icon: 'shield-check' },
];

// Define navigation stack params
type RootStackParamList = {
  index: undefined;          // This corresponds to this file
  ProfileScreen: undefined;
};

type IndexNavigationProp = NavigationProp<RootStackParamList, 'index'>;

export default function HomeScreen() {
  const navigation = useNavigation<IndexNavigationProp>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>Ronnie James Dio</Text>
            </View>
            <TouchableOpacity
              style={styles.profileIcon}
              onPress={() => router.push("/(tabs)/ProfileScreen")}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={40}
                color={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <StatCard icon="file-document-multiple" label="Total Documents" value="24" color={theme.colors.primary} />
            <StatCard icon="check-circle" label="Expiring Soon" value="3" color={theme.colors.accent} />
            <StatCard icon="lock" label="Categories" value="5 active" color={theme.colors.accent} />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <PrimaryButton label="+ Scan Document" onPress={() => router.push("/(tabs)/ScanDocument")} style={styles.fullWidthButton} />
            <TouchableOpacity style={styles.secondaryButton}>
              <MaterialCommunityIcons name="folder-plus" size={20} color={theme.colors.primary} />
              <Text style={styles.secondaryButtonText}>Create Category</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Documents */}
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Documents</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>

            {recentDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                title={doc.title}
                category={doc.category}
                date={doc.date}
                icon={doc.icon}
                onPress={() => console.log('Open document:', doc.id)}
              />
            ))}
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconContainer, { backgroundColor: `${color}20` }]}>
        <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.layout.spacing.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.layout.spacing.large,
  },
  greeting: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.layout.spacing.tiny,
  },
  userName: {
    fontSize: theme.typography.title.fontSize,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: theme.layout.spacing.large,
    gap: theme.layout.spacing.small,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radii.soft,
    padding: theme.layout.spacing.base,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: theme.layout.radii.soft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.layout.spacing.small,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.layout.spacing.tiny,
  },
  statLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    gap: theme.layout.spacing.base,
    marginVertical: theme.layout.spacing.large,
  },
  fullWidthButton: {
    width: '100%',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.large,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
    gap: theme.layout.spacing.small,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
  },
  recentSection: {
    marginTop: theme.layout.spacing.large,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.layout.spacing.base,
  },
  recentTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
  },
  viewAll: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.primary,
    fontWeight: '500',
    fontFamily: theme.typography.fontFamily,
  },
  bottomSpacing: {
    height: theme.layout.spacing.xl,
  },
});

