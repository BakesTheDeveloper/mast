/**
 * @file MenuItem.tsx
 * @description Reusable component for displaying individual menu items
 * Features: item details, edit/delete actions, consistent styling
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItemProps } from '../types';
import { Colors, Typography } from '../constants/colors';
import { formatPrice } from '../utils/priceUtils';
import { getCategoryLabels } from '../utils/menuCalculations';

/**
 * MenuItem Component
 * Displays menu item with edit/delete capabilities
 * @param item - Menu item data
 * @param onEdit - Edit button callback
 * @param onDelete - Delete button callback
 */
const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit, onDelete }) => {
  // Get user-friendly category labels
  const categoryLabels = getCategoryLabels();
  const categoryLabel = categoryLabels[item.category] || item.category;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Item name and price */}
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          {item.price !== undefined && (
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          )}
        </View>
        
        {/* Category badge */}
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{categoryLabel}</Text>
        </View>
        
        {/* Item description (optional) */}
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
      
      {/* Action buttons */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]} 
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ========================================
// STYLES
// ========================================
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontFamily: Typography.header.fontFamily,
    fontSize: 19,
    fontWeight: '600', // Explicitly set to literal
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontFamily: Typography.header.fontFamily,
    fontSize: 17,
    fontWeight: '600', // Explicitly set to literal
    color: Colors.primary,
  },
  categoryContainer: {
    marginBottom: 8,
    alignSelf: 'flex-start',
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  category: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 11,
    fontWeight: 'normal', // Explicitly set to literal
    color: Colors.lightText,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontFamily: Typography.body.fontFamily,
    fontSize: 14,
    fontWeight: 'normal', // Explicitly set to literal
    color: Colors.lightText,
    lineHeight: 20,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.background,
  },
  editButton: {
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  actionButtonText: {
    ...Typography.body,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
  },
  deleteButtonText: {
    color: Colors.white,
  },
});

export default MenuItem;
