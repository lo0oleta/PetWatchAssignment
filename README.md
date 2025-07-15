# PetWatch - Pet Adoption App

A React Native mobile application for pet adoption with secure payment processing and beautiful animations.

## 🎥 Demo Video

Watch a demo video of the app here: [PetWatch Demo](https://drive.google.com/file/d/15QMbwoTLZo958j9qDnD9w5T_Cfer2ooQ/view?usp=sharing)

## 🐾 Features

### Core Features
- **Pet Listing**: Browse available pets for adoption
- **Pet Details**: View detailed information about each pet including breed, age, and description
- **Location Services**: Find pets near your location
- **Secure Payment**: Complete adoption process with multiple payment options
- **Payment Success**: Beautiful success screen with confetti animation

### Payment Options
- 💳 Credit Card payment with form validation
- 🍎 Apple Pay integration
- Secure transaction processing

### User Experience
- **Beautiful UI**: Modern, clean design with smooth animations
- **Interactive Elements**: Confetti animations on successful payments
- **Step-by-step Guidance**: Clear instructions for pickup/delivery
- **Responsive Design**: Optimized for both iOS and Android

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PetWatchAssignment
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **iOS Setup**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro**
   ```bash
   bun start
   ```

5. **Run the app**
   ```bash
   # For iOS
   bun run ios
   
   # For Android
   bun run android
   ```

## 📱 App Structure

```
src/
├── components/
│   └── PetCard.tsx          # Pet listing card component
├── screens/
│   ├── PetListScreen.tsx    # Main pet listing screen
│   ├── PetDetailScreen.tsx  # Pet detail view
│   ├── PaymentScreen.tsx    # Payment form and processing
│   ├── PaymentSuccessScreen.tsx # Success screen with animations
│   └── LocationScreen.tsx   # Location services
├── navigation/
│   └── AppNavigator.tsx     # Navigation configuration
└── data/
    └── pets.json           # Pet data
```

## 🎨 Key Screens

### 1. Pet Listing Screen
- Browse all available pets
- Clean card-based layout
- Navigate to pet details

### 2. Pet Detail Screen
- Detailed pet information
- High-quality pet photos
- Adopt button to start payment process

### 3. Payment Screen
- Contact information form
- Payment method selection (Credit Card / Apple Pay)
- Form validation and error handling
- Secure payment processing

### 4. Payment Success Screen
- Animated confetti celebration
- Transaction details display
- Step-by-step pickup/delivery instructions
- Clear next steps for pet adoption

## 🔧 Technical Stack

- **Framework**: React Native 0.80.1
- **Navigation**: React Navigation 7.x
- **State Management**: React Hooks
- **Animations**: React Native Animated API
- **Payment Processing**: Simulated secure payment flow
- **Package Manager**: Bun (as per user requirements)

## 🎯 Payment Flow

1. **Pet Selection**: User browses and selects a pet
2. **Payment Form**: Complete contact and payment information
3. **Payment Processing**: Secure transaction processing
4. **Success Screen**: Animated celebration with next steps
5. **Pickup/Delivery**: Clear instructions for getting the pet

## 📋 Next Steps Instructions

After successful payment, users receive:
1. **Confirmation Call**: Within 24 hours
2. **Pickup/Delivery Options**:
   - 📍 Pickup at Dubai Marina Mall
   - 🚚 Delivery service (AED 50 fee)
3. **Preparation Guidelines**: ID requirements and pet preparation tips

## 🛠️ Development

### Project Structure
- Client-server architecture with clean API separation
- Modular component design
- Responsive and accessible UI
- Comprehensive error handling

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Consistent coding standards
- Proper component organization

## 📄 License

This project is part of the PetWatch assignment and is for educational/demonstration purposes.

## 📞 Support

For any questions or issues, please contact the development team.

---

Made with ❤️ for pet adoption
