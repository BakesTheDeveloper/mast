# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2025-11-04

### Code Quality & Optimization

- **Price Formatting Utility**: Created centralized `priceUtils.ts` for consistent price handling
  - `formatPrice()`: Formats prices with R currency symbol and proper cent rounding
  - `roundPrice()`: Rounds to 2 decimal places (cents)
  - `parsePrice()`: Parses input strings with validation and rounding
  - `isValidPrice()`: Validates price values
  - All prices throughout the app now consistently display with 2 decimal places

- **Code Optimization**: Significantly improved `menuCalculations.ts`
  - Removed redundant functions (`findMostExpensiveItems`, `calculateTotalPriceByCategory`, `formatPriceStatistics`)
  - Streamlined functions for better performance
  - Enhanced comments explaining loop types (FOR, WHILE, FOR...IN)
  - Integrated price rounding in all calculation functions

- **Consistent Color Usage**: Unified color scheme across all components
  - All hardcoded colors replaced with `Colors` constants
  - AddItemScreen now uses consistent color palette
  - Better visual harmony throughout the application

- **Enhanced Comments**: Added comprehensive inline documentation
  - Clear section headers (e.g., "STATE MANAGEMENT", "RENDER FUNCTIONS")
  - Improved JSDoc comments for all functions
  - Better code organization with visual separators

- **User-Friendly Improvements**:
  - Better placeholder text for price input ("Enter price (e.g., 12.50)")
  - Enhanced validation messages with clearer guidance
  - Improved button styling with shadows and elevation
  - More intuitive category labels displayed consistently

### Cleanup

- **Removed Useless Files**:
  - Deleted `POE_Part1_UI_Planning.txt` (outdated documentation)
  - Deleted `TYPESCRIPT_FEATURES_IMPLEMENTATION.md` (redundant with code comments)

### Technical Improvements

- **Centralized Utilities**: Better code organization with dedicated utility files
  - `priceUtils.ts`: All price-related functions
  - `menuCalculations.ts`: Streamlined calculation functions
  - Reduced code duplication across components

- **Better Error Handling**: More descriptive error messages throughout the app

- **Performance**: Optimized loops and calculations for better efficiency

## [2.0.0] - 2025-11-04

### Major Features Added

- **Average Price Display**: Home screen now displays average prices broken down by course
  - Implemented using FOR loops in `menuCalculations.ts`
  - Shows overall menu statistics including total items and average item price
  - Beautiful card UI component integrated into MenuScreen
  
- **Guest Filter Screen**: New dedicated screen for guests to filter menu by course
  - Separate page allowing guests to filter menu items by course
  - Real-time search functionality
  - Item count display for each course category
  - Read-only view optimized for guest experience
  - Accessible via "Guest Filter" button on main menu

- **Global Variables**: Implemented global variables for menu statistics tracking
  - `totalMenuItems`: Tracks total number of menu items
  - `totalMenuValue`: Tracks cumulative value of all menu items
  - `lastCalculationTime`: Records when statistics were last updated
  - `filterChangeCount`: Tracks filter changes in FilterScreen

### Code Improvements & Refactoring

- **TypeScript Loop Demonstrations**: Created `menuCalculations.ts` utility file showcasing:
  - **FOR loops**: Used in `calculateAveragePriceByCourse()` to iterate through menu items and calculate averages
  - **WHILE loops**: Used in `countItemsByCategory()` and `findMostExpensiveItems()` for item counting and filtering
  - **FOR...IN loops**: Used in `calculateTotalPriceByCategory()` and `getCategoryLabels()` to iterate through object properties
  
