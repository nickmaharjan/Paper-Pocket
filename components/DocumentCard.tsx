import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../lib/theme';

interface DocumentCardProps {
  title: string;
  category: string;
  date: string;
  icon: string;
  onPress?: () => void;
}

export default function DocumentCard({ title, category, date, icon, onPress }: DocumentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon as any}
          size={theme.layout.iconSize.large}
          color={theme.colors.primary}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      
      <MaterialCommunityIcons
        name="chevron-right"
        size={theme.layout.iconSize.default}
        color={theme.colors.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...theme.components.card,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.layout.spacing.small,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.layout.radii.rounded,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: theme.layout.radii.soft,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.layout.spacing.base,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: theme.layout.spacing.tiny,
    fontFamily: theme.typography.fontFamily,
  },
  category: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: theme.layout.spacing.tiny,
    fontFamily: theme.typography.fontFamily,
  },
  date: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
  },
});