export interface Booking {
  id: string;
  package_id: string;
  package_name: string;
  traveler_name: string;
  email: string;
  phone: string;
  travel_date: string;
  num_travelers: number;
  total_price: number;
  status: 'CONFIRMED' | 'CANCELLED';
  created_at: string;
}
