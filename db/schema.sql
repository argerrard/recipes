CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    serving_size decimal(6,1) NOT NULL,
    measurement_type varchar(10) NOT NULL,
    verified boolean DEFAULT FALSE,
    calories decimal(10,2) NOT NULL,
    protein decimal(8,2) NOT NULL,
    fat decimal(8,2) NOT NULL,
    saturated_fat decimal(8,2),
    trans_fat decimal(8,2),
    cholesterol decimal(8,2),
    sodium decimal(8,2),
    potassium decimal(8,2),
    carbs decimal(8,2) NOT NULL,
    fiber decimal(8,2),
    sugar decimal(8,2)
);