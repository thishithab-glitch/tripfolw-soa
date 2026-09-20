export interface Destination {
  name: string;
  description: string;
  highlights: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TravelPackage {
  id: string;
  name: string;
  tagline: string;
  destinations: Destination[];
  durationDays: number;
  durationNights: number;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  description: string;
  itinerary: ItineraryDay[];
  availableDates: string[];
  maxTravelers: number;
  region: string;
}

export const packages: TravelPackage[] = [
  {
    id: 'goa-mumbai',
    name: 'Goa + Mumbai Coastal Escape',
    tagline: 'Beaches, nightlife and city vibes',
    region: 'West India',
    destinations: [
      {
        name: 'Goa',
        description: 'Sun-kissed beaches, Portuguese heritage and vibrant nightlife.',
        highlights: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls', 'Fort Aguada'],
      },
      {
        name: 'Mumbai',
        description: 'The city of dreams — iconic landmarks, street food and Bollywood.',
        highlights: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Colaba Causeway'],
      },
    ],
    durationDays: 5,
    durationNights: 4,
    price: 18999,
    rating: 4.6,
    reviews: 312,
    image: 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/4428274/pexels-photo-4428274.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6522109/pexels-photo-6522109.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/21319632/pexels-photo-21319632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description:
      'Experience the perfect blend of relaxation and city energy. Start with Goa\u2019s golden beaches and laid-back coastal charm, then head to Mumbai for iconic landmarks, bustling markets and unforgettable street food.',
    itinerary: [
      { day: 1, title: 'Arrival in Goa', description: 'Check in to your beach resort, evening at Baga Beach and a welcome dinner.' },
      { day: 2, title: 'North Goa Sightseeing', description: 'Visit Fort Aguada, Aguada Lighthouse and explore Old Goa churches.' },
      { day: 3, title: 'Dudhsagar Falls', description: 'Full-day excursion to the majestic Dudhsagar waterfalls with a jungle safari.' },
      { day: 4, title: 'Fly to Mumbai', description: 'Morning flight to Mumbai. Evening stroll along Marine Drive at sunset.' },
      { day: 5, title: 'Mumbai City Tour', description: 'Gateway of India, Elephanta Caves and Colaba Causeway shopping. Departure.' },
    ],
    availableDates: ['2026-10-05', '2026-10-19', '2026-11-02', '2026-11-16', '2026-12-07'],
    maxTravelers: 10,
  },
  {
    id: 'delhi-agra-jaipur',
    name: 'Delhi + Agra + Jaipur Golden Triangle',
    tagline: 'The classic heritage circuit',
    region: 'North India',
    destinations: [
      {
        name: 'Delhi',
        description: 'India\u2019s capital — a blend of Mughal history and modern architecture.',
        highlights: ['India Gate', 'Red Fort', 'Qutub Minar', 'Lotus Temple'],
      },
      {
        name: 'Agra',
        description: 'Home to the iconic Taj Mahal and Mughal-era monuments.',
        highlights: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh'],
      },
      {
        name: 'Jaipur',
        description: 'The Pink City — majestic forts, palaces and colorful bazaars.',
        highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar'],
      },
    ],
    durationDays: 6,
    durationNights: 5,
    price: 24999,
    rating: 4.8,
    reviews: 548,
    image: 'https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17423832/pexels-photo-17423832.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/925069/pexels-photo-925069.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description:
      'The most popular India tour covering three iconic cities. Explore Delhi\u2019s historic monuments, witness the timeless Taj Mahal in Agra, and immerse yourself in Jaipur\u2019s royal palaces and vibrant culture.',
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Visit India Gate, Rashtrapati Bhavan and Connaught Place. Welcome dinner.' },
      { day: 2, title: 'Old & New Delhi', description: 'Red Fort, Jama Masjid, Qutub Minar and Lotus Temple.' },
      { day: 3, title: 'Delhi to Agra', description: 'Drive to Agra. Visit Taj Mahal at sunset and Mehtab Bagh.' },
      { day: 4, title: 'Agra to Jaipur', description: 'Morning Agra Fort, then drive to Jaipur via Fatehpur Sikri.' },
      { day: 5, title: 'Jaipur Sightseeing', description: 'Amber Fort, City Palace, Hawa Mahal and Jantar Mantar.' },
      { day: 6, title: 'Departure', description: 'Morning at local bazaars. Transfer to airport for departure.' },
    ],
    availableDates: ['2026-10-08', '2026-10-22', '2026-11-05', '2026-11-19', '2026-12-10'],
    maxTravelers: 12,
  },
  {
    id: 'kerala-tour',
    name: 'Kerala Backwater Tour',
    tagline: 'God\u2019s Own Country',
    region: 'South India',
    destinations: [
      {
        name: 'Kochi',
        description: 'Historic port city with Chinese fishing nets and colonial architecture.',
        highlights: ['Fort Kochi', 'Chinese Fishing Nets', 'Mattancherry Palace', 'Jew Town'],
      },
      {
        name: 'Munnar',
        description: 'Rolling tea plantations and misty hills in the Western Ghats.',
        highlights: ['Tea Gardens', 'Eravikulam National Park', 'Mattupetty Dam', 'Top Station'],
      },
      {
        name: 'Alleppey',
        description: 'Serene backwaters and iconic houseboat stays.',
        highlights: ['Houseboat Cruise', 'Backwater Canals', 'Snake Boat Race', 'Coir Villages'],
      },
    ],
    durationDays: 5,
    durationNights: 4,
    price: 21999,
    rating: 4.7,
    reviews: 421,
    image: 'https://images.pexels.com/photos/34588372/pexels-photo-34588372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/34588372/pexels-photo-34588372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/17928231/pexels-photo-17928231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/12950219/pexels-photo-12950219.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/5639053/pexels-photo-5639053.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description:
      'Discover the tranquil beauty of Kerala — from the tea-carpeted hills of Munnar to the mesmerizing backwaters of Alleppey. A houseboat overnight stay makes this an unforgettable journey.',
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Fort Kochi walk, Chinese fishing nets and a Kathakali performance in the evening.' },
      { day: 2, title: 'Kochi to Munnar', description: 'Scenic drive to Munnar. Visit tea gardens and a spice plantation.' },
      { day: 3, title: 'Munnar Sightseeing', description: 'Eravikulam National Park, Mattupetty Dam and Top Station viewpoint.' },
      { day: 4, title: 'Munnar to Alleppey', description: 'Board a traditional houseboat for an overnight backwater cruise.' },
      { day: 5, title: 'Departure from Kochi', description: 'Disembark houseboat, drive to Kochi airport for departure.' },
    ],
    availableDates: ['2026-10-10', '2026-10-24', '2026-11-07', '2026-11-21', '2026-12-14'],
    maxTravelers: 8,
  },
  {
    id: 'hyderabad-hampi',
    name: 'Hyderabad + Hampi Heritage Trail',
    tagline: 'Nizam splendor meets ancient ruins',
    region: 'Deccan India',
    destinations: [
      {
        name: 'Hyderabad',
        description: 'City of Nizams — grand palaces, biryani and bazaars.',
        highlights: ['Charminar', 'Golconda Fort', 'Hussain Sagar', 'Chowmahalla Palace'],
      },
      {
        name: 'Hampi',
        description: 'UNESCO World Heritage ruins of the Vijayanagara Empire.',
        highlights: ['Virupaksha Temple', 'Vittala Temple', 'Lotus Mahal', 'Matanga Hill'],
      },
    ],
    durationDays: 4,
    durationNights: 3,
    price: 16499,
    rating: 4.5,
    reviews: 187,
    image: 'https://images.pexels.com/photos/38605003/pexels-photo-38605003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/38605003/pexels-photo-38605003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37626184/pexels-photo-37626184.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/37626183/pexels-photo-37626183.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/26969528/pexels-photo-26969528.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    description:
      'A journey through time — from the opulent palaces and bazaars of Hyderabad to the breathtaking ancient ruins of Hampi. Perfect for history buffs and culture lovers.',
    itinerary: [
      { day: 1, title: 'Arrival in Hyderabad', description: 'Visit Charminar, Laad Bazaar and enjoy authentic Hyderabadi biryani for dinner.' },
      { day: 2, title: 'Hyderabad Sightseeing', description: 'Golconda Fort, Qutb Shahi Tombs and Chowmahalla Palace.' },
      { day: 3, title: 'Travel to Hampi', description: 'Morning train/road to Hampi. Evening sunset at Matanga Hill.' },
      { day: 4, title: 'Hampi Ruins Tour', description: 'Virupaksha Temple, Vittala Temple complex and Lotus Mahal. Departure.' },
    ],
    availableDates: ['2026-10-12', '2026-10-26', '2026-11-09', '2026-11-23', '2026-12-18'],
    maxTravelers: 10,
  },
];

export function getPackageById(id: string): TravelPackage | undefined {
  return packages.find((p) => p.id === id);
}

export function getAllDestinations(): string[] {
  const set = new Set<string>();
  packages.forEach((p) => p.destinations.forEach((d) => set.add(d.name)));
  return Array.from(set).sort();
}
