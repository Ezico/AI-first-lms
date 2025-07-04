
CREATE TABLE IF NOT EXISTS "User" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO "User" (name, email, password, role)
VALUES 
  ('Admin User', 'admin@aifirst.academy', 'admin123', 'admin'),
  ('Regular User', 'user@aifirst.academy', 'user123', 'user')
ON CONFLICT (email) DO NOTHING;

SELECT * FROM "User";
