import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Payment'>;

interface PaymentScreenProps {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
  const { pet } = route.params;
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit-card' | 'apple-pay'>('credit-card');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (formData.cardNumber.length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) newErrors.expiryDate = 'Format: MM/YY';
    if (formData.cvv.length < 3) newErrors.cvv = 'CVV must be 3 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (selectedPaymentMethod === 'credit-card' && !validateForm()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        // Generate transaction ID
        const transactionId = Math.random().toString(36).substring(2, 15).toUpperCase();
        const amount = '160';
        const paymentMethod = selectedPaymentMethod === 'apple-pay' ? 'Apple Pay' : 'Credit Card';
        
        navigation.navigate('PaymentSuccess', {
          pet,
          transactionId,
          amount,
          paymentMethod,
        });
      } else {
        Alert.alert(
          'Payment Failed',
          'There was an issue processing your payment. Please try again or contact support.',
          [{ text: 'OK' }]
        );
      }
    }, 2000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 16);
    return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.slice(0, 4);
    if (limited.length >= 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    return limited;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Adopt {pet.name}</Text>
          <Text style={styles.subtitle}>Complete your adoption with secure payment</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.fullName ? styles.inputError : {}]}
              placeholder="Full Name"
              value={formData.fullName}
              onChangeText={(text) => updateFormData('fullName', text)}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : {}]}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.phone ? styles.inputError : {}]}
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.address ? styles.inputError : {}]}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => updateFormData('address', text)}
              multiline
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          {/* Payment Method Selection */}
          <View style={styles.paymentMethodContainer}>
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                selectedPaymentMethod === 'credit-card' ? styles.paymentMethodSelected : {}
              ]}
              onPress={() => setSelectedPaymentMethod('credit-card')}
            >
              <Text style={[
                styles.paymentMethodText,
                selectedPaymentMethod === 'credit-card' ? styles.paymentMethodTextSelected : {}
              ]}>
                💳 Credit Card
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.paymentMethodButton,
                selectedPaymentMethod === 'apple-pay' ? styles.paymentMethodSelected : {}
              ]}
              onPress={() => setSelectedPaymentMethod('apple-pay')}
            >
              <Text style={[
                styles.paymentMethodText,
                selectedPaymentMethod === 'apple-pay' ? styles.paymentMethodTextSelected : {}
              ]}>
                 Apple Pay
              </Text>
            </TouchableOpacity>
          </View>
          
          {selectedPaymentMethod === 'credit-card' && (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors.cardNumber ? styles.inputError : {}]}
                  placeholder="Card Number"
                  value={formatCardNumber(formData.cardNumber)}
                  onChangeText={(text) => updateFormData('cardNumber', text.replace(/\s/g, ''))}
                  keyboardType="numeric"
                  maxLength={19}
                />
                {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
              </View>

          <View style={styles.row}>
            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={[styles.input, errors.expiryDate ? styles.inputError : {}]}
                placeholder="MM/YY"
                value={formatExpiryDate(formData.expiryDate)}
                onChangeText={(text) => updateFormData('expiryDate', text)}
                keyboardType="numeric"
                maxLength={5}
              />
              {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate}</Text>}
            </View>

            <View style={[styles.inputContainer, styles.halfWidth]}>
              <TextInput
                style={[styles.input, errors.cvv ? styles.inputError : {}]}
                placeholder="CVV"
                value={formData.cvv}
                onChangeText={(text) => updateFormData('cvv', text.replace(/\D/g, ''))}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
              {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
            </View>
          </View>
            </>
          )}
        </View>

        <View style={styles.adoptionFee}>
          <Text style={styles.feeLabel}>Adoption Fee</Text>
          <Text style={styles.feeAmount}>AED 8000</Text>
        </View>

        <TouchableOpacity
          style={[styles.payButton, isProcessing ? styles.payButtonDisabled : {}]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing...' : 'Complete Adoption'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF865C',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  adoptionFee: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  feeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF865C',
  },
  payButton: {
    backgroundColor: '#FF865C',
    paddingVertical: 18,
    borderRadius: 25,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethodButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentMethodSelected: {
    borderColor: '#FF865C',
    backgroundColor: '#FFF5F0',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentMethodTextSelected: {
    color: '#FF865C',
  },
});

export default PaymentScreen; 