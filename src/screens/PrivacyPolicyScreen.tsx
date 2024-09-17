import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';

const PrivacyPolicyScreen = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
      <Card>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          1. Information We Collect: We collect information you provide directly to us when you use the app.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          2. How We Use Your Information: We use the information to operate and improve our app.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          3. Data Storage: Your data is stored locally on your device.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          4. Data Security: We implement measures to protect your personal information.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          5. Third-Party Services: We do not share your information with third parties.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          6. Children's Privacy: Our app is not intended for children under 13.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          7. Changes to This Privacy Policy: We may update our Privacy Policy from time to time.
        </Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>
          8. Contact Us: If you have any questions about this Privacy Policy, please contact us.
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

export default PrivacyPolicyScreen;