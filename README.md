# Christoffel's Private Chef Menu App 🍽️

A modern, professional mobile application for managing menu items for private chef services. Built with React Native and Expo for cross-platform compatibility with a focus on clean architecture and user experience.

## ✨ Features

- **Menu Management**: Add, edit, and delete menu items with intuitive interface
- **Category Filtering**: Organize items by Appetizers, Main Courses, Desserts, and Beverages
- **Local Storage**: All menu data is stored locally on the device using AsyncStorage
- **Modern Design**: Clean, professional interface with consistent color scheme and typography
- **Cross-Platform**: Works seamlessly on both iOS and Android devices
- **TypeScript**: Fully typed for better development experience and fewer runtime errors
- **Responsive UI**: Optimized for different screen sizes and orientations

## 📋 Menu Item Fields

- **Name** (required) - The dish name
- **Category** (required) - Appetizers, Main Courses, Desserts, or Beverages
- **Description** (optional) - Detailed description of the dish
- **Price** (required) - Price in dollars

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device (optional)

### Installation

1. **Clone the repository** (if not already done)
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run the app:**
   - **Mobile**: Use Expo Go app to scan the QR code
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Web Browser**: Press `w` in the terminal

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
│   └── MenuItem.tsx    # Individual menu item display
├── screens/            # Main app screens
│   ├── WelcomeScreen.tsx    # Welcome/intro screen
│   ├── MenuScreen.tsx       # Main menu listing
│   └── AddItemScreen.tsx    # Add/edit menu items
├── constants/          # App constants and themes
│   └── colors.ts      # Color scheme and typography
├── types/             # TypeScript type definitions
│   └── index.ts       # App-wide type definitions
└── utils/             # Utility functions
    └── storage.ts     # Local storage management
```

## 🛠️ Technologies Used

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Local data persistence
- **React Hooks** - State management and side effects

## 👨‍🍳 For Christoffel

This app empowers you to:

- **📝 Quick Menu Updates**: Instantly update your menu for different dining experiences
- **🗂️ Organized Categories**: Keep appetizers, mains, desserts, and beverages perfectly organized
- **💰 Price Management**: Set and update prices with ease
- **📱 Professional Interface**: Maintain a clean, modern interface that reflects your culinary expertise
- **💾 Reliable Storage**: All your menu data is safely stored locally on your device
- **⚡ Instant Access**: No internet required - your menu is always available

The app is designed to be simple, efficient, and professional, allowing you to focus on what you do best - creating exceptional culinary experiences for your clients.

## 🔧 Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

### Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting for consistent style
- **Clean Architecture**: Separated concerns with proper file organization
- **Error Handling**: Comprehensive error handling and user feedback


# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-01-27

### 🔧 Fixed

- **Circular Dependency**: Resolved circular import dependency between App.tsx and components
- **Runtime Errors**: Fixed "Cannot read property 'white' of undefined" error
- **TypeScript Errors**: Fixed fontWeight type compatibility issues
- **React Native Compatibility**: Removed unsupported `gap` property from StyleSheet
- **Code Organization**: Moved Colors and Typography to dedicated constants file

### 🏗️ Improved

- **Architecture**: Created clean separation of concerns with dedicated constants file
- **Type Safety**: Enhanced TypeScript definitions with proper const assertions
- **Code Quality**: Improved component styling and spacing
- **Error Handling**: Better error handling throughout the application
- **Documentation**: Updated README with comprehensive setup and feature information

### 📁 Structure Changes

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


youtube video link: https://youtu.be/EZ9xQPNzKkw
