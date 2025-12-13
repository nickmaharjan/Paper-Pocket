import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { theme } from '../../lib/theme';
import { writeTicketData } from '../../scripts/script.js';

export default function NewTicketScreen() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [issue, setIssue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Account Issue",
    "Password Reset",
    "Billing",
    "Technical Error",
    "Other",
  ];

  const handleSubmit = () => {
    if (!category || !subject || !issue) {
      Alert.alert("Error", "Please fill all fields before submitting.");
      return;
    }

    const ticketId = Date.now().toString();
    writeTicketData(ticketId, category, subject, issue);

    setCategory('');
    setSubject('');
    setIssue('');
    Alert.alert("Success", "Ticket submitted successfully!");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
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

      <Text style={styles.headerTitle}>New Ticket</Text>

      <Text style={styles.label}>Category</Text>

      <Pressable
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.dropdownText}>{category || 'Select'}</Text>
        <Text style={styles.dropdownIcon}>⌵</Text>
      </Pressable>

      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          {categories.map((item, index) => (
            <Pressable
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                setCategory(item);
                setIsDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        placeholder="Eg. Unable to Reset Password"
        placeholderTextColor={theme.colors.textSecondary}
        value={subject}
        onChangeText={setSubject}
      />

      <Text style={styles.label}>Describe Your Issue</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Please provide as much details as possible"
        placeholderTextColor={theme.colors.textSecondary}
        value={issue}
        onChangeText={setIssue}
        multiline
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Ticket</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.layout.spacing.large,

    // FIX: Prevent overlap
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
  },
  headerTitle: {
    ...theme.typography.title,
    marginBottom: 24,
    color: theme.colors.textPrimary,
  },
  label: {
    ...theme.typography.body,
    fontWeight: '500',
    marginBottom: 6,
    color: theme.colors.textPrimary,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: theme.colors.surface,
    marginBottom: 10,
  },
  dropdownText: {
    flex: 1,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: 18,
    color: theme.colors.textSecondary,
  },
  dropdownMenu: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    textAlignVertical: 'top',
    marginBottom: 30,
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});
