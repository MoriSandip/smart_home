# Smart Home Control Panel

A modern React Native mobile application for controlling smart home devices with a beautiful, intuitive interface.

## Features

### 🏠 Dashboard
- **Dynamic Greeting**: Personalized greeting based on time of day (Good Morning, Good Afternoon, Good Evening, Good Night)
- **Weather Integration**: Real-time weather data with temperature toggle (°C ↔ °F)
- **Energy Usage**: Live energy consumption monitoring (current, daily, monthly)
- **Room Overview**: Horizontally scrollable room cards with active device counts

### 🏘️ Room Management
- **Room Selection**: Tap any room to view its devices
- **Visual Room Cards**: Each room has a unique color and icon
- **Device Count**: Shows number of active devices per room
- **Smooth Navigation**: Animated transitions between screens

### 🔌 Device Control
- **Device Grid**: Clean grid layout of devices in each room
- **Toggle Controls**: Easy on/off switches for all devices
- **Status Indicators**: Visual status with color-coded indicators
- **Live Values**: Real-time readings for temperature, brightness, etc.
- **Device Types**: Support for lights, AC, TV, fans, doors, cameras

### 🌡️ Weather Integration
- **Live Weather**: Current temperature and conditions
- **Temperature Toggle**: Switch between Celsius and Fahrenheit
- **Weather Icons**: Visual weather representation
- **API Ready**: Configured for OpenWeatherMap API

### 💾 State Management
- **Redux Toolkit**: Global state management
- **Persistence**: Device states saved to local storage
- **Temperature Units**: User preference persistence
- **Async Operations**: Weather data fetching

## Tech Stack

- **React Native**: 0.80.1
- **TypeScript**: Full type safety
- **Redux Toolkit**: State management
- **React Navigation**: Screen navigation
- **React Native Vector Icons**: Beautiful icons
- **AsyncStorage**: Local data persistence

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SmartHome
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

## Configuration

### Weather API Setup
To enable real weather data:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update `src/services/weatherService.ts`:
   ```typescript
   const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
   const CITY = 'Your City Name';
   ```
3. Uncomment the API call in the `fetchWeatherData` function

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── WeatherCard.tsx
│   ├── EnergyCard.tsx
│   ├── RoomCard.tsx
│   └── DeviceCard.tsx
├── screens/            # Main app screens
│   ├── DashboardScreen.tsx
│   └── RoomDetailScreen.tsx
├── store/              # Redux store and slices
│   ├── index.ts
│   ├── hooks.ts
│   └── smartHomeSlice.ts
├── navigation/         # Navigation setup
│   └── AppNavigator.tsx
├── services/           # API services
│   └── weatherService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Helper functions
    └── helpers.ts
```

## Features in Detail

### Dynamic Greeting
The app automatically displays appropriate greetings based on the current time:
- 5:00 AM - 11:59 AM: "Good Morning"
- 12:00 PM - 4:59 PM: "Good Afternoon"
- 5:00 PM - 8:59 PM: "Good Evening"
- 9:00 PM - 4:59 AM: "Good Night"

### Room Management
- **Living Room**: Smart Light, Air Conditioner, Smart TV
- **Bedroom**: Bedside Lamp, Ceiling Fan
- **Kitchen**: Kitchen Light, Refrigerator, Microwave
- **Bathroom**: Bathroom Light
- **Office**: Desk Lamp, Security Camera

### Device Types
Each device supports:
- **Toggle State**: On/Off functionality
- **Live Values**: Temperature, brightness, speed readings
- **Status Indicators**: Color-coded status dots
- **Icons**: Device-specific icons
- **Persistence**: States saved to local storage

### Weather Integration
- **Mock Data**: Currently uses mock weather data
- **API Ready**: Configured for OpenWeatherMap integration
- **Temperature Toggle**: Global temperature unit switching
- **Error Handling**: Graceful fallback for API failures

## State Management

The app uses Redux Toolkit for state management with the following features:

### Smart Home Slice
- **Rooms**: Room data and selection
- **Devices**: Device states and values
- **Weather**: Current weather information
- **Energy Usage**: Consumption data
- **Settings**: Temperature units, loading states

### Persistence
- **AsyncStorage**: Device states and user preferences
- **Automatic Loading**: State restoration on app launch
- **Real-time Updates**: Immediate UI updates on state changes

## Navigation

The app uses React Navigation with:
- **Stack Navigator**: Dashboard ↔ Room Detail
- **Smooth Transitions**: Custom slide animations
- **Type Safety**: Fully typed navigation parameters
- **Header Management**: Custom headers for each screen

## Styling

The app features a modern, clean design with:
- **iOS-style Design**: Native look and feel
- **Card-based Layout**: Clean, organized information display
- **Color-coded Rooms**: Unique colors for each room
- **Status Indicators**: Visual feedback for device states
- **Responsive Design**: Adapts to different screen sizes

## Future Enhancements

- [ ] Real-time device synchronization
- [ ] Push notifications for device alerts
- [ ] Voice control integration
- [ ] Scene/automation support
- [ ] User authentication
- [ ] Multi-home support
- [ ] Device scheduling
- [ ] Energy usage analytics
- [ ] Dark mode support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
