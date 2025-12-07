import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../lib/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function PrimaryButton({ label, onPress, style, disabled }: PrimaryButtonProps) {
  const btn = theme.components.button.primary;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style, disabled && styles.disabled]}
      activeOpacity={0.85}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.components.button.primary.backgroundColor,
    borderRadius: theme.components.button.primary.borderRadius,
    paddingVertical: theme.components.button.primary.paddingVertical,
    paddingHorizontal: theme.components.button.primary.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  label: {
    color: theme.components.button.primary.textColor,
    fontSize: theme.components.button.primary.fontSize,
    fontWeight: theme.components.button.primary.fontWeight,
    fontFamily: theme.typography.fontFamily,
  },
  disabled: {
    opacity: 0.5,
  },
});