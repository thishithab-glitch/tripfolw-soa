/*
# Create bookings table for TripFlow

## Overview
TripFlow is a multi-destination travel package reservation platform. Users browse
travel packages (static/sample data served from the frontend), sign in, and create
bookings for a selected package on a chosen date with a number of travelers.
Each authenticated user can view and cancel their own bookings.

## New Tables

### bookings
- `id` (uuid, primary key, auto-generated)
- `user_id` (uuid, not null, defaults to the authenticated user — references auth.users with cascade delete)
- `package_id` (text, not null) — slug identifying the static package (e.g. "goa-mumbai")
- `package_name` (text, not null) — denormalized package title at booking time
- `traveler_name` (text, not null) — lead traveler full name
- `email` (text, not null) — contact email
- `phone` (text, not null) — contact phone
- `travel_date` (date, not null) — selected departure date
- `num_travelers` (integer, not null, check >= 1)
- `total_price` (numeric(12,2), not null, check >= 0) — total cost at booking time
- `status` (text, not null, default 'CONFIRMED') — CONFIRMED or CANCELLED
- `created_at` (timestamptz, default now())

## Security
- Row Level Security ENABLED on bookings.
- Four owner-scoped policies (SELECT/INSERT/UPDATE/DELETE) scoped TO authenticated
  using auth.uid() = user_id.
- user_id defaults to auth.uid() so frontend inserts that omit user_id succeed.
- No public/anon access — users must be signed in to book or view bookings.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  package_id text NOT NULL,
  package_name text NOT NULL,
  traveler_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  travel_date date NOT NULL,
  num_travelers integer NOT NULL CHECK (num_travelers >= 1),
  total_price numeric(12,2) NOT NULL CHECK (total_price >= 0),
  status text NOT NULL DEFAULT 'CONFIRMED' CHECK (status IN ('CONFIRMED', 'CANCELLED')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bookings" ON bookings;
CREATE POLICY "select_own_bookings" ON bookings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bookings" ON bookings;
CREATE POLICY "insert_own_bookings" ON bookings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bookings" ON bookings;
CREATE POLICY "update_own_bookings" ON bookings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bookings" ON bookings;
CREATE POLICY "delete_own_bookings" ON bookings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
