import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {openDatabase} from 'react-native-sqlite-storage';
import {sign} from 'react-native-pure-jwt';

import {AuthContext, JWT_SECRET_KEY} from '../context/AuthContext';
import {getRegistrationProgress} from '../utils/registrationUtils';

const db = openDatabase({name: 'UserDatabase.db'});

const PreFinalScreen = () => {
  const {token, setToken} = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const navigation = useNavigation();

  const getAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      let userData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData};
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const registerUser = async () => {
    if (!userData) {
      console.log('User data is not available');
      return;
    }
    try {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (email, password, firstName, lastName, image) VALUES (?,?,?,?,?)',
          [
            userData.email,
            userData.password,
            userData.firstName,
            userData.lastName,
            userData.image,
          ],
          async (tx, results) => {
            if (results.rowsAffected > 0) {
              const newUserId = results.insertId;
              console.log('User registered successfully with ID:', newUserId);

              const generatedToken = await sign(
                {userId: newUserId, iat: new Date().getTime()},
                JWT_SECRET_KEY,
                {
                  alg: 'HS256',
                },
              );

              await AsyncStorage.setItem('token', generatedToken);
              setToken(generatedToken);
              clearAllScreenData();
            } else {
              console.log('Registration failed');
            }
          },
          error => {
            console.log('Error inserting user:', error);
          },
          
        );
      });
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  const clearAllScreenData = async () => {
    try {
      const screens = ['Register', 'Password', 'Name', 'Image'];
      for (const screenName of screens) {
        await AsyncStorage.removeItem(`registration_progress_${screenName}`);
      }
      console.log('All screen data cleared');
    } catch (error) {
      console.log('Error clearing screen data:', error);
    }
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255), password VARCHAR(255), firstName VARCHAR(255), lastName VARCHAR(255), image TEXT)',
        [],
      );
    });
    getAllScreenData();
  }, []);

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          All set to register
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginTop: 10,
          }}>
          Setting up your profile for you
        </Text>
      </View>

      <Pressable
        onPress={registerUser}
        style={{
          backgroundColor: '#03C03C',
          padding: 15,
          marginTop: 'auto',
          marginBottom: 20,
          marginHorizontal: 20,
          borderRadius: 10,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finish Registering
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});