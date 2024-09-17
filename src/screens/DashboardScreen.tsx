import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';
import { loadData } from '../utils/storage';
import { formatCurrency } from '../utils/formatters';
import { FinancialData, Transaction } from '../types';

const DashboardScreen = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    chequingBalance: 0,
    savingsBalance: 0,
    income: 0,
    expenses: 0,
    transactions: [],
  });
  const { colors } = useTheme();

  useEffect(() => {
    loadData().then(setFinancialData);
  }, []);

  const getMonthlyData = () => {
    const monthlyData = {
      income: Array(12).fill(0),
      expenses: Array(12).fill(0),
    };

    financialData.transactions.forEach((transaction: Transaction) => {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      if (transaction.amount > 0) {
        monthlyData.income[month] += transaction.amount;
      } else {
        monthlyData.expenses[month] += Math.abs(transaction.amount);
      }
    });

    return monthlyData;
  };

  const monthlyData = getMonthlyData();

  const monthlyChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: monthlyData.income,
        color: (opacity = 1) => colors.success,
        strokeWidth: 2,
      },
      {
        data: monthlyData.expenses,
        color: (opacity = 1) => colors.error,
        strokeWidth: 2,
      },
    ],
    legend: ['Income', 'Expenses'],
  };

  const getFinancialBreakdownData = () => {
    const { chequingBalance, savingsBalance } = financialData;
    const totalAssets = chequingBalance + savingsBalance;
    const debt = Math.max(0, -chequingBalance);
    const netWorth = totalAssets - debt;

    return [
      {
        name: 'Chequing',
        population: Math.max(0, chequingBalance),
        color: colors.chartColors[0],
        legendFontColor: colors.text,
      },
      {
        name: 'Savings',
        population: savingsBalance,
        color: colors.chartColors[1],
        legendFontColor: colors.text,
      },
      {
        name: 'Debt',
        population: debt,
        color: colors.chartColors[2],
        legendFontColor: colors.text,
      },
      {
        name: 'Net Worth',
        population: netWorth,
        color: colors.chartColors[3],
        legendFontColor: colors.text,
      },
    ];
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
      
      <View style={styles.cardContainer}>
        <Card style={styles.balanceCard}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Chequing Balance</Text>
          <Text style={[styles.balanceText, { color: colors.text }]}>
            {formatCurrency(financialData.chequingBalance)}
          </Text>
        </Card>
        <Card style={styles.balanceCard}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Savings Balance</Text>
          <Text style={[styles.balanceText, { color: colors.text }]}>
            {formatCurrency(financialData.savingsBalance)}
          </Text>
        </Card>
      </View>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Financial Overview</Text>
        <PieChart
          data={getFinancialBreakdownData()}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => colors.text,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Monthly Income vs Expenses</Text>
        <LineChart
          data={monthlyChartData}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: colors.cardBackground,
            backgroundGradientFrom: colors.cardBackground,
            backgroundGradientTo: colors.cardBackground,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.text,
            labelColor: (opacity = 1) => colors.text,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.primary
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </Card>
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceCard: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;