/**
 * @file AddItemScreen.tsx
 * @description This screen allows the user to add a new menu item or edit an existing one.
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { saveMenuItem } from '../utils/storage';
import { NavigationProps, MenuCategory, CategoryOption } from '../types';
import { Colors, Typography } from '../constants/colors';
import { parsePrice, isValidPrice } from '../utils/priceUtils';

/**
 * AddItemScreen Component
 * Form for adding new menu items or editing existing ones
 * Features: input validation, price formatting, category selection
 * @param navigation - Navigation object
 * @param route - Route params containing item to edit (optional)
 */
const AddItemScreen: React.FC<NavigationProps> = ({ navigation, route = {} }) => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [name, setName] = useState<string>(''); // Item name
  const [description, setDescription] = useState<string>(''); // Item description (optional)
  const [price, setPrice] = useState<string>(''); // Price as string for input
  const [category, setCategory] = useState<MenuCategory>('appetizers'); // Selected category
  const [isEditing, setIsEditing] = useState<boolean>(false); // Edit mode flag
  const [editingId, setEditingId] = useState<string | null>(null); // ID of item being edited

  // ========================================
  // CATEGORY CONFIGURATION
  // ========================================
  const categories: CategoryOption[] = [
    { key: 'appetizers', label: 'Appetizers' },
    { key: 'mains', label: 'Main Courses' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'beverages', label: 'Beverages' },
  ];

  // Pre-fill form fields when editing an existing item
  useEffect(() => {
    if (route.params && route.params.item) {
      const item = route.params.item;
      setName(item.name ?? '');
      setDescription(item.description ?? '');
      setPrice((item.price ?? 0).toString());
      setCategory(item.category);
      setIsEditing(true);
      setEditingId(item.id);
    }
  }, [route.params]);

  // ========================================
  // FORM HANDLING
  // ========================================
  
  /**
   * Validate and save menu item
   * Includes input validation and price rounding to cents
   */
  const handleSave = async (): Promise<void> => {
    // Validation: Check required fields
    if (!name.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Please fill in item name and price');
      return;
    }

    // Parse and validate price with proper rounding to cents
    const priceNumber = parsePrice(price);
    if (!isValidPrice(priceNumber) || priceNumber <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price greater than 0');
      return;
    }

    try {
      // Create the menu item object
      const menuItem = {
        id: isEditing ? (editingId as string) : Date.now().toString(),
        name: name.trim(),
        description: description.trim(),
        price: priceNumber,
        category,
      };

      // Save to storage
      await saveMenuItem(menuItem);
      
      // Success feedback
      Alert.alert(
        'Success', 
        `Menu item ${isEditing ? 'updated' : 'added'} successfully`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save menu item. Please try again.');
    }
  };

  // ========================================
  // RENDER FUNCTIONS
  // ========================================
  
  /**
   * Render category selection button
   */
  const renderCategoryButton = (cat: CategoryOption) => (
    <TouchableOpacity
      key={cat.key}
      style={[
        styles.categoryButton,
        category === cat.key && styles.categoryButtonActive,
      ]}
      onPress={() => setCategory(cat.key as MenuCategory)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryButtonText,
          category === cat.key && styles.categoryButtonTextActive,
        ]}
      >
        {cat.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50} style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
        {/* ===== NAME INPUT ===== */}
        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Classic Burger"
        />

        {/* ===== DESCRIPTION INPUT ===== */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="e.g. A juicy beef patty with fresh vegetables"
          multiline
          numberOfLines={3}
        />

        {/* ===== PRICE INPUT ===== */}
        <Text style={styles.label}>Price (R) *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Enter price (e.g., 12.50)"
          keyboardType="decimal-pad"
        />

        {/* ===== CATEGORY SELECTION ===== */}
        <Text style={styles.label}>Category *</Text>
        <View style={styles.categoryContainer}>
          {categories.map(renderCategoryButton)}
        </View>

        {/* Save button */}
         <TouchableOpacity 
           style={styles.saveButton} 
           onPress={handleSave}
           activeOpacity={0.8}
         >
           <Text style={styles.saveButtonText}>
             {isEditing ? 'Update Item' : 'Add Item'}
           </Text>
         </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// ========================================
// STYLES - Using consistent color scheme
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  form: {
    padding: 16,
  },
  label: {
    ...Typography.body,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
    color: Colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightText,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightText,
    backgroundColor: Colors.white,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: Colors.white,
  },
  saveButton: {
    backgroundColor: Colors.accent,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddItemScreen;
