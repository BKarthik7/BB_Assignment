import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {sign} from 'react-native-pure-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext, JWT_SECRET_KEY} from '../AuthContext';

const db = openDatabase({name: 'UserDatabase.db'});

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {token, setToken} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (token) {
      navigation.replace('MainStack', {screen: 'Main'});
    }
  }, [token, navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Invalid Details', 'Please fill all the details');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        async (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            console.log('User found:', user);

            const generatedToken = await sign(
              {userId: user.id, iat: new Date().getTime()},
              JWT_SECRET_KEY,
              {
                alg: 'HS256',
              },
            );

            await AsyncStorage.setItem('token', generatedToken);
            setToken(generatedToken);
          } else {
            Alert.alert('Login Failed', 'Invalid email or password');
          }
        },
        error => {
          console.log('Error during login:', error);
          Alert.alert('Error', 'An error occurred during login.');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{marginTop: 100}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#007FFF'}}>
          PerfectPromise App
        </Text>
      </View>

      <View style={{marginTop: 50, width: '80%'}}>
        <View>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={'gray'}
            color={'black'}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={'gray'}
            color={'black'}
            secureTextEntry
          />
        </View>

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 15}}>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '100%',
    fontSize: 16,
  },
  loginButton: {
    width: 200,
    backgroundColor: '#007FFF',
    padding: 15,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});