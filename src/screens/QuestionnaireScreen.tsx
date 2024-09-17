import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../hooks/useTheme';
import { saveData } from '../utils/storage';
import { validateNumber, validateName } from '../utils/validators';
import { FinancialData, UserData } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MainTabs: undefined;
};

type QuestionnaireScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const QuestionnaireScreen: React.FC = () => {
  const navigation = useNavigation<QuestionnaireScreenNavigationProp>();
  const { colors } = useTheme();
  const [userData, setUserData] = useState<UserData>({
    name: '',
    chequingBalance: '',
    savingsBalance: '',
    monthlyIncome: '',
    monthlyExpenses: '',
  });

  const handleSubmit = async () => {
    if (!validateName(userData.name)) {
      alert('Please enter a valid name');
      return;
    }

    if (
      !validateNumber(userData.chequingBalance) ||
      !validateNumber(userData.savingsBalance) ||
      !validateNumber(userData.monthlyIncome) ||
      !validateNumber(userData.monthlyExpenses)
    ) {
      alert('Please enter valid numbers for all financial fields');
      return;
    }

    const financialData: FinancialData = {
      userData: userData,
      transactions: [],
      goals: [],
    };

    await saveData(financialData);
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.navigate('MainTabs');
  };

  return (
    <LinearGradient colors={['#1F2937', '#111827']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.text }]}>Welcome to FinancialFlow</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>Let's get started with some basic information</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Your Name</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.text }]}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            placeholder="Enter your name"
            placeholderTextColor={colors.subtext}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Chequing Account Balance</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.text }]}
            value={userData.chequingBalance}
            onChangeText={(text) => setUserData({ ...userData, chequingBalance: text })}
            placeholder="Enter your chequing balance"
            placeholderTextColor={colors.subtext}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Savings Account Balance</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.text }]}
            value={userData.savingsBalance}
            onChangeText={(text) => setUserData({ ...userData, savingsBalance: text })}
            placeholder="Enter your savings balance"
            placeholderTextColor={colors.subtext}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Monthly Income</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.text }]}
            value={userData.monthlyIncome}
            onChangeText={(text) => setUserData({ ...userData, monthlyIncome: text })}
            placeholder="Enter your monthly income"
            placeholderTextColor={colors.subtext}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Monthly Expenses</Text>
          <TextInput
            style={[styles.input, { color: colors.text, borderColor: colors.text }]}
            value={userData.monthlyExpenses}
            onChangeText={(text) => setUserData({ ...userData, monthlyExpenses: text })}
            placeholder="Enter your monthly expenses"
            placeholderTextColor={colors.subtext}
            keyboardType="numeric"
          />
        </View>

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default QuestionnaireScreen;