// src/types.ts

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  account: 'chequing' | 'savings';
}

export interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
}

export interface UserData {
  name: string;
  chequingBalance: string;
  savingsBalance: string;
  monthlyIncome: string;
  monthlyExpenses: string;
}

export interface FinancialData {
  userData: UserData;
  transactions: Transaction[];
  goals: Goal[];
}