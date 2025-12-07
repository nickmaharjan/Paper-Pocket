import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../lib/theme';
import PrimaryButton from '../../components/PrimaryButton';
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const navigation = useNavigation();
    const router = useRouter();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Sign Out',
          onPress: () => {
            console.log('User signed out');
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header with Back Button */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account</Text>
          <View style={styles.spacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card Section */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons
                name="account-circle"
                size={80}
                color={theme.colors.primary}
              />
            </View>
            <Text style={styles.userName}>Alex Mitchell</Text>
            <Text style={styles.userEmail}>alex.mitchell@email.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Account Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            <ProfileOption
              icon="lock"
              label="Change Password"
              onPress={() => console.log('Change password')}
            />
            <ProfileOption
              icon="bell"
              label="Notifications"
              onPress={() => console.log('Notifications')}
              showBadge={true}
            />
            <ProfileOption
              icon="fingerprint"
              label="Biometric Login"
              onPress={() => console.log('Biometric')}
            />
            <ProfileOption
              icon="shield-account"
              label="Security & Privacy"
              onPress={() => console.log('Security')}
            />
          </View>

          {/* App Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            <ProfileOption
              icon="palette"
              label="Theme"
              subtitle="Light"
              onPress={() => console.log('Theme')}
            />
            <ProfileOption
              icon="translate"
              label="Language"
              subtitle="English"
              onPress={() => console.log('Language')}
            />
            <ProfileOption
              icon="database"
              label="Storage & Cache"
              subtitle="2.4 MB"
              onPress={() => console.log('Storage')}
            />
          </View>

          {/* Support & Legal Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support & Legal</Text>
            <ProfileOption
              icon="help-circle"
              label="Create Ticket"
                           onPress={() => router.push("/(tabs)/ticketscreen")}
            />
            <ProfileOption
              icon="information"
              label="About App"
              subtitle="v1.0.0"
              onPress={() => console.log('About')}
            />
            <ProfileOption
              icon="file-document"
              label="Privacy Policy"
              onPress={() => console.log('Privacy')}
            />
            <ProfileOption
              icon="file-document-multiple"
              label="Terms of Service"
              onPress={() => console.log('Terms')}
            />
          </View>

          {/* Account Actions Section */}
          <View style={styles.section}>
            <PrimaryButton
              label="Sign Out"
              onPress={handleSignOut}
              style={styles.signOutButton}
            />
            <TouchableOpacity style={styles.deleteAccountButton}>
              <Text style={styles.deleteAccountText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

interface ProfileOptionProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  showBadge?: boolean;
}

function ProfileOption({ icon, label, subtitle, onPress, showBadge }: ProfileOptionProps) {
  return (
    <TouchableOpacity style={styles.optionRow} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.optionLeft}>
        <View style={[styles.optionIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
          <MaterialCommunityIcons
            name={icon as any}
            size={22}
            color={theme.colors.primary}
          />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionLabel}>{label}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.optionRight}>
        {showBadge && <View style={styles.badge} />}
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={theme.colors.textSecondary}
        />
      </View>
    </TouchableOpacity>
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.spacing.base,
    paddingVertical: theme.layout.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
  },
  spacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.layout.spacing.base,
    paddingTop: theme.layout.spacing.large,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: theme.layout.spacing.xl,
    paddingVertical: theme.layout.spacing.large,
    paddingHorizontal: theme.layout.spacing.base,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radii.rounded,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: theme.layout.spacing.base,
  },
  userName: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: theme.layout.spacing.tiny,
    fontFamily: theme.typography.fontFamily,
  },
  userEmail: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    marginBottom: theme.layout.spacing.large,
    fontFamily: theme.typography.fontFamily,
  },
  editProfileButton: {
    paddingVertical: theme.layout.spacing.small,
    paddingHorizontal: theme.layout.spacing.large,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  editProfileText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
  },
  section: {
    marginBottom: theme.layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: theme.layout.spacing.base,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: theme.typography.fontFamily,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.base,
    marginBottom: theme.layout.spacing.small,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: theme.layout.radii.soft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.layout.spacing.base,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '500',
    color: theme.colors.textPrimary,
    marginBottom: theme.layout.spacing.tiny,
    fontFamily: theme.typography.fontFamily,
  },
  optionSubtitle: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.layout.spacing.small,
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
  },
  signOutButton: {
    width: '100%',
    marginBottom: theme.layout.spacing.base,
  },
  deleteAccountButton: {
    paddingVertical: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.large,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 2,
    borderColor: theme.colors.error,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  deleteAccountText: {
    color: theme.colors.error,
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    fontFamily: theme.typography.fontFamily,
  },
  bottomSpacing: {
    height: theme.layout.spacing.xl,
  },
});