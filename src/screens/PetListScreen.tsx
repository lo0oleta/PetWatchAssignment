import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

import petsData from '../data/pets.json';


interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
}


interface PetListItemProps {
  pet: Pet;
  onPress: () => void;
}

const PetListItem: React.FC<PetListItemProps> = ({ pet, onPress }) => (
  <TouchableOpacity style={styles.petItemContainer} onPress={onPress}>
    <Image source={{ uri: pet.imageUrl }} style={styles.petImage} />
    <View style={styles.petInfo}>
      <Text style={styles.petName}>{pet.name}</Text>
      <Text style={styles.petBreedAge}>{pet.breed}, {pet.age} years old</Text>
      <Text style={styles.petDescription}>{pet.description}</Text>
    </View>
  </TouchableOpacity>
);

type PetListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PetList'>;

const PetListScreen: React.FC = () => {
  const pets: Pet[] = petsData as Pet[];
  const navigation = useNavigation<PetListScreenNavigationProp>();

  const handlePetPress = (pet: Pet) => {
    navigation.navigate('PetDetail', { pet });
  };

  const handleLocationPress = () => {
    navigation.navigate('Location');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Meet Your New Friend</Text>
        <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
          <Text style={styles.locationButtonText}>📍 Find Nearby</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PetListItem 
            pet={item} 
            onPress={() => handlePetPress(item)}
          />
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  locationButton: {
    backgroundColor: '#FF865C',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  petItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: '#eee', 
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  petBreedAge: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  petDescription: {
    fontSize: 14,
    color: '#888',
  },
  listContentContainer: {
    paddingBottom: 20, 
  },
});

export default PetListScreen;