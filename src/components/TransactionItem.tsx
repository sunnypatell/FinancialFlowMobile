import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { formatCurrency } from '../utils/formatters';

interface TransactionItemProps {
  description: string;
  amount: number;
  date: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ description, amount, date }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={[styles.description, { color: colors.text }]}>{description}</Text>
        <Text style={[styles.date, { color: colors.subtext }]}>{date}</Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: amount >= 0 ? colors.success : colors.error },
        ]}
      >
        {formatCurrency(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  leftContent: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransactionItem;