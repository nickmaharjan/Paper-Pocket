import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../lib/theme';

interface DatePickerProps {
  label: string;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  minDate?: Date;
}

export default function DatePicker({
  label,
  selectedDate,
  onDateSelect,
  minDate,
}: DatePickerProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(selectedDate?.getMonth() ?? new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(selectedDate?.getFullYear() ?? new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(selectedDate?.getDate() ?? new Date().getDate());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, selectedDay);
    onDateSelect(newDate);
    setIsModalVisible(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = Array.from({ length: getDaysInMonth(selectedMonth, selectedYear) }, (_, i) => i + 1);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsModalVisible(true)}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={theme.colors.textPrimary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              {/* Month Picker */}
              <View style={styles.singlePickerContainer}>
                <Text style={styles.pickerLabel}>Month</Text>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {months.map((month, index) => (
                    <TouchableOpacity
                      key={month}
                      style={[
                        styles.pickerItem,
                        index === selectedMonth && styles.selectedPickerItem,
                      ]}
                      onPress={() => setSelectedMonth(index)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          index === selectedMonth && styles.selectedPickerItemText,
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Day Picker */}
              <View style={styles.singlePickerContainer}>
                <Text style={styles.pickerLabel}>Day</Text>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {days.map((day) => (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.pickerItem,
                        day === selectedDay && styles.selectedPickerItem,
                      ]}
                      onPress={() => setSelectedDay(day)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          day === selectedDay && styles.selectedPickerItemText,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Picker */}
              <View style={styles.singlePickerContainer}>
                <Text style={styles.pickerLabel}>Year</Text>
                <ScrollView
                  style={styles.scrollView}
                  showsVerticalScrollIndicator={false}
                >
                  {years.map((year) => (
                    <TouchableOpacity
                      key={year}
                      style={[
                        styles.pickerItem,
                        year === selectedYear && styles.selectedPickerItem,
                      ]}
                      onPress={() => setSelectedYear(year)}
                    >
                      <Text
                        style={[
                          styles.pickerItemText,
                          year === selectedYear && styles.selectedPickerItemText,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.layout.spacing.large,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.layout.spacing.small,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.base,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: theme.layout.spacing.small,
  },
  dateText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: '500',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.layout.radii.rounded,
    borderTopRightRadius: theme.layout.radii.rounded,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.layout.spacing.base,
    paddingVertical: theme.layout.spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: theme.typography.subtitle.fontSize,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    fontFamily: theme.typography.fontFamily,
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 250,
    justifyContent: 'space-around',
    paddingVertical: theme.layout.spacing.base,
  },
  singlePickerContainer: {
    flex: 1,
    paddingHorizontal: theme.layout.spacing.small,
  },
  pickerLabel: {
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
    marginBottom: theme.layout.spacing.small,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  pickerItem: {
    paddingVertical: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.small,
    borderRadius: theme.layout.radii.soft,
  },
  selectedPickerItem: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  pickerItemText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'center',
  },
  selectedPickerItemText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: theme.layout.spacing.base,
    paddingHorizontal: theme.layout.spacing.base,
    paddingVertical: theme.layout.spacing.base,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: theme.layout.spacing.base,
    borderRadius: theme.layout.radii.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: theme.layout.spacing.base,
    borderRadius: theme.layout.radii.soft,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: theme.colors.surface,
    fontWeight: '600',
    fontSize: theme.typography.body.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
});