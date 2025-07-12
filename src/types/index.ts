export interface Device {
    id: string;
    name: string;
    type: 'light' | 'ac' | 'tv' | 'fan' | 'door' | 'camera';
    isOn: boolean;
    roomId: string;
    icon: string;
    value?: number; // For temperature, brightness, etc.
    unit?: string; // For temperature unit (°C/°F)
}

export interface Room {
    id: string;
    name: string;
    icon: string;
    backgroundColor: string;
    deviceIds: string[];
}

export interface WeatherData {
    temperature: number;
    condition: string;
    icon: string;
    unit: 'C' | 'F';
}

export interface EnergyUsage {
    current: number;
    daily: number;
    monthly: number;
    unit: string;
}

export interface AppState {
    rooms: Room[];
    devices: Device[];
    weather: WeatherData | null;
    energyUsage: EnergyUsage;
    selectedRoomId: string | null;
    temperatureUnit: 'C' | 'F';
    isLoading: boolean;
}

// RootState is now defined in store/index.ts 