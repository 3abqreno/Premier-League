-- Create Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10),
    city VARCHAR(50),
    address TEXT,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved BOOLEAN DEFAULT FALSE
);

-- Create Teams table
CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Create Stadiums table
CREATE TABLE IF NOT EXISTS stadiums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rows INTEGER NOT NULL,
    columns INTEGER NOT NULL
);

-- Create Matches table
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    home_team INTEGER REFERENCES teams(id) NOT NULL,
    away_team INTEGER REFERENCES teams(id) NOT NULL,
    venue_id INTEGER REFERENCES stadiums(id) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    main_referee VARCHAR(50) NOT NULL,
    linesman_1 VARCHAR(50) NOT NULL,
    linesman_2 VARCHAR(50) NOT NULL,
    ticket_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
    home_team_score INTEGER DEFAULT 0,
    away_team_score INTEGER DEFAULT 0,
    CONSTRAINT different_teams CHECK (home_team != away_team)
);

-- Create Seats table
CREATE TABLE IF NOT EXISTS seats (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id),
    "row" INTEGER NOT NULL,
    "column" INTEGER NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'AVAILABLE',
    CONSTRAINT unique_seat_position UNIQUE (match_id, "row", "column"),
    CONSTRAINT valid_status CHECK (status IN ('AVAILABLE', 'RESERVED'))

);

-- Create Reservations table
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    seat_id INTEGER REFERENCES seats(id),
    match_id INTEGER REFERENCES matches(id),
    reservation_date TIMESTAMP NOT NULL,
    ticket_number VARCHAR(50) NOT NULL,
    CONSTRAINT unique_seat_reservation UNIQUE (seat_id, match_id)

);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date_time);
CREATE INDEX IF NOT EXISTS idx_seats_match ON seats(match_id);
CREATE INDEX IF NOT EXISTS idx_seats_status ON seats(status);
CREATE INDEX IF NOT EXISTS idx_reservations_user ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_match ON reservations(match_id);
CREATE INDEX IF NOT EXISTS idx_reservations_ticket ON reservations(ticket_number);