- **Function Organization**: Refactored code into multiple well-organized functions:
  - `calculateAveragePriceByCourse()`: Calculate price averages per category
  - `countItemsByCategory()`: Count items using while loop
  - `calculateTotalPriceByCategory()`: Sum prices using for...in loop
  - `findMostExpensiveItems()`: Find highest priced items per category
  - `updateGlobalStatistics()`: Update global tracking variables
  - `getGlobalStatistics()`: Retrieve current statistics
  - `getCategoryLabels()`: Get user-friendly category names
  - `searchMenuItems()`: Search functionality using while loop
  - `formatPriceStatistics()`: Format statistics for display

- **Multi-File Architecture**: Enhanced code organization across multiple files
  - `/src/utils/menuCalculations.ts`: All calculation and loop logic
  - `/src/screens/FilterScreen.tsx`: Guest filtering functionality
  - `/src/screens/MenuScreen.tsx`: Enhanced with average price display
  - Clear separation of concerns and improved maintainability

### UI/UX Enhancements

- **Average Price Card**: Added elegant card component showing:
  - Price breakdown by course (Appetizers, Mains, Desserts, Beverages)
  - Total item count across all categories
  - Overall average price calculation
  
- **Filter Screen UI**: Modern, user-friendly interface with:
  - Course filter buttons with item counts
  - Search bar for quick item lookup
  - Header showing filtered results count
  - Clean, card-based menu item display

- **Navigation Improvements**: Added Guest Filter button to main menu for easy access

### Documentation

- **Comprehensive JSDoc Comments**: All new functions include detailed documentation
  - Parameter descriptions
  - Return type information
  - Function purpose explanations
  - Loop type indicators for educational purposes

### Technical Requirements Met

- Use of FOR loops in TypeScript (demonstrated in multiple functions)  
- Use of WHILE loops in TypeScript (demonstrated in filtering and counting)  
- Use of FOR...IN loops in TypeScript (demonstrated in category operations)  
- Function definitions throughout the codebase  
- Global variables for state management  
- Functions to organize code effectively  
- Average price display by course on home screen  
- Separate screen for adding/removing menu items (AddItemScreen)  
- Home page displays complete menu  
- Menu items stored in arrays  
- Remove items functionality implemented  
- Separate filter page for guest course filtering  
- Multi-file refactoring with improved code organization

## [1.1.0] - 2025-01-27

### Fixed

- **Circular Dependency**: Resolved circular import dependency between App.tsx and components
- **Runtime Errors**: Fixed "Cannot read property 'white' of undefined" error
- **TypeScript Errors**: Fixed fontWeight type compatibility issues
- **React Native Compatibility**: Removed unsupported `gap` property from StyleSheet
- **Code Organization**: Moved Colors and Typography to dedicated constants file

### Improved

- **Architecture**: Created clean separation of concerns with dedicated constants file
- **Type Safety**: Enhanced TypeScript definitions with proper const assertions
- **Code Quality**: Improved component styling and spacing
- **Error Handling**: Better error handling throughout the application
- **Documentation**: Updated README with comprehensive setup and feature information

### Structure Changes

- **New File**: `src/constants/colors.ts` - Centralized color scheme and typography
- **Updated Imports**: All components now import from the new constants file
- **Clean Dependencies**: Eliminated circular dependencies for better maintainability

## [1.0.0] - 2025-10-19

### Added

- **Welcome Screen:** Created a new welcome screen with a modern and visually appealing design.
- **Changelog:** Added this changelog to track changes to the project.

### Changed

- **Navigation:**
    - The Welcome Screen is now the initial screen of the application.
    - The user can no longer navigate back to the Welcome Screen from the Menu Screen.
- **Menu Screen:**
    - Redesigned the user interface to be more modern and visually appealing.
    - The menu now automatically updates after adding or editing an item.
    - Removed the `+ Add Item` button from the header.
- **Add Item Screen:**
    - Redesigned the user interface to be more modern, user-friendly, and visually appealing.

### Fixed

- **Module Resolution:** Fixed a crash on startup caused by incorrect module resolution.
- **Menu Updates:** Fixed an issue where new items were not appearing on the menu after being added.
