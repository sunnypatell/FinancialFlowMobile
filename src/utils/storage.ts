import AsyncStorage from '@react-native-async-storage/async-storage';
import { FinancialData } from '../types';

// Rest of the code...`

const STORAGE_KEY = 'FINANCIAL_FLOW_DATA';

export const saveData = async (data: Partial<FinancialData>): Promise<void> => {
  try {
    const existingData = await loadData();
    const updatedData = { ...existingData, ...data };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadData = async (): Promise<FinancialData> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {
      userData: {
        name: '',
        chequingBalance: '0',
        savingsBalance: '0',
        monthlyIncome: '0',
        monthlyExpenses: '0',
      },
      transactions: [],
      goals: [],
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      userData: {
        name: '',
        chequingBalance: '0',
        savingsBalance: '0',
        monthlyIncome: '0',
        monthlyExpenses: '0',
      },
      transactions: [],
      goals: [],
    };
  }
};