/**
 * @file priceUtils.ts
 * @description Utility functions for price formatting and calculations
 * Ensures consistent price handling throughout the application with proper cent rounding
 */

/**
 * Format a price value to display with proper currency symbol and cent rounding
 * @param price - The price to format (can be undefined)
 * @returns Formatted price string with R currency symbol (e.g., "R12.50")
 */
export const formatPrice = (price: number | undefined): string => {
  if (price === undefined || price === null || isNaN(price)) {
    return 'R0.00';
  }
  // Round to 2 decimal places for cents
  return `R${price.toFixed(2)}`;
};

/**
 * Round a price value to 2 decimal places (cents)
 * @param price - The price to round
 * @returns Price rounded to 2 decimal places
 */
export const roundPrice = (price: number): number => {
  return Math.round(price * 100) / 100;
};

/**
 * Parse a price input string to a number with proper rounding
 * @param priceString - The price string to parse
 * @returns Parsed and rounded price, or 0 if invalid
 */
export const parsePrice = (priceString: string): number => {
  const parsed = parseFloat(priceString);
  if (isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return roundPrice(parsed);
};

/**
 * Validate if a price is valid (positive number)
 * @param price - The price to validate
 * @returns True if valid, false otherwise
 */
export const isValidPrice = (price: number | undefined): boolean => {
  return price !== undefined && price !== null && !isNaN(price) && price >= 0;
};
