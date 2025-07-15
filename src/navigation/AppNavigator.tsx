import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PetListScreen from '../screens/PetListScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import LocationScreen from '../screens/LocationScreen';

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
}

export type RootStackParamList = {
  PetList: undefined;
  PetDetail: { pet: Pet };
  Payment: { pet: Pet };
  PaymentSuccess: { pet: Pet; transactionId: string; amount: string; paymentMethod: string };
  Location: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PetList">
        <Stack.Screen
          name="PetList"
          component={PetListScreen} 
          options={{
            title: 'PetWatch', 
            headerStyle: {
              backgroundColor: '#FF865C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="PetDetail"
          component={PetDetailScreen}
          options={({ route }) => ({
            title: route.params.pet.name,
            headerStyle: {
              backgroundColor: '#FF865C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={({ route }) => ({
            title: `Adopt ${route.params.pet.name}`,
            headerStyle: {
              backgroundColor: '#FF865C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccessScreen}
          options={{
            title: 'Payment Success',
            headerStyle: {
              backgroundColor: '#FF865C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Location"
          component={LocationScreen}
          options={{
            title: 'Your Location',
            headerStyle: {
              backgroundColor: '#FF865C',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
