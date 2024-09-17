// src/screens/SettingsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '../hooks/useTheme';
import { saveData, loadData } from '../utils/storage';
import { validateNumber, validateName } from '../utils/validators';
import { FinancialData, UserData } from '../types';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark, setColorScheme } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    chequingBalance: '',
    savingsBalance: '',
    monthlyIncome: '',
    monthlyExpenses: '',
  });

  useEffect(() => {
    loadData().then(data => {
      setUserData(data.userData);
    });
  }, []);

  const handleSave = async () => {
    if (!validateName(userData.name)) {
      Alert.alert('Error', 'Please enter a valid name');
      return;
    }

    if (!validateNumber(userData.chequingBalance) ||
        !validateNumber(userData.savingsBalance) ||
        !validateNumber(userData.monthlyIncome) ||
        !validateNumber(userData.monthlyExpenses)) {
      Alert.alert('Error', 'Please enter valid numbers for all financial fields');
      return;
    }

    const data: FinancialData = {
      userData: userData,
      transactions: [],
      goals: [],
    };

    await saveData(data);
    Alert.alert('Success', 'Settings saved successfully');
  };

  const exportData = async () => {
    try {
      const data = await loadData();
      const fileUri = `${FileSystem.documentDirectory}financial_flow_data.json`;
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.error('Error exporting data:', error);
      Alert.alert('Error', 'Failed to export data');
    }
  };

  const importData = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });
      if (result.assets && result.assets.length > 0) {
        const fileContent = await FileSystem.readAsStringAsync(result.assets[0].uri);
        const parsedData: FinancialData = JSON.parse(fileContent);
        await saveData(parsedData);
        Alert.alert('Success', 'Data imported successfully');
        setUserData(parsedData.userData);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      Alert.alert('Error', 'Failed to import data');
    }
  };

  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setUserData({
                name: '',
                chequingBalance: '',
                savingsBalance: '',
                monthlyIncome: '',
                monthlyExpenses: '',
              });
              Alert.alert('Success', 'All data has been cleared');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Name</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Enter your name"
          placeholderTextColor={colors.subtext}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Chequing Balance</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          value={userData.chequingBalance}
          onChangeText={(text) => setUserData({ ...userData, chequingBalance: text })}
          keyboardType="numeric"
          placeholder="Enter chequing balance"
          placeholderTextColor={colors.subtext}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Savings Balance</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          value={userData.savingsBalance}
          onChangeText={(text) => setUserData({ ...userData, savingsBalance: text })}
          keyboardType="numeric"
          placeholder="Enter savings balance"
          placeholderTextColor={colors.subtext}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Monthly Income</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          value={userData.monthlyIncome}
          onChangeText={(text) => setUserData({ ...userData, monthlyIncome: text })}
          keyboardType="numeric"
          placeholder="Enter monthly income"
          placeholderTextColor={colors.subtext}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>Monthly Expenses</Text>
        <TextInput
          style={[styles.input, { color: colors.text, borderColor: colors.text }]}
          value={userData.monthlyExpenses}
          onChangeText={(text) => setUserData({ ...userData, monthlyExpenses: text })}
          keyboardType="numeric"
          placeholder="Enter monthly expenses"
          placeholderTextColor={colors.subtext}
        />
      </View>

      <Button title="Save Settings" onPress={handleSave} />
      <View style={styles.spacer} />
      <Button title="Export Data" onPress={exportData} />
      <View style={styles.spacer} />
      <Button title="Import Data" onPress={importData} />
      <View style={styles.spacer} />
      <Button title="Clear All Data" onPress={clearAllData} color="red" />
      <View style={styles.spacer} />
      <Button
        title="Toggle Dark Mode"
        onPress={() => setColorScheme(isDark ? 'light' : 'dark')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  spacer: {
    height: 16,
  },
});

export default SettingsScreen;