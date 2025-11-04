# Christoffel's Private Chef Menu App

A modern, professional mobile application for managing menu items for private chef services. Built with React Native and Expo for cross-platform compatibility with a focus on clean architecture and user experience.

## Features

- **Menu Management**: Add, edit, and delete menu items with intuitive interface
- **Average Price Analytics**: View average prices broken down by course (Appetizers, Mains, Desserts, Beverages)
- **Guest Filter Screen**: Dedicated screen for guests to filter and browse menu by course with search functionality
- **Category Filtering**: Organize items by Appetizers, Main Courses, Desserts, and Beverages
- **Real-time Statistics**: Track total menu items, overall average price, and menu value
- **Local Storage**: All menu data is stored locally on the device using AsyncStorage
- **Modern Design**: Clean, professional interface with consistent color scheme and typography
- **Cross-Platform**: Works seamlessly on both iOS and Android devices
- **TypeScript**: Fully typed for better development experience and fewer runtime errors
- **Responsive UI**: Optimized for different screen sizes and orientations

## Menu Item Fields

- **Name** (required) - The dish name
- **Category** (required) - Appetizers, Main Courses, Desserts, or Beverages
- **Description** (optional) - Detailed description of the dish
- **Price** (required) - Price in dollars

## Getting Started

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

## App Structure

```
src/
├── components/          # Reusable UI components
│   └── MenuItem.tsx    # Individual menu item display
├── screens/            # Main app screens
│   ├── WelcomeScreen.tsx    # Welcome/intro screen
│   ├── MenuScreen.tsx       # Main menu listing with analytics
│   ├── AddItemScreen.tsx    # Add/edit menu items
│   └── FilterScreen.tsx     # Guest filtering interface
├── constants/          # App constants and themes
│   └── colors.ts      # Color scheme and typography
├── types/             # TypeScript type definitions
│   └── index.ts       # App-wide type definitions
└── utils/             # Utility functions
    ├── storage.ts     # Local storage management
    └── menuCalculations.ts  # Price calculations and analytics
```

## Technologies Used

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript with strict mode
- **Expo** - Development platform and tools
- **React Navigation** - Navigation between screens
- **AsyncStorage** - Local data persistence
- **React Hooks** - State management and side effects

## Code Quality Features

- **Centralized Price Formatting**: All prices rounded to 2 decimal places (cents)
- **Consistent Color Scheme**: Unified design system using `Colors` constants
- **Comprehensive Comments**: Well-documented code with section headers
- **Optimized Functions**: Efficient implementations with no redundant code
- **Type Safety**: Full TypeScript coverage with proper type definitions
- **Clean Architecture**: Separated utilities, components, and screens

## For Christoffel

This app empowers you to:

- **Quick Menu Updates**: Instantly update your menu for different dining experiences
- **Organized Categories**: Keep appetizers, mains, desserts, and beverages perfectly organized
- **Price Management**: Set and update prices with ease
- **Price Analytics**: View average prices by course to optimize menu pricing strategy
- **Guest Experience**: Dedicated filter screen allows guests to easily browse menu by course
- **Professional Interface**: Maintain a clean, modern interface that reflects your culinary expertise
- **Reliable Storage**: All your menu data is safely stored locally on your device
- **Instant Access**: No internet required - your menu is always available

The app is designed to be simple, efficient, and professional, allowing you to focus on what you do best - creating exceptional culinary experiences for your clients.

## Development

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
