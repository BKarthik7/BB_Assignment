import React, {useState, useLayoutEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {openDatabase} from 'react-native-sqlite-storage';
import {AuthContext} from '../AuthContext';
import Ionicons from '@react-native-vector-icons/ionicons';

const db = openDatabase({name: 'UserDatabase.db'});

const GuestListScreen = () => {
  const {userId} = useContext(AuthContext);
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState('');

  useLayoutEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS guests(id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, name TEXT, rsvp INTEGER)',
        [],
      );
    });

    if (userId) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM guests WHERE userId = ?',
          [userId],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setGuests(temp);
          },
        );
      });
    }
  }, [userId]);

  const handleAddGuest = () => {
    if (guestName.trim() === '') {
      Alert.alert('Invalid Name', 'Guest name cannot be empty');
      return;
    }
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO guests (userId, name, rsvp) VALUES (?,?,?)',
        [userId, guestName, 0],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setGuests([
              ...guests,
              {id: results.insertId, userId: userId, name: guestName, rsvp: 0},
            ]);
            setGuestName('');
          }
        },
      );
    });
  };

  const toggleRsvp = id => {
    const guest = guests.find(g => g.id === id);
    if (guest) {
      const newRsvp = guest.rsvp ? 0 : 1;
      db.transaction(tx => {
        tx.executeSql(
          'UPDATE guests set rsvp = ? where id = ?',
          [newRsvp, id],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              setGuests(
                guests.map(g => (g.id === id ? {...g, rsvp: newRsvp} : g)),
              );
            }
          },
        );
      });
    }
  };

  const handleRemoveGuest = id => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM guests WHERE id = ?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            setGuests(guests.filter(g => g.id !== id));
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Guest List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new guest"
          placeholderTextColor={'gray'}
          color={'black'}
          value={guestName}
          onChangeText={setGuestName}
        />
        <Pressable onPress={handleAddGuest} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <ScrollView style={{width: '100%'}}>
        {guests.length === 0 ? (
          <Text style={styles.emptyText}>No guests added yet. Add a guest to get started!</Text>
        ) : (
          guests.map(guest => (
            <View key={guest.id} style={styles.guestItem}>
              <Text style={styles.guestName}>{guest.name}</Text>
              <View style={styles.rsvpContainer}>
                <Text>RSVP</Text>
                <Switch
                  value={Boolean(guest.rsvp)}
                  onValueChange={() => toggleRsvp(guest.id)}
                />
                <Pressable style={styles.removeButton} onPress={() => handleRemoveGuest(guest.id)}>
                  <Ionicons name="trash" size={20} color="white" />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
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
  guestItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  guestName: {
    fontSize: 16,
  },
  rsvpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 10,
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
});

export default GuestListScreen;
