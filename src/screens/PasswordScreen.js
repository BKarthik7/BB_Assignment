import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import FontAwesome from '@react-native-vector-icons/fontawesome';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import {useNavigation} from '@react-navigation/native';

import {saveRegistrationProgress} from '../utils/registrationUtils';

const PasswordScreen = () => {
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const handleNext = () => {
    if (password.trim() !== '') {
      saveRegistrationProgress('Password', {password});
    }
    navigation.navigate('Name');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderWidth: 2,
              borderColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name="lock" size={24} color="green" />
          </View>

          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Please choose a password
        </Text>
        <TextInput
          autoFocus={true}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor={'grey'}
          color={'black'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 25,
            borderBlockColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontSize: 22,
            fontFamily: 'GeezaPro-Bold',
            color: 'black',
          }}
        />
        <Text style={{color: 'grey', fontSize: 15, marginTop: 7}}>
          Note: Your details will be safe with us.
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            style={{alignSelf: 'center', marginTop: 20}}
            name="arrow-right-circle"
            size={45}
            color="green"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({});