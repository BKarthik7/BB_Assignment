import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../utils/registrationUtils';

const SelectImage = () => {
  const navigation = useNavigation();
  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];
  const [image, setImage] = useState(images[0].image);

  useEffect(() => {
    getRegistrationProgress('Image').then(progressData => {
      if (progressData) {
        setImage(progressData.image || '');
      }
    });
  }, []);

  const saveImage = () => {
    if (image.trim() !== '') {
      saveRegistrationProgress('Image', {image});
    }
    navigation.navigate('PreFinal');
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Upload your Profile
          </Text>
          <Text style={{marginTop: 10, color: 'gray'}}>
            Choose a profile picture that best represents you! ❤️
          </Text>
        </View>
        <View style={{marginVertical: 25}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: 'green',
                borderWidth: 2,
                resizeMode: 'cover',
              }}
              source={{uri: image ? image : images[0].image}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 25,
              justifyContent: 'center',
            }}>
            {images?.map((item, index) => (
              <Pressable
                onPress={() => {
                  setImage(item.image);
                }}
                style={{margin: 10, gap: 10}}
                key={index}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    borderColor: image == item?.image ? 'green' : 'transparent',
                    borderWidth: 2,
                    resizeMode: 'contain',
                  }}
                  source={{uri: item.image}}
                />
              </Pressable>
            ))}
          </View>
          <Text
            style={{textAlign: 'center', color: 'gray', marginVertical: 20}}>
            OR
          </Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <View>
              <Text style={{fontSize: 16, color: 'gray'}}>
                Enter Image link
              </Text>

              <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="Image link"
                style={{
                  padding: 18,
                  borderColor: '#D0D0D0',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Pressable
        onPress={saveImage}
        style={{
          backgroundColor: '#07bc0c',
          marginTop: 'auto',
          marginBottom: 30,
          padding: 15,
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
          NEXT
        </Text>
      </Pressable>
    </>
  );
};

export default SelectImage;

const styles = StyleSheet.create({});