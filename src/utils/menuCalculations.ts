/**
 * @file menuCalculations.ts
 * @description Efficient utility functions for menu calculations and statistics
 * Demonstrates TypeScript loop types: FOR, WHILE, and FOR...IN loops
 */

import { MenuItem } from '../types';
import { roundPrice } from './priceUtils';

// ========================================
// GLOBAL VARIABLES - Menu Statistics Cache
// ========================================
let totalMenuItems: number = 0;
let totalMenuValue: number = 0;
let lastCalculationTime: Date | null = null;

// ========================================
// CORE CALCULATION FUNCTIONS
// ========================================

/**
 * Calculate average prices for each course (demonstrates FOR LOOP)
 * Efficiently processes all items in a single pass with proper cent rounding
 * @param items - Array of menu items
 * @returns Object mapping category to average price (rounded to 2 decimals)
 */
export function calculateAveragePriceByCourse(items: MenuItem[]): Record<string, number> {
  const categoryTotals: Record<string, { sum: number; count: number }> = {};
  
  // FOR LOOP: Single-pass accumulation of totals and counts
  for (let i = 0; i < items.length; i++) {
    const { category, price = 0 } = items[i];
    
    if (!categoryTotals[category]) {
      categoryTotals[category] = { sum: 0, count: 0 };
    }
    
    categoryTotals[category].sum += price;
    categoryTotals[category].count++;
  }
  
  // FOR...IN LOOP: Calculate and round averages
  const averages: Record<string, number> = {};
  
  for (const category in categoryTotals) {
    if (categoryTotals.hasOwnProperty(category)) {
      const { sum, count } = categoryTotals[category];
      // Round to 2 decimal places for cents
      averages[category] = count > 0 ? roundPrice(sum / count) : 0;
    }
  }
  
  return averages;
}

/**
 * Search menu items by name or description (demonstrates WHILE LOOP)
 * Case-insensitive search across item names and descriptions
 * @param items - Array of menu items to search
 * @param searchTerm - Search query string
 * @returns Filtered array of matching items
 */
export function searchMenuItems(items: MenuItem[], searchTerm: string): MenuItem[] {
  if (!searchTerm.trim()) {
    return items; // Return all items if search term is empty
  }
  
  const results: MenuItem[] = [];
  const lowerSearchTerm = searchTerm.toLowerCase().trim();
  let index = 0;
  
  // WHILE LOOP: Efficient search through items
  while (index < items.length) {
    const item = items[index];
    const nameMatch = item.name.toLowerCase().includes(lowerSearchTerm);
    const descMatch = item.description?.toLowerCase().includes(lowerSearchTerm);
    
    if (nameMatch || descMatch) {
      results.push(item);
    }
    
    index++;
  }
  
  return results;
}

/**
 * Get user-friendly category labels (demonstrates FOR...IN LOOP)
 * @returns Object mapping category keys to display labels
 */
export function getCategoryLabels(): Record<string, string> {
  // Category display mapping
  const categoryMap = {
    'appetizers': 'Appetizers',
    'mains': 'Main Courses',
    'desserts': 'Desserts',
    'beverages': 'Beverages',
  };
  
  const labels: Record<string, string> = {};
  
  // FOR...IN LOOP: Create labels object
  for (const key in categoryMap) {
    if (categoryMap.hasOwnProperty(key)) {
      labels[key] = categoryMap[key as keyof typeof categoryMap];
    }
  }
  
  return labels;
}

// ========================================
// GLOBAL STATISTICS MANAGEMENT
// ========================================

/**
 * Update global menu statistics (demonstrates FOR LOOP)
 * Calculates totals and caches them in global variables
 * @param items - Array of menu items
 */
export function updateGlobalStatistics(items: MenuItem[]): void {
  totalMenuItems = items.length;
  totalMenuValue = 0;
  
  // FOR LOOP: Calculate total value
  for (let i = 0; i < items.length; i++) {
    totalMenuValue += items[i].price || 0;
  }
  
  // Round total value to cents
  totalMenuValue = roundPrice(totalMenuValue);
  lastCalculationTime = new Date();
}

/**
 * Get current global statistics with calculated averages
 * @returns Object containing menu statistics with rounded values
 */
export function getGlobalStatistics() {
  const averageItemPrice = totalMenuItems > 0 
    ? roundPrice(totalMenuValue / totalMenuItems) 
    : 0;
    
  return {
    totalMenuItems,
    totalMenuValue: roundPrice(totalMenuValue),
    lastCalculationTime,
    averageItemPrice,
  };
}
