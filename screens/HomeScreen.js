import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import {AuthContext} from '../AuthContext';
import {openDatabase} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setToken} = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const venues = [
    {
      id: '1',
      name: 'The Grand Palace',
      location: 'Mumbai, MH',
      price: '₹5,00,000 - ₹10,00,000',
      capacity: 500,
      image:
        'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '2',
      name: 'Lakeview Gardens',
      location: 'Udaipur, RJ',
      price: '₹8,00,000 - ₹15,00,000',
      capacity: 300,
      image:
        'https://images.pexels.com/photos/2253832/pexels-photo-2253832.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: '3',
      name: 'Royal Orchid',
      location: 'Bengaluru, KA',
      price: '₹3,00,000 - ₹7,00,000',
      capacity: 250,
      image:
        'https://images.pexels.com/photos/1485637/pexels-photo-1485637.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setToken('');
  };

  useLayoutEffect(() => {
    if (userId) {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users where id = ?',
          [userId],
          (tx, results) => {
            if (results.rows.length > 0) {
              setUser(results.rows.item(0));
            }
          },
          error => console.log('Error fetching user', error),
        );
      });
    }
  }, [userId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={styles.headerTitle}>
          Welcome, {user?.firstName || 'User'}!
        </Text>
      ),
      headerRight: () => (
        <Pressable onPress={handleLogout} style={{marginRight: 15}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 20}}
            source={{
              uri:
                user?.image ||
                'https://assets.leetcode.com/users/BKarthik7/avatar_1730491299.png',
            }}
          />
        </Pressable>
      ),
    });
  }, [navigation, user]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF5F7'}}>
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Image
          source={{
            uri:
              'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
        <Text style={styles.heroText}>Plan Your Dream Wedding</Text>
      </View>
      {/* Venues Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Venues</Text>
        {venues.map(venue => (
          <View key={venue.id} style={[styles.card, styles.venueCard]}>
            <Image source={{uri: venue.image}} style={styles.venueImage} />
            <View style={styles.venueDetails}>
              <Text style={styles.venueName}>{venue.name}</Text>
              <Text style={styles.venueInfo}>{venue.location}</Text>
              <Text style={styles.venueInfo}>Capacity: {venue.capacity}</Text>
              <Text style={styles.venuePrice}>{venue.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#4A4A4A',
  },
  heroSection: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
  venueCard: {
    marginBottom: 15,
    padding: 0,
    overflow: 'hidden',
  },
  venueImage: {
    width: '100%',
    height: 150,
  },
  venueDetails: {
    padding: 15,
  },
  venueName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  venueInfo: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  venuePrice: {
    fontSize: 15,
    fontWeight: '500',
    color: '#C5A653',
    marginTop: 8,
  },
});