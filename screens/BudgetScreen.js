import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';

const budgetCategories = [
  {name: 'Venue', percentage: 40},
  {name: 'Catering', percentage: 25},
  {name: 'Decor', percentage: 15},
  {name: 'Photography', percentage: 10},
  {name: 'Entertainment', percentage: 5},
  {name: 'Other', percentage: 5},
];

const BudgetScreen = () => {
  const [totalBudget, setTotalBudget] = useState('');

  const budget = parseFloat(totalBudget);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Budget Calculator</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Total Wedding Budget (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 1000000"
              placeholderTextColor={'gray'}
              color={'black'}
              keyboardType="numeric"
              value={totalBudget}
              onChangeText={setTotalBudget}
            />
          </View>

          {budget > 0 && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Budget Breakdown</Text>
              {budgetCategories.map(category => (
                <View key={category.name} style={styles.categoryContainer}>
                  <View style={styles.categoryTextContainer}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>
                      ₹{((budget * category.percentage) / 100).toLocaleString()}
                    </Text>
                  </View>
                  <Progress.Bar
                    progress={category.percentage / 100}
                    width={null}
                    height={10}
                    color={'#C5A653'}
                    unfilledColor={'#E8E8E8'}
                    borderWidth={0}
                    style={styles.progressBar}
                  />
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryAmount: {
    fontSize: 16,
    color: '#333',
  },
  progressBar: {
    borderRadius: 5,
  },
});

export default BudgetScreen;
