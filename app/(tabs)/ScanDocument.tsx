import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter, useLocalSearchParams } from "expo-router";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { theme } from '../../lib/theme';
import DatePicker from '../../components/DatePicker';
import { writeDocumentData } from '../../scripts/script.js';

export default function ScanDocumentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // -----------------------------
  // Extract addRecentDocument callback
  // -----------------------------
  const addRecentDocument = typeof params.addRecentDocument === 'function' 
    ? (params.addRecentDocument as (doc: any) => void) 
    : undefined;

  const [documentName, setDocumentName] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ uri: string; base64?: string } | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);
  const [reminderDate, setReminderDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== "granted") Alert.alert("Camera Permission Required");
      if (galleryStatus.status !== "granted") Alert.alert("Gallery Permission Required");
    })();
  }, []);

  const handlePickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled && result.assets[0]) setSelectedImage({ uri: result.assets[0].uri, base64: result.assets[0].base64 || undefined });
  };

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.8 });
    if (!result.canceled && result.assets[0]) setSelectedImage({ uri: result.assets[0].uri, base64: result.assets[0].base64 || undefined });
  };

  const validateForm = () => {
    if (!documentName.trim()) { Alert.alert('Error', 'Please enter a document name'); return false; }
    if (!selectedImage) { Alert.alert('Error', 'Please add a document photo'); return false; }
    if (!expirationDate) { Alert.alert('Error', 'Please set an expiration date'); return false; }
    if (!reminderDate) { Alert.alert('Error', 'Please set a reminder date'); return false; }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      if (!selectedImage) throw new Error("No image selected");

      const storage = getStorage();
      const fileName = `documents/${Date.now()}.jpg`;
      const storageReference = storageRef(storage, fileName);

      const response = await fetch(selectedImage.uri);
      const blob = await response.blob();

      await uploadBytes(storageReference, blob);
      const downloadUrl = await getDownloadURL(storageReference);

      const documentId = Date.now().toString();
      await writeDocumentData(
        documentId,
        documentName.trim(),
        downloadUrl,
        expirationDate?.getTime() || 0,
        reminderDate?.getTime() || 0
      );

      // -----------------------------
      // Add document to HomeScreen state
      // -----------------------------
      if (addRecentDocument) {
        addRecentDocument({
          id: documentId,
          title: documentName.trim(),
          category: "General",
          date: new Date().toLocaleDateString(),
          icon: "file-document",
        });
      }

      Alert.alert("Success", "Document saved successfully!", [
        { text: "OK", onPress: () => router.back() }
      ]);

    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "Failed to save document");
    } finally { setIsLoading(false); }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scan Document</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Document Name */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Document Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Passport"
              placeholderTextColor={theme.colors.textSecondary}
              value={documentName}
              onChangeText={setDocumentName}
            />
          </View>

          {/* Document Photo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Document Photo</Text>
            {selectedImage ? (
              <View style={styles.imagePreview}>
                <Text style={styles.imagePreviewText}>✓ Photo added</Text>
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setSelectedImage(null)}>
                  <MaterialCommunityIcons name="close" size={20} color={theme.colors.error} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.photoButton} onPress={handleTakePhoto}>
                  <MaterialCommunityIcons name="camera" size={28} color={theme.colors.primary} />
                  <Text style={styles.photoButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.photoButton} onPress={handlePickFromLibrary}>
                  <MaterialCommunityIcons name="image" size={28} color={theme.colors.accent} />
                  <Text style={styles.photoButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Expiration & Reminder Date */}
          <DatePicker label="Expiration Date" selectedDate={expirationDate} onDateSelect={setExpirationDate} />
          <DatePicker label="Reminder Date" selectedDate={reminderDate} onDateSelect={setReminderDate} />

          {/* Save Button */}
          <TouchableOpacity style={[styles.saveButton, isLoading && { opacity: 0.6 }]} onPress={handleSave} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color={theme.colors.surface} /> : <Text style={styles.saveButtonText}>Save Document</Text>}
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: theme.layout.spacing.base, paddingVertical: theme.layout.spacing.large },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.layout.spacing.large },
  headerTitle: { fontSize: theme.typography.subtitle.fontSize, fontWeight: '600', color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily },
  section: { marginBottom: theme.layout.spacing.large },
  sectionTitle: { fontSize: theme.typography.body.fontSize, fontWeight: '600', color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily, marginBottom: theme.layout.spacing.small },
  input: { paddingVertical: theme.layout.spacing.base, paddingHorizontal: theme.layout.spacing.base, borderRadius: theme.layout.radii.soft, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, fontSize: theme.typography.body.fontSize, color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily },
  photoButton: { flex: 1, paddingVertical: theme.layout.spacing.large, borderRadius: theme.layout.radii.soft, borderWidth: 2, borderColor: theme.colors.border, borderStyle: 'dashed', backgroundColor: `${theme.colors.primary}05`, alignItems: 'center', justifyContent: 'center', gap: theme.layout.spacing.small },
  photoButtonText: { fontSize: theme.typography.caption.fontSize, fontWeight: '600', color: theme.colors.textPrimary, fontFamily: theme.typography.fontFamily },
  imagePreview: { paddingVertical: theme.layout.spacing.large, paddingHorizontal: theme.layout.spacing.base, borderRadius: theme.layout.radii.soft, backgroundColor: `${theme.colors.success}15`, borderWidth: 2, borderColor: theme.colors.success, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  imagePreviewText: { fontSize: theme.typography.body.fontSize, fontWeight: '600', color: theme.colors.success, fontFamily: theme.typography.fontFamily },
  removeImageButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: `${theme.colors.error}15`, alignItems: 'center', justifyContent: 'center' },
  saveButton: { paddingVertical: theme.layout.spacing.base, borderRadius: theme.layout.radii.soft, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: theme.layout.spacing.large },
  saveButtonText: { fontSize: theme.typography.body.fontSize, fontWeight: '600', color: theme.colors.surface, fontFamily: theme.typography.fontFamily },
});
