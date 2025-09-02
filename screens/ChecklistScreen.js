import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import {openDatabase} from 'react-native-sqlite-storage';
import {AuthContext} from '../AuthContext';

const db = openDatabase({name: 'UserDatabase.db'});

const ChecklistScreen = () => {
  const {userId} = useContext(AuthContext);
  const [checklist, setChecklist] = useState([]);
  const [task, setTask] = useState('');

  // Create table and load checklist
  useLayoutEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS checklist(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, task TEXT, completed INTEGER)',
        [],
      );
    });

    if (userId) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM checklist WHERE userId = ?',
          [userId],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setChecklist(temp);
          },
        );
      });
    }
  }, [userId]);

  const toggleChecklistItem = id => {
    const item = checklist.find(i => i.id === id);
    if (item) {
      const newCompleted = item.completed ? 0 : 1;
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE checklist set completed = ? where id = ?',
          [newCompleted, id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setChecklist(
                checklist.map(i =>
                  i.id === id ? {...i, completed: newCompleted} : i,
                ),
              );
            }
          },
        );
      });
    }
  };

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Invalid Task', 'Task cannot be empty');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO checklist (userId, task, completed) VALUES (?,?,?)',
        [userId, task, 0],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setChecklist([
              ...checklist,
              {
                id: results.insertId,
                userId: userId,
                task: task,
                completed: 0,
              },
            ]);
            setTask('');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wedding Checklist</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor={'gray'}
          value={task}
          onChangeText={setTask}
          color={'black'}
        />
        <Pressable onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <ScrollView style={{width: '100%'}}>
        {checklist.length === 0 ? (
          <Text style={styles.emptyText}>Your checklist is empty. Add a task to get started!</Text>
        ) : (
          <View style={styles.section}>
            <View style={styles.card}>
              {checklist.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => toggleChecklistItem(item.id)}
                  style={styles.checklistItem}>
                  <Ionicons
                    name={item.completed ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={item.completed ? '#C5A653' : '#333'}
                  />
                  <Text
                    style={[
                      styles.checklistText,
                      item.completed && styles.completedText,
                    ]}>
                    {item.task}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#C5A653',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  section: {
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checklistText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
});

export default ChecklistScreen;
