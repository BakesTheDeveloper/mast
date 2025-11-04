/**
 * @file WelcomeScreen.tsx
 * @description This screen is the first screen the user sees. It provides a brief introduction to the app and a button to get started.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Colors, Typography } from '../constants/colors';
import { NavigationProps } from '../types';

/**
 * @function WelcomeScreen
 * @description The welcome screen component.
 * @param {NavigationProps} { navigation } - The navigation object from React Navigation.
 * @returns {React.JSX.Element} The rendered component.
 */
const WelcomeScreen: React.FC<NavigationProps> = ({ navigation }) => {
  return (
    // Use SafeAreaView to avoid rendering content under the status bar
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>C</Text>
          </View>
        </View>
        {/* App title */}
        <Text style={styles.title}>Welcome to Christoffel</Text>
        {/* App subtitle */}
        <Text style={styles.subtitle}>Your ultimate menu solution</Text>
        {/* Button to navigate to the Menu screen */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.dispatch(StackActions.replace('Menu'))} // Replace the WelcomeScreen with the MenuScreen in the stack
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Define the styles for the WelcomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: Colors.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: {
    ...Typography.header,
    color: Colors.white,
    fontSize: 48,
  },
  title: {
    ...Typography.header,
    fontSize: 36,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 18,
    color: Colors.lightText,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    ...Typography.body,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
