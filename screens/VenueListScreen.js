import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import venues from '../data/venues';

const VenueListScreen = () => {
  const [budget, setBudget] = useState('');
  const [capacity, setCapacity] = useState('');

  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      const budgetFilter = budget ? venue.price <= parseInt(budget) : true;
      const capacityFilter = capacity
        ? venue.capacity >= parseInt(capacity)
        : true;
      return budgetFilter && capacityFilter;
    });
  }, [budget, capacity]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Venue Listing</Text>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Max Budget"
          placeholderTextColor={'gray'}
          color={'black'}
          keyboardType="numeric"
          value={budget}
          onChangeText={setBudget}
        />
        <TextInput
          style={styles.input}
          placeholder="Min Capacity"
          placeholderTextColor={'gray'}
          color={'black'}
          keyboardType="numeric"
          value={capacity}
          onChangeText={setCapacity}
        />
      </View>
      <ScrollView>
        {filteredVenues.map(venue => (
          <View key={venue.id} style={[styles.card, styles.venueCard]}>
            <Image source={{uri: venue.image}} style={styles.venueImage} />
            <View style={styles.venueDetailsRow}>
              <View style={{flex: 1}}>
                <Text style={styles.venueName}>{venue.name}</Text>
                <Text style={styles.venueInfo}>{venue.location}</Text>
                <Text style={styles.venueInfo}>Capacity: {venue.capacity}</Text>
                <Text style={styles.venuePrice}>
                  ₹{venue.price.toLocaleString()}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Text style={styles.bookButton}>Book Now</Text>
              </View>
            </View>
          </View>
        ))}
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
    textAlign: 'center',
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '45%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  venueCard: {},
  venueImage: {
    width: '100%',
    height: 150,
  },
  venueDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
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
  buttonContainer: {
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  bookButton: {
    backgroundColor: '#C5A653',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    fontWeight: 'bold',
    fontSize: 16,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2,
  },
});

export default VenueListScreen;
