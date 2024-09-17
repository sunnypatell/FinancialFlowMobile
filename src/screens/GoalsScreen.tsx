import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { loadData, saveData } from '../utils/storage';
import { formatCurrency } from '../utils/formatters';
import { validateNumber } from '../utils/validators';
import { Goal } from '../types';

const GoalsScreen = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({ name: '', target: 0, current: 0, deadline: '' });
  const { colors } = useTheme();

  useEffect(() => {
    loadData().then(data => setGoals(data.goals || []));
  }, []);

  const addGoal = () => {
    if (newGoal.name && validateNumber(newGoal.target.toString()) && validateNumber(newGoal.current.toString()) && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now(),
        ...newGoal,
      };
      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      saveData({ goals: updatedGoals });
      setNewGoal({ name: '', target: 0, current: 0, deadline: '' });
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Financial Goals</Text>
      
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Add New Goal</Text>
        <Input
          placeholder="Goal Name"
          value={newGoal.name}
          onChangeText={(text) => setNewGoal({ ...newGoal, name: text })}
        />
        <Input
          placeholder="Target Amount"
          keyboardType="numeric"
          value={newGoal.target.toString()}
          onChangeText={(text) => setNewGoal({ ...newGoal, target: parseFloat(text) || 0 })}
        />
        <Input
          placeholder="Current Amount"
          keyboardType="numeric"
          value={newGoal.current.toString()}
          onChangeText={(text) => setNewGoal({ ...newGoal, current: parseFloat(text) || 0 })}
        />
        <Input
          placeholder="Deadline (YYYY-MM-DD)"
          value={newGoal.deadline}
          onChangeText={(text) => setNewGoal({ ...newGoal, deadline: text })}
        />
        <Button title="Add Goal" onPress={addGoal} />
      </Card>

      {goals.map((goal) => (
        <Card key={goal.id}>
          <Text style={[styles.goalTitle, { color: colors.text }]}>{goal.name}</Text>
          <Text style={[styles.goalText, { color: colors.text }]}>
            Target: {formatCurrency(goal.target)}
          </Text>
          <Text style={[styles.goalText, { color: colors.text }]}>
            Current: {formatCurrency(goal.current)}
          </Text>
          <Text style={[styles.goalText, { color: colors.text }]}>Deadline: {goal.deadline}</Text>
          <ProgressBar progress={goal.current / goal.target} />
          <Text style={[styles.progressText, { color: colors.text }]}>
            {((goal.current / goal.target) * 100).toFixed(1)}%
          </Text>
        </Card>
      ))}
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
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  goalText: {
    fontSize: 14,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
});

export default GoalsScreen;