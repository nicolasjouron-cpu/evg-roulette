import type { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  { city: "Tbilissi", country: "Géorgie", lat: 41.7151, lng: 44.8271 },
  { city: "Tallinn", country: "Estonie", lat: 59.437, lng: 24.7536 },
  { city: "Medellín", country: "Colombie", lat: 6.2442, lng: -75.5812 },
  { city: "Oaxaca", country: "Mexique", lat: 17.0732, lng: -96.7266 },
  { city: "Luang Prabang", country: "Laos", lat: 19.8833, lng: 102.1333 },
  { city: "Queenstown", country: "Nouvelle-Zélande", lat: -45.0312, lng: 168.6626 },
  { city: "Marrakech", country: "Maroc", lat: 31.6295, lng: -7.9811 },
  { city: "Plovdiv", country: "Bulgarie", lat: 42.1354, lng: 24.7453 },
  { city: "Rijeka", country: "Croatie", lat: 45.3271, lng: 14.4422 },
  { city: "Chiang Mai", country: "Thaïlande", lat: 18.7883, lng: 98.9853 },
  { city: "Valparaíso", country: "Chili", lat: -33.0472, lng: -71.6127 },
  { city: "Zanzibar", country: "Tanzanie", lat: -6.1659, lng: 39.1989 },
  { city: "Kotor", country: "Monténégro", lat: 42.4247, lng: 18.7712 },
  { city: "Siem Reap", country: "Cambodge", lat: 13.3633, lng: 103.8564 },
  { city: "Porto", country: "Portugal", lat: 41.1579, lng: -8.6291 },
  { city: "Cartagena", country: "Colombie", lat: 10.3910, lng: -75.5364 },
  { city: "Hoi An", country: "Vietnam", lat: 15.8801, lng: 108.338 },
  { city: "Séville", country: "Espagne", lat: 37.3891, lng: -5.9845 },
  { city: "Riga", country: "Lettonie", lat: 56.9496, lng: 24.1052 },
  { city: "Essaouira", country: "Maroc", lat: 31.5085, lng: -9.7595 },
  { city: "Cluj-Napoca", country: "Roumanie", lat: 46.7712, lng: 23.6236 },
  { city: "Bogotá", country: "Colombie", lat: 4.7110, lng: -74.0721 },
  { city: "Katmandou", country: "Népal", lat: 27.7172, lng: 85.324 },
  { city: "Bariloche", country: "Argentine", lat: -41.1335, lng: -71.3103 },
  { city: "Split", country: "Croatie", lat: 43.5081, lng: 16.4402 },
  { city: "Fès", country: "Maroc", lat: 34.0181, lng: -5.0078 },
  { city: "Antigua", country: "Guatemala", lat: 14.5586, lng: -90.7295 },
  { city: "Gdańsk", country: "Pologne", lat: 54.352, lng: 18.6466 },
  { city: "Cape Town", country: "Afrique du Sud", lat: -33.9249, lng: 18.4241 },
  { city: "Cusco", country: "Pérou", lat: -13.532, lng: -71.9675 },
  { city: "Ljubljana", country: "Slovénie", lat: 46.0569, lng: 14.5058 },
  { city: "Busan", country: "Corée du Sud", lat: 35.1796, lng: 129.0756 },
  { city: "Montevideo", country: "Uruguay", lat: -34.9011, lng: -56.1645 },
  { city: "Bratislava", country: "Slovaquie", lat: 48.1486, lng: 17.1077 },
  { city: "Dahab", country: "Égypte", lat: 28.5007, lng: 34.5133 },
  { city: "Vientiane", country: "Laos", lat: 17.9757, lng: 102.6331 },
  { city: "Mostar", country: "Bosnie-Herzégovine", lat: 43.3438, lng: 17.8078 },
  { city: "Ilha Grande", country: "Brésil", lat: -23.1419, lng: -44.2294 },
  { city: "Koh Samui", country: "Thaïlande", lat: 9.5120, lng: 100.0137 },
  { city: "Sayulita", country: "Mexique", lat: 20.8691, lng: -105.4408 },
];

let lastDestination: Destination | null = null;

export function getRandomDestination(): Destination {
  let destination: Destination;
  do {
    destination = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
  } while (destination === lastDestination && DESTINATIONS.length > 1);
  lastDestination = destination;
  return destination;
}
