export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  feelsLike: number;
}

export interface ModalState {
  isOpen: boolean;
  destination: Destination | null;
  weather: WeatherData | null;
  loading: boolean;
}
