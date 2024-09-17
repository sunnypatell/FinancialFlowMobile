import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';

const TermsOfServiceScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Terms of Service</Text>
      <Card>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          1. Acceptance of Terms: By using FinancialFlow, you agree to these terms.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          2. Use of the App: You must use FinancialFlow in compliance with these terms and all applicable laws.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          3. Privacy: Your privacy is important to us. Please refer to our Privacy Policy.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          4. Intellectual Property: The app and its content are owned by FinancialFlow and protected by law.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          5. Termination: We may terminate or suspend your account for any reason, without notice.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          6. Disclaimer of Warranties: The app is provided "as is" without any warranties.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          7. Limitation of Liability: We are not liable for any indirect, incidental, or consequential damages.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          8. Changes to Terms: We may update these terms from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
        </Text>
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
  paragraph: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default TermsOfServiceScreen;