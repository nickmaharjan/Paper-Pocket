export const theme = {
  colors: {
    primary: '#3A7AFE',
    accent: '#4ADE80',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    muted: '#CBD5F5',
    success: '#4ADE80',
    warning: '#FBBF24',
    error: '#EF4444',
    elevation: {
      low: 'rgba(15, 23, 42, 0.04)',
      medium: 'rgba(15, 23, 42, 0.08)',
      high: 'rgba(15, 23, 42, 0.12)',
    },
  },
  typography: {
    fontFamily: 'Inter',
    title: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 34,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 22,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
  },
  components: {
    button: {
      primary: {
        backgroundColor: '#3A7AFE',
        textColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: '600' as const,
      },
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      paddingVertical: 18,
      paddingHorizontal: 18,
    },
  },
  layout: {
    spacing: {
      tiny: 4,
      small: 8,
      base: 16,
      large: 24,
      xl: 32,
    },
    radii: {
      rounded: 20,
      soft: 12,
      tight: 8,
    },
    iconSize: {
      default: 24,
      large: 32,
      small: 18,
    },
  },
};

export type Theme = typeof theme;