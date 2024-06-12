
CREATE TABLE CarModels (
    model_id INT AUTO_INCREMENT PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    UNIQUE (make, model, year) -- Ensure unique combinations of make, model, and year
);

CREATE TABLE Cars (
    car_id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL, -- Clerk's user ID
    model_id INT NOT NULL,
    starting_price DECIMAL(10, 2) NOT NULL,
    picture_urls TEXT[] NOT NULL,
    description: TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_available BOOLEAN DEFAULT TRUE, 
    FOREIGN KEY (model_id) REFERENCES CarModels(model_id)
);

CREATE TABLE Bids (
    bid_id SERIAL PRIMARY KEY,
    car_id INT NOT NULL,
    user_id VARCHAR(255) NOT NULL, -- Clerk's user ID
    bid_amount DECIMAL(10, 2) NOT NULL,
    bid_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES Cars(car_id)
);