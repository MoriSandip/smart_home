# Smart Home Control Interface

A modern, interactive mobile application for controlling smart home devices. Built with React Native, this app provides an intuitive interface for managing devices across different rooms with advanced filtering, search, and automation features.

## 🏠 Features

### Core Functionality
- **Room-based Device Management**: Organize devices by rooms with visual room cards
- **Device Control**: Toggle devices on/off with intuitive switches
- **Dimmable Light Control**: Adjust brightness levels for compatible light devices
- **Real-time Status**: Live updates of device states and energy consumption

### Advanced Features
- **Device Search**: Search across all devices by name or type
- **Smart Filtering**: Filter devices by type (lights, AC, TV, fans, cameras) and status
- **Quick Actions**: One-tap automation for common scenarios:
  - All Lights On/Off
  - AC Control
  - Greeting Mode
- **Home Statistics**: Real-time overview of device usage and energy consumption
- **Weather Integration**: Current weather conditions and temperature
- **Energy Monitoring**: Track current, daily, and monthly energy usage

### User Experience
- **Smooth Animations**: Parallax effects and smooth transitions
- **Responsive Design**: Optimized for mobile devices
- **Dark/Light Theme Support**: Adaptive color schemes
- **Persistent State**: Device states saved locally
- **Intuitive Navigation**: Easy room-to-room navigation

## 🛠 Technical Stack

- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **Redux Toolkit**: State management with async thunks
- **React Navigation**: Screen navigation and routing
- **AsyncStorage**: Local data persistence
- **Linear Gradient**: Beautiful visual effects

## 📱 Screens

### Dashboard
- Home overview with weather and energy cards
- Room selection with animated cards
- Quick actions for common tasks
- Device statistics and usage overview

### Room Detail
- Individual room device management
- Device filtering and search
- Progress indicators for room status
- Grid layout for device cards

## 🎨 Components

### Core Components
- `RoomCard`: Interactive room selection with device counts
- `DeviceCard`: Individual device control with dimming support
- `DeviceFilter`: Type and status-based filtering
- `DeviceSearch`: Global device search functionality
- `QuickActions`: Automation scenarios
- `DeviceStats`: Usage statistics and analytics

### Supporting Components
- `WeatherCard`: Current weather display
- `EnergyCard`: Energy consumption monitoring
- `ProgressBar`: Visual progress indicators

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DeviceCard.tsx
│   ├── DeviceFilter.tsx
│   ├── DeviceSearch.tsx
│   ├── DeviceStats.tsx
│   ├── QuickActions.tsx
│   ├── RoomCard.tsx
│   ├── WeatherCard.tsx
│   └── EnergyCard.tsx
├── screens/            # Application screens
│   ├── Dashboard/
│   └── RoomDetail/
├── store/              # Redux state management
│   ├── smartHomeSlice.ts
│   ├── hooks.ts
│   └── index.ts
├── navigation/         # Navigation configuration
├── types/              # TypeScript type definitions
├── services/           # API and external services
└── utils/              # Helper functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18)
- React Native CLI
- Android Studio / Xcode

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SmartHome
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:

For Android:
```bash
npm run android
```

For iOS:
```bash
npm run ios
```

## 📊 Mock Data

The application includes comprehensive mock data for testing:

### Rooms
- Living Room (3 devices)
- Bedroom (2 devices)
- Kitchen (3 devices)
- Bathroom (1 device)
- Office (2 devices)

### Device Types
- **Lights**: Dimmable smart lights with brightness control
- **AC**: Air conditioning units with temperature control
- **TV**: Smart televisions
- **Fans**: Ceiling and portable fans
- **Cameras**: Security cameras
- **Doors**: Smart door locks

## 🎯 Key Features Demo

### Device Control
- Tap device cards to toggle on/off
- For dimmable lights, tap to expand and adjust brightness
- Real-time status updates with visual indicators

### Room Navigation
- Select rooms from the dashboard
- View room-specific device grids
- Monitor room activity with progress bars

### Smart Filtering
- Filter by device type (All, Lights, AC, TV, Fans, Cameras)
- Filter by status (All, On, Off)
- Combined filtering for precise device selection

### Quick Actions
- **All Lights On**: Turn on all smart lights
- **All Lights Off**: Turn off all smart lights
- **AC Off**: Turn off all air conditioning units
- **Good Night**: Turn off all devices
- **Movie Mode**: Dim lights and turn on TV
- **Work Mode**: Turn on office lights

### Search Functionality
- Search devices by name or type
- Real-time search results
- Cross-room device discovery

## 🔧 Customization

### Adding New Device Types
1. Update the `Device` type in `src/types/index.ts`
2. Add device icons to the emoji mapping
3. Update filter options in `DeviceFilter.tsx`

### Adding New Quick Actions
1. Define the action in `QuickActions.tsx`
2. Implement the device control logic
3. Add visual styling and emoji

### Styling
- All components use consistent design tokens
- Color schemes are defined in component styles
- Animations use React Native's Animated API

## 📈 Performance

- Optimized re-renders with React hooks
- Efficient list rendering with FlatList
- Lazy loading for large device lists
- Minimal bundle size with tree shaking

## 🔒 Security

- Local state persistence with AsyncStorage
- No sensitive data in device storage
- Secure device communication patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

---

Built with ❤️ using React Native and modern mobile development practices.
