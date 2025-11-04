/**
 * @file MenuScreen.tsx
 * @description This screen displays the menu items, categorized and filterable. It also allows for adding, editing, and deleting items.
 */

import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { loadMenuItems, deleteMenuItem } from '../utils/storage';
import MenuItem from '../components/MenuItem';
import { NavigationProps, MenuItem as MenuItemType, CategoryOption } from '../types';
import { Colors, Typography } from '../constants/colors';
import { 
  calculateAveragePriceByCourse, 
  updateGlobalStatistics, 
  getGlobalStatistics,
  getCategoryLabels 
} from '../utils/menuCalculations';
import { formatPrice } from '../utils/priceUtils';

/**
 * MenuScreen Component
 * Displays the complete menu with category filtering, average price analytics,
 * and management capabilities (edit/delete items)
 * @param navigation - Navigation object from React Navigation
 */
const MenuScreen: React.FC<NavigationProps> = ({ navigation }) => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]); // All menu items
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]); // Filtered by category
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // Current filter
  const [refreshing, setRefreshing] = useState<boolean>(false); // Pull-to-refresh state
  const [averagePrices, setAveragePrices] = useState<Record<string, number>>({}); // Price analytics

  // ========================================
  // CATEGORY CONFIGURATION
  // ========================================
  const categories: CategoryOption[] = [
    { key: 'all', label: 'All' },
    { key: 'appetizers', label: 'Appetizers' },
    { key: 'mains', label: 'Main Courses' },
    { key: 'desserts', label: 'Desserts' },
    { key: 'beverages', label: 'Beverages' },
  ];

  // Load the menu items when the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  // Filter the menu items when the menu items or the selected category changes
  useEffect(() => {
    filterItems();
  }, [menuItems, selectedCategory]);

  // ========================================
  // DATA LOADING & MANAGEMENT
  // ========================================
  
  /**
   * Load menu items from storage and calculate statistics
   */
  const loadItems = async (): Promise<void> => {
    try {
      const items = await loadMenuItems();
      setMenuItems(items);
      
      // Calculate average prices (uses FOR LOOP internally)
      const averages = calculateAveragePriceByCourse(items);
      setAveragePrices(averages);
      
      // Update global statistics cache
      updateGlobalStatistics(items);
    } catch (error) {
      Alert.alert('Error', 'Failed to load menu items. Please try again.');
    }
  };

  /**
   * Filter menu items by selected category
   */
  const filterItems = (): void => {
    if (selectedCategory === 'all') {
      setFilteredItems(menuItems);
    } else {
      // Filter to show only selected category
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
    }
  };

  /**
   * Handle pull-to-refresh action
   */
  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  /**
   * Delete a menu item with confirmation
   * @param id - Item ID to delete
   * @param name - Item name for confirmation message
   */
  const handleDeleteItem = (id: string, name: string): void => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteMenuItem(id);
              await loadItems(); // Reload the items after deletion
            } catch (error) {
              Alert.alert('Error', 'Failed to delete menu item');
            }
          },
        },
      ]
    );
  };

  /**
   * Navigate to edit screen for an item
   * @param item - Item to edit
   */
  const handleEditItem = (item: MenuItemType): void => {
    navigation.navigate('AddItem', { item });
  };

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  /**
   * Render category filter button
   */
  const renderCategoryButton = ({ item }: { item: CategoryOption }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.key && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item.key)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item.key && styles.categoryButtonTextActive,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  /**
   * Render individual menu item
   */
  const renderMenuItem = ({ item }: { item: MenuItemType }) => (
    <MenuItem
      item={item}
      onEdit={() => handleEditItem(item)}
      onDelete={() => handleDeleteItem(item.id, item.name)}
    />
  );

  /**
   * Render empty state when no items found
   */
  /**
   * Render analytics card showing average prices by course
   */
  const renderAveragePricesCard = () => {
    const categoryLabels = getCategoryLabels();
    const globalStats = getGlobalStatistics();
    
    if (Object.keys(averagePrices).length === 0) {
      return null;
    }
    
    return (
      <View style={styles.averagePricesCard}>
        <Text style={styles.averagePricesTitle}>Average Prices by Course</Text>
        <View style={styles.averagePricesList}>
          {Object.entries(averagePrices).map(([category, avgPrice]) => (
            <View key={category} style={styles.averagePriceItem}>
              <Text style={styles.averagePriceCategory}>
                {categoryLabels[category] || category}
              </Text>
              <Text style={styles.averagePriceValue}>{formatPrice(avgPrice)}</Text>
            </View>
          ))}
        </View>
        <View style={styles.globalStatsContainer}>
          <Text style={styles.globalStatsText}>
            Total Items: {globalStats.totalMenuItems}
          </Text>
          <Text style={styles.globalStatsText}>
            Overall Average: {formatPrice(globalStats.averageItemPrice)}
          </Text>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
        <View style={styles.emptyStateIcon} />
      <Text style={styles.emptyStateText}>No menu items found</Text>
      <Text style={styles.emptyStateSubtext}>
        {selectedCategory === 'all'
          ? 'Add your first menu item to get started'
          : `No items in the ${categories.find(c => c.key === selectedCategory)?.label} category`}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ===== CATEGORY FILTER BAR ===== */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        renderItem={renderCategoryButton}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryListContent}
      />
      
      {/* ===== MENU ITEMS LIST ===== */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        style={styles.menuList}
        contentContainerStyle={styles.menuListContent}
        ListEmptyComponent={renderEmptyState}
        ListHeaderComponent={menuItems.length > 0 ? renderAveragePricesCard : null}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
      {/* ===== GUEST FILTER BUTTON ===== */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => navigation.navigate('Filter')}
        activeOpacity={0.8}
      >
        <Text style={styles.filterButtonText}>🔍 Guest Filter</Text>
      </TouchableOpacity>
      
      {/* ===== ADD ITEM FAB ===== */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddItem')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define the styles for the MenuScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryList: {
    maxHeight: 60,
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryListContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.lightText,
    backgroundColor: Colors.white,
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryButtonText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.lightText,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: Colors.white,
  },
  menuList: {
    flex: 1,
  },
  menuListContent: {
    padding: 16,
  },
  separator: {
    height: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.lightText,
    marginBottom: 20,
    opacity: 0.2,
  },
  emptyStateText: {
    ...Typography.header,
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    ...Typography.body,
    fontSize: 14,
    color: Colors.lightText,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  averagePricesCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  averagePricesTitle: {
    ...Typography.header,
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  averagePricesList: {
    marginBottom: 12,
  },
  averagePriceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  averagePriceCategory: {
    ...Typography.body,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  averagePriceValue: {
    ...Typography.body,
    fontSize: 16,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  globalStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  globalStatsText: {
    ...Typography.body,
    fontSize: 13,
    color: Colors.lightText,
  },
  filterButton: {
    position: 'absolute',
    bottom: 25,
    left: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
  fabText: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default MenuScreen;