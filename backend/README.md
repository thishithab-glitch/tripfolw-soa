# TripFlow Backend — Spring Boot REST API

This is the **reference Spring Boot backend** for TripFlow, a Multi-Destination Travel Package & Reservation Orchestration Platform. The frontend (React + Vite) is fully functional and currently runs on Supabase as its backend. This Spring Boot project is the SOA/microservices-ready REST API version for your college submission.

## Architecture

The backend follows a **layered architecture** (Controller → Service → Repository → Model) suitable for later conversion into microservices:

```
tripflow-backend/
├── pom.xml
├── src/main/java/com/tripflow/
│   ├── TripFlowApplication.java          # Spring Boot entry point
│   │
│   ├── config/                           # Configuration
│   │   └── CorsConfig.java               # CORS for frontend
│   │
│   ├── model/                            # JPA Entities (database tables)
│   │   ├── User.java
│   │   ├── TravelPackage.java
│   │   ├── Destination.java
│   │   ├── ItineraryDay.java
│   │   └── Booking.java
│   │
│   ├── repository/                       # Spring Data JPA Repositories
│   │   ├── UserRepository.java
│   │   ├── TravelPackageRepository.java
│   │   └── BookingRepository.java
│   │
│   ├── service/                          # Business Logic Layer
│   │   ├── UserService.java
│   │   ├── TravelPackageService.java
│   │   └── BookingService.java
│   │
│   └── controller/                       # REST Controllers
│       ├── UserController.java
│       ├── TravelPackageController.java
│       └── BookingController.java
│
├── src/main/resources/
│   ├── application.yml
│   └── data.sql                          # Seed data for packages
│
└── README.md
```

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.x**
- **Spring Data JPA** (Hibernate)
- **MySQL 8.x**
- **Spring Web** (REST API)
- **Maven**

## Database Schema (MySQL)

```sql
CREATE DATABASE tripflow_db;

-- Users table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Travel packages table
CREATE TABLE travel_packages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    tagline VARCHAR(300),
    description TEXT,
    duration_days INT NOT NULL,
    duration_nights INT NOT NULL,
    price DECIMAL(12,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 0.0,
    reviews INT DEFAULT 0,
    image_url VARCHAR(500),
    region VARCHAR(100),
    max_travelers INT DEFAULT 10
);

-- Destinations (many-to-one with package)
CREATE TABLE destinations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    package_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    highlights VARCHAR(500),
    FOREIGN KEY (package_id) REFERENCES travel_packages(id) ON DELETE CASCADE
);

-- Itinerary days (many-to-one with package)
CREATE TABLE itinerary_days (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    package_id BIGINT NOT NULL,
    day_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    FOREIGN KEY (package_id) REFERENCES travel_packages(id) ON DELETE CASCADE
);

-- Bookings table
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    package_id BIGINT NOT NULL,
    traveler_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    travel_date DATE NOT NULL,
    num_travelers INT NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (package_id) REFERENCES travel_packages(id)
);
```

## REST API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | User login |
| GET | `/api/users/{id}` | Get user by ID |

### Travel Packages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/packages` | Get all packages |
| GET | `/api/packages/{id}` | Get package by ID |
| GET | `/api/packages/search?destination=Goa` | Search by destination |
| GET | `/api/packages/filter?maxBudget=20000` | Filter by budget |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings/user/{userId}` | Get bookings for a user |
| POST | `/api/bookings` | Create a new booking |
| PUT | `/api/bookings/{id}/cancel` | Cancel a booking |

## Running the Backend

1. Ensure MySQL 8 is running and create the database:
   ```sql
   CREATE DATABASE tripflow_db;
   ```
2. Update credentials in `application.yml`
3. Run: `mvn spring-boot:run`
4. The API will be available at `http://localhost:8080`

## Microservices Conversion Path

The current monolithic structure maps cleanly to three microservices:

| Microservice | Controllers | Entities | Database |
|-------------|-------------|----------|----------|
| **User Service** | UserController | User | users_db |
| **Package Service** | TravelPackageController | TravelPackage, Destination, ItineraryDay | packages_db |
| **Booking Service** | BookingController | Booking | bookings_db |

Each service would become its own Spring Boot application with its own database, communicating via REST or an API Gateway.
