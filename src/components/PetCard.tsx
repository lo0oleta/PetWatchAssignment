import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
}

interface PetCardProps {
  pet: Pet; 
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: pet.imageUrl }}
        style={styles.petImage}
        onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed}</Text>
         </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    marginBottom: 15,  
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, 
  },
  petImage: {
    width: 90, 
    height: 90,
    borderRadius: 45, 
    marginRight: 15,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    flex: 1,
  },
  petName: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 16,
    color: '#666',
  },
  petAge: { 
    fontSize: 14,
    color: '#888',
  },
});

export default PetCard;
