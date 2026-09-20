-- Seed data for TripFlow travel packages
-- Runs automatically on application startup (spring.sql.init.mode=always)

INSERT IGNORE INTO travel_packages
    (name, tagline, description, duration_days, duration_nights, price, rating, reviews, image_url, region, max_travelers)
VALUES
('Goa + Mumbai Coastal Escape', 'Beaches, nightlife and city vibes',
 'Experience the perfect blend of relaxation and city energy. Start with Goa''s golden beaches and laid-back coastal charm, then head to Mumbai for iconic landmarks, bustling markets and unforgettable street food.',
 5, 4, 18999.00, 4.6, 312,
 'https://images.pexels.com/photos/28368719/pexels-photo-28368719.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
 'West India', 10),

('Delhi + Agra + Jaipur Golden Triangle', 'The classic heritage circuit',
 'The most popular India tour covering three iconic cities. Explore Delhi''s historic monuments, witness the timeless Taj Mahal in Agra, and immerse yourself in Jaipur''s royal palaces and vibrant culture.',
 6, 5, 24999.00, 4.8, 548,
 'https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
 'North India', 12),

('Kerala Backwater Tour', 'God''s Own Country',
 'Discover the tranquil beauty of Kerala — from the tea-carpeted hills of Munnar to the mesmerizing backwaters of Alleppey. A houseboat overnight stay makes this an unforgettable journey.',
 5, 4, 21999.00, 4.7, 421,
 'https://images.pexels.com/photos/34588372/pexels-photo-34588372.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
 'South India', 8),

('Hyderabad + Hampi Heritage Trail', 'Nizam splendor meets ancient ruins',
 'A journey through time — from the opulent palaces and bazaars of Hyderabad to the breathtaking ancient ruins of Hampi. Perfect for history buffs and culture lovers.',
 4, 3, 16499.00, 4.5, 187,
 'https://images.pexels.com/photos/38605003/pexels-photo-38605003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
 'Deccan India', 10);
