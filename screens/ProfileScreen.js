import React, {useContext, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'UserDatabase.db'});

const ProfileScreen = () => {
  const {userId, setToken} = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE id = ?',
          [userId],
          (tx, results) => {
            if (results.rows.length > 0) {
              setUser(results.rows.item(0));
            }
          },
          error => {
            console.log('Error fetching user data:', error);
          },
        );
      });
    }
  }, [userId]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <>
          <Image source={{uri: user.image}} style={styles.profileImage} />
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5F7',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 7,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
