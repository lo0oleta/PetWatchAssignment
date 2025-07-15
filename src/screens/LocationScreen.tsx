import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  heading: number | null;
}

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'PetWatch needs access to your location to show nearby pets.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setError('Location permission denied');
      setLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy, altitude, speed, heading } = position.coords;
        setLocation({
          latitude,
          longitude,
          accuracy,
          altitude,
          speed,
          heading,
        });
        setLoading(false);
      },
      (error) => {
        console.log('Location error:', error);
        setError(`Location error: ${error.message}`);
        setLoading(false);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 10000 
      }
    );
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const generateNearbyPets = () => {
    if (!location) return [];
    
    return [
      {
        id: '1',
        name: 'Buddy',
        type: 'dog',
        coordinate: {
          latitude: location.latitude + 0.001,
          longitude: location.longitude + 0.001,
        },
        distance: '0.5 km',
      },
      {
        id: '2',
        name: 'Whiskers',
        type: 'cat',
        coordinate: {
          latitude: location.latitude - 0.002,
          longitude: location.longitude + 0.002,
        },
        distance: '1.2 km',
      },
      {
        id: '3',
        name: 'Coco',
        type: 'dog',
        coordinate: {
          latitude: location.latitude + 0.003,
          longitude: location.longitude - 0.001,
        },
        distance: '2.1 km',
      },
    ];
  };

  const formatCoordinate = (coord: number, type: 'lat' | 'lng') => {
    const direction = type === 'lat' ? (coord >= 0 ? 'N' : 'S') : (coord >= 0 ? 'E' : 'W');
    return `${Math.abs(coord).toFixed(6)}° ${direction}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Your Location</Text> */}
        <Text style={styles.title}>Find nearby pets in your area</Text>
      </View>

      {/* Simulated Google Maps Interface */}
      <View style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <Text style={styles.mapTitle}>🗺️ PetWatch Map</Text>
          <TouchableOpacity style={styles.refreshButton} onPress={getCurrentLocation}>
            <Text style={styles.refreshButtonText}>🔄</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.mapView}>
          {location ? (
            <View style={styles.mapView}>
              {/* Google Maps-like background */}
              <View style={styles.mapBackground}>
                {/* Street pattern */}
                <View style={styles.streetHorizontal} />
                <View style={styles.streetVertical} />
                <View style={styles.streetHorizontal2} />
                <View style={styles.streetVertical2} />
                
                {/* Buildings */}
                <View style={[styles.building, styles.building1]} />
                <View style={[styles.building, styles.building2]} />
                <View style={[styles.building, styles.building3]} />
                <View style={[styles.building, styles.building4]} />
                
                {/* Park areas */}
                <View style={[styles.park, styles.park1]} />
                <View style={[styles.park, styles.park2]} />
                
                {/* User location marker */}
                <View style={styles.userLocationMarker}>
                  <View style={styles.markerPin}>
                    <Text style={styles.markerText}>📍</Text>
                  </View>
                  <View style={styles.markerShadow} />
                </View>
                
                {/* Pet markers */}
                {generateNearbyPets().map((pet, index) => (
                  <View 
                    key={pet.id} 
                    style={[
                      styles.petMarker,
                      {
                        left: `${50 + (index - 1) * 20}%`,
                        top: `${40 + (index % 2) * 20}%`,
                      }
                    ]}
                  >
                    <View style={[
                      styles.markerPin,
                      { backgroundColor: pet.type === 'dog' ? '#4285F4' : '#FF9500' }
                    ]}>
                      <Text style={styles.markerText}>
                        {pet.type === 'dog' ? '🐕' : '🐱'}
                      </Text>
                    </View>
                    <View style={styles.markerShadow} />
                  </View>
                ))}
              </View>
              
              {/* Google Maps-like controls */}
              <View style={styles.mapControls}>
                <TouchableOpacity style={styles.mapControlButton}>
                  <Text style={styles.mapControlText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mapControlButton}>
                  <Text style={styles.mapControlText}>-</Text>
                </TouchableOpacity>
              </View>
              
              {/* Location button */}
              <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
                <Text style={styles.locationButtonText}>🎯</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>
                {loading ? 'Loading map...' : 'Enable location to see map'}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Location Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Location Details</Text>
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF865C" />
            <Text style={styles.loadingText}>Getting your location...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>❌ {error}</Text>
            <Text style={styles.errorSubText}>
              {error.includes('permission') ? 
                'Please enable location permissions in your device settings:\n\n• Go to Settings > Privacy & Security > Location Services\n• Enable Location Services\n• Find PetWatch and select "While Using App"' :
                'Make sure your device GPS is enabled and try again.'
              }
            </Text>
            <TouchableOpacity style={styles.retryButton} onPress={getCurrentLocation}>
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {location && !loading && (
          <View style={styles.locationInfo}>
            <View style={styles.coordCard}>
              <Text style={styles.coordLabel}>📍 Latitude</Text>
              <Text style={styles.coordValue}>{formatCoordinate(location.latitude, 'lat')}</Text>
              <Text style={styles.coordDecimal}>{location.latitude.toFixed(8)}</Text>
            </View>

            <View style={styles.coordCard}>
              <Text style={styles.coordLabel}>📍 Longitude</Text>
              <Text style={styles.coordValue}>{formatCoordinate(location.longitude, 'lng')}</Text>
              <Text style={styles.coordDecimal}>{location.longitude.toFixed(8)}</Text>
            </View>

            {/* <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Additional Details</Text>
              <Text style={styles.detailItem}>🎯 Accuracy: {location.accuracy.toFixed(0)}m</Text>
              {location.altitude && (
                <Text style={styles.detailItem}>⛰️ Altitude: {location.altitude.toFixed(0)}m</Text>
              )}
              {location.speed && (
                <Text style={styles.detailItem}>🏃 Speed: {(location.speed * 3.6).toFixed(1)} km/h</Text>
              )}
              {location.heading && (
                <Text style={styles.detailItem}>🧭 Heading: {location.heading.toFixed(0)}°</Text>
              )}
            </View> */}
          </View>
        )}
      </View>

      {/* Simulated Nearby Pets */}
      <View style={styles.nearbyContainer}>
        <Text style={styles.sectionTitle}>Nearby Pets</Text>
        <View style={styles.nearbyPet}>
          <Text style={styles.nearbyPetText}>🐕 Buddy - 0.5 km away</Text>
        </View>
        <View style={styles.nearbyPet}>
          <Text style={styles.nearbyPetText}>🐱 Whiskers - 1.2 km away</Text>
        </View>
        <View style={styles.nearbyPet}>
          <Text style={styles.nearbyPetText}>🐶 Coco - 2.1 km away</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  mapCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FF865C',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  refreshButton: {
    padding: 5,
  },
  refreshButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  mapView: {
    height: 300,
    backgroundColor: '#e8f5e8',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
 
  mapBackground: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  streetHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#E8E8E8',
    top: '30%',
  },
  streetVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: '#E8E8E8',
    left: '40%',
  },
  streetHorizontal2: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#E8E8E8',
    top: '70%',
  },
  streetVertical2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#E8E8E8',
    left: '70%',
  },
  building: {
    position: 'absolute',
    backgroundColor: '#D3D3D3',
    borderRadius: 2,
  },
  building1: {
    width: 40,
    height: 30,
    left: '10%',
    top: '15%',
  },
  building2: {
    width: 35,
    height: 25,
    left: '60%',
    top: '20%',
  },
  building3: {
    width: 45,
    height: 35,
    left: '15%',
    top: '50%',
  },
  building4: {
    width: 30,
    height: 40,
    left: '75%',
    top: '45%',
  },
  park: {
    position: 'absolute',
    backgroundColor: '#90EE90',
    borderRadius: 5,
  },
  park1: {
    width: 50,
    height: 40,
    left: '50%',
    top: '10%',
  },
  park2: {
    width: 35,
    height: 30,
    left: '5%',
    top: '80%',
  },
  userLocationMarker: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -15,
    marginTop: -30,
    alignItems: 'center',
  },
  petMarker: {
    position: 'absolute',
    marginLeft: -15,
    marginTop: -30,
    alignItems: 'center',
  },
  markerPin: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  markerShadow: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 2,
  },
  mapControls: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  mapControlButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mapControlText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  locationButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  locationButtonText: {
    fontSize: 18,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  infoContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF865C',
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    fontSize: 16,
    color: '#ff4444',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorSubText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#FF865C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  locationInfo: {
    gap: 15,
  },
  coordCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coordLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF865C',
    marginBottom: 5,
  },
  coordValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  coordDecimal: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'monospace',
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF865C',
    marginBottom: 15,
  },
  detailItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  nearbyContainer: {
    paddingBottom: 20,
    padding:10,
    marginBottom: '20%',
    
  },
  nearbyPet: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyPetText: {
    fontSize: 16,
    color: '#333',
  },
});

export default LocationScreen; 