import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const next = () => {
    if (email.trim() !== '') {
      saveRegistrationProgress('Register', {email});
    }
    navigation.navigate('Password');
  };

  useEffect(() => {
    getRegistrationProgress('Register').then(progressData => {
      if (progressData) {
        setEmail(progressData.email || '');
      }
    });
  }, []);

  return (
    <SafeAreaView style={{}}>
      <View style={{padding: 13}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          You're Almost There
        </Text>

        <View style={{flexDirection: 'column', gap: 16, marginVertical: 40}}>
          <Text>Enter Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='admin@gmail.com'
            placeholderTextColor={'gray'}
            color={'black'}
            style={{
              padding: 20,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              borderRadius: 10,
              color: 'black',
            }}
          />
          <Pressable
            onPress={next}
            style={{
              padding: 15,
              backgroundColor: email?.length > 4 ? '#2dcf30' : '#E0E0E0',
              borderRadius: 8,
            }}>
            <Text style={{textAlign: 'center'}}>Next</Text>
          </Pressable>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{textAlign: 'center', fontWeight: '500', fontSize: 15}}>
              I agree to recieve updates over Whatsapp.
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: 'gray',
                marginTop: 20,
              }}>
              By Signing up, you agree to the terms of service and privacy
              policy.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});