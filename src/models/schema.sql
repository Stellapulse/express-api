/*user schema/table*/

create Table users (
    user_id serial primary key,

    name varchar(100) Not NUll,

    email varchar(255) not null unique,
    
    password_hash TEXT NOT NULL,

    contact_number VARCHAR(10) UNIQUE NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);