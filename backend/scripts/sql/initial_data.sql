-- Insert initial admin user (password: admin123)
INSERT INTO users (
    username, 
    password, 
    first_name, 
    last_name, 
    birth_date, 
    email, 
    role, 
    approved
) VALUES (
    'admin',
    '$2b$12$76pKp0l3QWbIwpSmS5u3Ue3D01Y.HRfigFrwLMrUHV7GEN9i1FAU6',  -- hashed 'admin123'
    'Admin',
    'User',
    '2000-01-01',
    'admin@example.com',
    'admin',
    true
) ON CONFLICT DO NOTHING;

-- Insert some sample teams
INSERT INTO teams (name) VALUES 
    ('Team A'),
    ('Team B'),
    ('Team C'),
    ('Team D')
ON CONFLICT DO NOTHING;

-- Insert a sample stadium
INSERT INTO stadiums (name, rows, columns) VALUES 
    ('Main Stadium', 20, 5),
    ('Secondary Stadium', 15, 8)
ON CONFLICT DO NOTHING;
