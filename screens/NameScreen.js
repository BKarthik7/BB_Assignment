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

import Ionicons from '@react-native-vector-icons/ionicons';

import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const NameScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();

  const saveName = () => {
    if (firstName.trim() !== '') {
      saveRegistrationProgress('Name', {firstName, lastName});
    }
    navigation.navigate('Image');
  };

  useEffect(() => {
    getRegistrationProgress('Name').then(progressData => {
      if (progressData) {
        setFirstName(progressData.firstName || '');
        setLastName(progressData.lastName || '');
      }
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Complete your Profile
          </Text>
          <Text style={{marginTop: 10, color: 'gray'}}>
            What would you like your mates to call you? ❤️
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: 10,
            marginVertical: 25,
            gap: 20,
            flexDirection: 'column',
          }}>
          <View>
            <Text style={{fontSize: 16, color: 'gray'}}>First Name *</Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholderTextColor={'gray'}
              color={'black'}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>
          <View>
            <Text style={{fontSize: 16, color: 'gray'}}>Last Name *</Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholderTextColor={'gray'}
              color={'black'}
              style={{
                padding: 10,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <Pressable
        onPress={saveName}
        style={{
          backgroundColor: '#07BC0C',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 12,
          marginHorizontal: 10,
          borderRadius: 4,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: '500',
          }}>
          Next
        </Text>
      </Pressable>
    </>
  );
};

export default NameScreen;

const styles = StyleSheet.create({});