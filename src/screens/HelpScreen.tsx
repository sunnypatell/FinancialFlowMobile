import React from 'react';
import { ScrollView, Text, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';
import Button from '../components/Button';

const HelpScreen = () => {
  const { colors } = useTheme();

  const faqs = [
    {
      question: 'How do I add a new transaction?',
      answer: 'Go to the Transactions tab and fill in the transaction details at the top of the screen. Then tap "Add Transaction".',
    },
    {
      question: 'How do I set a financial goal?',
      answer: 'Navigate to the Goals screen. Enter the goal details and tap "Add Goal".',
    },
    {
      question: 'Can I export my financial data?',
      answer: 'Yes, you can export your data from the Settings screen. Tap on "Export Data" and choose where to save the exported file.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, your data is stored locally on your device and is not transmitted to our servers. Always ensure your device is secured with a passcode or biometric lock.',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Help & Support</Text>
      
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <Card key={index} style={styles.faqItem}>
            <Text style={[styles.question, { color: colors.text }]}>{faq.question}</Text>
            <Text style={[styles.answer, { color: colors.subtext }]}>{faq.answer}</Text>
          </Card>
        ))}
      </Card>

      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Contact Us</Text>
        <Button
          title="Email Support"
          onPress={() => Linking.openURL('mailto:support@financialflow.com')}
        />
        <Button
          title="Call Support"
          onPress={() => Linking.openURL('tel:+1234567890')}
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  faqItem: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  answer: {
    fontSize: 14,
  },
});

export default HelpScreen;