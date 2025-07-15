import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PetDetailScreenRouteProp = RouteProp<RootStackParamList, 'PetDetail'>;
type PetDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PetDetail'>;

interface PetDetailScreenProps {
  route: PetDetailScreenRouteProp;
  navigation: PetDetailScreenNavigationProp;
}

const PetDetailScreen: React.FC<PetDetailScreenProps> = ({ route, navigation }) => {
  const { pet } = route.params;

  const handleAdoptPress = () => {
    navigation.navigate('Payment', { pet });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: pet.imageUrl }}
          style={styles.petImage}
          onError={(error) => console.log('Image loading error:', error.nativeEvent.error)}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Breed:</Text>
          <Text style={styles.infoValue}>{pet.breed}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Age:</Text>
          <Text style={styles.infoValue}>{pet.age} years old</Text>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>About {pet.name}:</Text>
          <Text style={styles.description}>{pet.description}</Text>
        </View>
        
        <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptPress}>
          <Text style={styles.adoptButtonText}>Interested in Adopting</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 20,
  },
  petImage: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#e0e0e0',
    borderWidth: 3,
    borderColor: '#FF865C',
  },
  contentContainer: {
    padding: 20,
  },
  petName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF865C',
    width: 80,
  },
  infoValue: {
    fontSize: 18,
    color: '#333',
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF865C',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  adoptButton: {
    backgroundColor: '#FF865C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PetDetailScreen; 