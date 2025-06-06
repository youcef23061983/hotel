
-- //////////////////////CREATING  rooms ,capacity,bath_number,amenities,bookings TABLES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

-- Main rooms table (unchanged)
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('room', 'suite')),
    introduction TEXT,
    max_children INT NOT NULL DEFAULT 0,
    max_pets INT NOT NULL DEFAULT 0,
    pets_allowed BOOLEAN NOT NULL DEFAULT FALSE,
    butler_service BOOLEAN NOT NULL DEFAULT FALSE,
    unavailables DATE[] DEFAULT array[]::DATE[],
    view VARCHAR(50),
    living_room BOOLEAN NOT NULL DEFAULT FALSE,
    breakfast BOOLEAN NOT NULL DEFAULT FALSE,
    price DECIMAL(10, 2) NOT NULL,  -- Changed from NUMBER to DECIMAL for proper monetary values
    images TEXT[] DEFAULT array[]::TEXT[],
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Room measurements (unchanged)
CREATE TABLE room_square_footage (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    number INT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    UNIQUE (room_id)
);

-- Room capacity (unchanged)
CREATE TABLE capacity (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    number INT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    UNIQUE (room_id)
);

-- Bath number (unchanged)
CREATE TABLE bath_number (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    number INT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    UNIQUE (room_id)
);

-- Improved amenities table (without room_id)
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (name)
);

-- Room-amenity relationship (unchanged)
CREATE TABLE room_amenities (
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    amenity_id INT NOT NULL REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (room_id, amenity_id)
);




CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    arrival DATE NOT NULL,
    departure DATE NOT NULL,
    dates DATE[] DEFAULT ARRAY[]::DATE[],
    price DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    title VARCHAR(10),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    countryCode VARCHAR(10),
    phoneNumber VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    city VARCHAR(100),
    nationality VARCHAR(100),
    creditCardNumber VARCHAR(20),
    expirationMonth VARCHAR(2),
    year VARCHAR(4),
    securityCode VARCHAR(4),
    nameHolder VARCHAR(100),
    termsCondition BOOLEAN NOT NULL DEFAULT FALSE,
    emailMe BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



-- ////////////////////////INSERTING ROOMS & SUITES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


BEGIN;

-- 1. Insert into rooms
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Standard Single Room',
    'room',
    'Indulge in the cozy embrace of our Standard Single Room, a retreat designed for solo travelers seeking tranquility. Enjoy the breathtaking City view from your balcony, and relish in amenities such as a TV, Wi-Fi, and 24-Hour Room Service. Immerse yourself in the comfort of a well-appointed space where every detail is crafted for your convenience.',
    0,
    0,
    FALSE,
    FALSE,
    ARRAY[]::DATE[],
    'City',
    FALSE,
    TRUE,
    120.00,
    ARRAY[
        '/images/rooms/standard single room/img1.jpg',
        '/images/rooms/standard single room/img2.jpg',
        '/images/rooms/standard single room/img3.jpg'
    ],
    'A comfortable room with a fantastic city view. The 24-hour room service was a lifesaver!'
)
RETURNING id;

-- Assume the returned ID is 1 for the example below.
-- If using a script, store this returned ID into a variable (e.g., in psql: `\gset`).

-- 2. Insert into room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (1, 200, 'GrCube');

-- 3. Insert into capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (1, 1, 'MdOutlinePeopleAlt');

-- 4. Insert into bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (1, 1, 'TbBath');

-- 5. Insert amenities (with conflict protection)
INSERT INTO amenities (name, icon)
VALUES 
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Insert into room_amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 1, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;

-- insert id:2
BEGIN;

-- 1. Insert into rooms (let id auto-generate)
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Standard Double Room',
    'room',
    'Elevate your stay in the city with our spacious Standard Double Room. Ideal for couples or small families, this room features a charming balcony, a sitting area, and the convenience of 24-Hour Room Service. Bask in the City view and experience the perfect blend of luxury and functionality.',
    1,
    1,
    TRUE,
    FALSE,
    ARRAY[]::DATE[],
    'City',
    FALSE,
    TRUE,
    150.00,
    ARRAY[
        '/images/rooms/standard double room/img1.jpg',
        '/images/rooms/standard double room/img2.jpg',
        '/images/rooms/standard double room/img3.jpg'
    ],
    'Spacious room with a lovely balcony. Enjoyed the sitting area and breakfast service.'
)
RETURNING id;

-- Assume id is 2 in example below
-- Replace this hardcoded ID with variable if using a script
-- 2. Insert into room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (2, 250, 'GrCube');

-- 3. Insert into capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (2, 2, 'MdOutlinePeopleAlt');

-- 4. Insert into bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (2, 1, 'TbBath');

-- 5. Insert any new amenities (conflict-safe)
INSERT INTO amenities (name, icon)
VALUES 
    ('Sitting Area', 'TbSofa')
ON CONFLICT (name) DO NOTHING;

-- 6. Insert into room_amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 2, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast',
    'Sitting Area'
);

COMMIT;


-- insert id:3 :
BEGIN;

-- 1. Insert room (let id auto-generate)
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Deluxe Double Room',
    'room',
    'Step into the Deluxe Double Room, where elegance meets tranquility. With a garden view, this room offers a serene escape. Indulge in amenities like TV, Wi-Fi, Minibar, and a private balcony. Experience a charming stay surrounded by lush greenery and exceptional comfort.',
    2,
    2,
    TRUE,
    FALSE,
    ARRAY[]::DATE[],
    'Garden',
    FALSE,
    TRUE,
    200.00,
    ARRAY[
        '/images/rooms/deluxe double room/img1.jpg',
        '/images/rooms/deluxe double room/img2.jpg',
        '/images/rooms/deluxe double room/img3.jpg'
    ],
    'Charming Deluxe Double Room with a tranquil garden view. The additional amenities like minibar and balcony added a touch of luxury to our stay.'
)
RETURNING id;

-- ⚠️ In real SQL environment, capture the returned id.
-- For now, assume id = 3

-- 2. Insert into room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (3, 350, 'GrCube');

-- 3. Insert into capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (3, 2, 'MdOutlinePeopleAlt');

-- 4. Insert into bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (3, 2, 'TbBath');

-- 5. Insert new amenities (safely handles duplicates)
INSERT INTO amenities (name, icon) VALUES
    ('Minibar', 'Minibar')  -- new amenity
ON CONFLICT (name) DO NOTHING;

-- 6. Insert into room_amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 3, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast',
    'Minibar'
);

COMMIT;


-- insert id:4:
BEGIN;

-- 1. Insert the suite into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Junior Suite',
    'suite',
    'Our Junior Suite is a sanctuary of sophistication with a mesmerizing Sea view. Enjoy the spacious living room, a private balcony, and the impeccable service of a personal butler. Revel in the harmonious blend of luxury and modernity that defines this unique suite.',
    1,
    1,
    TRUE,
    TRUE,
    ARRAY[]::DATE[],
    'Sea',
    TRUE,
    TRUE,
    250.00,
    ARRAY[
        '/images/suites/junior suite/img1.jpg',
        '/images/suites/junior suite/img2.jpg',
        '/images/suites/junior suite/img3.jpg',
        '/images/suites/junior suite/img4.jpg'
    ],
    'Sophisticated Junior Suite with a mesmerizing sea view. The living room and butler service made our stay extra special. A perfect blend of elegance and comfort.'
)
RETURNING id;

-- Assume returned id = 4 for the following inserts

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (4, 400, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (4, 2, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (4, 2, 'TbBath');

-- 5. Insert amenities if new, or ignore duplicates
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 4, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;


-- insert id:5  :
BEGIN;

-- 1. Insert the suite into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Executive Suite',
    'suite',
    'Unwind in the lap of luxury with our Executive Suite, overlooking the expansive Sea. This suite features a spacious living room, a private balcony, and top-notch amenities, including 24-Hour Room Service. Immerse yourself in a world of opulence and unparalleled comfort.',
    2,
    2,
    FALSE,
    TRUE,
    ARRAY[]::DATE[],
    'Sea',
    TRUE,
    TRUE,
    350.00,
    ARRAY[
        '/images/suites/executive suite/img1.jpg',
        '/images/suites/executive suite/img2.jpg',
        '/images/suites/executive suite/img3.jpg',
        '/images/suites/executive suite/img4.jpg'
    ],
    'Exceptional Executive Suite overlooking the sea. The spacious living room and top-notch amenities, including the balcony and 24-hour room service, made our stay unforgettable.'
)
RETURNING id;

-- Assume returned id = 5 for the following inserts

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (5, 600, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (5, 4, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (5, 3, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 5, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;


-- insert id:6  :
BEGIN;

-- 1. Insert into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Terrace Suite',
    'suite',
    'The Terrace Suite invites you to experience comfort with a touch of outdoor relaxation. Revel in the Sea view from your private terrace, and enjoy amenities like TV, Wi-Fi, and Air Conditioning. This suite offers a perfect blend of tranquility and luxury.',
    1,
    1,
    TRUE,
    TRUE,
    ARRAY[]::DATE[],
    'Sea',
    TRUE,
    TRUE,
    300.00,
    ARRAY[
        '/images/suites/terrace suite/img1.jpg',
        '/images/suites/terrace suite/img2.jpg',
        '/images/suites/terrace suite/img3.jpg',
        '/images/suites/terrace suite/img4.jpg'
    ],
    'Inviting Terrace Suite with a stunning sea view. The private terrace was a delightful spot to unwind. A perfect choice for those seeking comfort with a touch of outdoor relaxation.'
)
RETURNING id;

-- Assume returned id = 6

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (6, 450, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (6, 3, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (6, 2, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 6, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;


-- insert id:7 ::----------------------
BEGIN;

-- 1. Insert into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Garden Loft',
    'suite',
    'Discover the quaint charm of our Garden Loft, offering a delightful Garden view. Immerse yourself in a cozy atmosphere with essential amenities like TV, Wi-Fi, and a balcony. Experience a stay that combines simplicity with modern comfort.',
    1,
    1,
    TRUE,
    FALSE,
    ARRAY[]::DATE[],
    'Garden',
    FALSE,
    TRUE,
    280.00,
    ARRAY[
        '/images/suites/garden loft/img1.jpg',
        '/images/suites/garden loft/img2.jpg',
        '/images/suites/garden loft/img3.jpg',
        '/images/suites/garden loft/img4.jpg'
    ],
    'Quaint Garden Loft with a lovely garden view. The cozy atmosphere and essential amenities like TV, Wi-Fi, and balcony made our stay delightful.'
)
RETURNING id;

-- Assume returned id = 7

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (7, 500, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (7, 2, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (7, 2, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 7, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;


-- insert id :8 :----------------
BEGIN;

-- 1. Insert into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Presidential Suite',
    'suite',
    'Indulge in the epitome of luxury with our Presidential Suite, offering breathtaking Sea views. This suite features a spacious living room, a private balcony, and the exclusive service of a personal butler. Immerse yourself in a world of grandeur and unparalleled luxury.',
    3,
    2,
    FALSE,
    TRUE,
    ARRAY[]::DATE[],
    'Sea',
    TRUE,
    TRUE,
    700.00,
    ARRAY[
        '/images/suites/presidential suite/img1.jpg',
        '/images/suites/presidential suite/img2.jpg',
        '/images/suites/presidential suite/img3.jpg',
        '/images/suites/presidential suite/img4.jpg'
    ],
    'Opulent Presidential Suite with breathtaking sea views. The spacious living room, private balcony, and 24-hour room service exceeded our expectations. A truly luxurious experience.'
)
RETURNING id;

-- Assume returned id = 8

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (8, 800, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (8, 6, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (8, 4, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 8, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;

-- insert id:9 : --------------------
BEGIN;

-- 1. Insert into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Penthouse Suite',
    'suite',
    'Experience the height of indulgence in our Penthouse Suite, boasting expansive Sea views. This suite features a private terrace, a living room, and top-tier amenities, including a private jacuzzi. Elevate your stay to new heights of luxury and sophistication.',
    4,
    2,
    TRUE,
    TRUE,
    ARRAY[]::DATE[],
    'Sea',
    TRUE,
    TRUE,
    900.00,
    ARRAY[
        '/images/suites/phenthouse suite/img1.jpg',
        '/images/suites/phenthouse suite/img2.jpg',
        '/images/suites/phenthouse suite/img3.jpg',
        '/images/suites/phenthouse suite/img4.jpg',
        '/images/suites/phenthouse suite/img5.jpg',
        '/images/suites/phenthouse suite/img5.jpg'
    ],
    'Sumptuous Penthouse Suite with expansive sea views. The private terrace and top-tier amenities, including a private jacuzzi, created an unforgettable and indulgent stay.'
)
RETURNING id;

-- Assume returned id = 9

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (9, 1000, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (9, 8, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (9, 5, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 9, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Balcony',
    '24-Hour Room Service',
    'Breakfast'
);

COMMIT;


-- insert id:10 : --------------------
BEGIN;

-- 1. Insert into rooms table
INSERT INTO rooms (
    name, type, introduction, max_children, max_pets, pets_allowed,
    butler_service, unavailables, view, living_room, breakfast,
    price, images, feedback
) VALUES (
    'Two-Bedroom Family Room',
    'room',
    'Sumptuous Penthouse Suite with expansive sea views. The private terrace and top-tier amenities, including a private jacuzzi, created an unforgettable and indulgent stay.',
    2,
    2,
    TRUE,
    FALSE,
    ARRAY[]::DATE[],
    'City',
    TRUE,
    TRUE,
    400.00,
    ARRAY[
        '/images/suites/two bedroom family suite/img1.jpg',
        '/images/suites/two bedroom family suite/img2.jpg',
        '/images/suites/two bedroom family suite/img3.jpg',
        '/images/suites/two bedroom family suite/img4.jpg',
        '/images/suites/two bedroom family suite/img5.jpg',
        '/images/suites/two bedroom family suite/img6.jpg'
    ],
    'Perfect for a family vacation. The kitchenette made it easy to prepare meals. Loved the sitting area and balcony.'
)
RETURNING id;

-- Assume returned id = 10

-- 2. Insert room_square_footage
INSERT INTO room_square_footage (room_id, number, icon)
VALUES (10, 550, 'GrCube');

-- 3. Insert capacity
INSERT INTO capacity (room_id, number, icon)
VALUES (10, 4, 'MdOutlinePeopleAlt');

-- 4. Insert bath_number
INSERT INTO bath_number (room_id, number, icon)
VALUES (10, 2, 'TbBath');

-- 5. Insert amenities if not already present
INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Kitchenette', 'FaKitchenSet')
ON CONFLICT (name) DO NOTHING;

-- 6. Link room to amenities
INSERT INTO room_amenities (room_id, amenity_id)
SELECT 10, id FROM amenities
WHERE name IN (
    'TV',
    'Wi-Fi',
    'Air Conditioning',
    'Kitchenette'
);

COMMIT;



-- ////////////////CREATE gallery TABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\
CREATE TABLE gallery (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  images TEXT[] NOT NULL
);



-- ///////////INSERTING GALLERY IMAGES\\\\\\\\\\\\\\\\\\\\\\\\\\\
INSERT INTO gallery (type, images)
VALUES (
  'hotel',
  ARRAY[
    '/images/homepage/img1.jpg',
    '/images/homepage/img2.jpg',
    '/images/homepage/img3.jpg',
    '/images/homepage/img4.jpg',
    '/images/homepage/img5.jpg',
    '/images/homepage/img6.jpg',
    '/images/homepage/img7.jpg',
    '/images/homepage/img8.jpg',
    '/images/homepage/img9.jpg',
    '/images/homepage/img10.jpg',
    '/images/homepage/img11.jpg'
  ]
);

INSERT INTO gallery (type, images)
VALUES (
  'Rooms & Suites',
  ARRAY[
    '/images/rooms/standard single room/img1.jpg',
    '/images/rooms/standard double room/img1.jpg',
    '/images/rooms/deluxe double room/img1.jpg',
    '/images/suites/junior suite/img1.jpg',
    '/images/suites/executive suite/img1.jpg',
    '/images/suites/terrace suite/img1.jpg',
    '/images/suites/garden loft/img1.jpg',
    '/images/suites/presidential suite/img1.jpg',
    '/images/suites/phenthouse suite/img1.jpg',
    '/images/suites/two bedroom family suite/img1.jpg'
  ]
);
INSERT INTO gallery (type, images)
VALUES (
  'Wellnes',
  ARRAY[
    '/images/wellness/wellness.jpg',
    '/images/wellness/img1.jpg',
    '/images/wellness/img2.jpg',
    '/images/wellness/img3.jpg',
    '/images/wellness/img4.jpg',
    '/images/wellness/img5.jpg',
    '/images/wellness/img6.jpg',
    '/images/wellness/img7.jpg',
    '/images/wellness/img8.jpg',
    '/images/wellness/img9.jpg',
    '/images/wellness/img10.jpg',
    '/images/wellness/img11.jpg',
    '/images/wellness/img12.jpg',
    '/images/wellness/img13.jpg',
    '/images/wellness/img14.jpg',
    '/images/wellness/img15.jpg',
    '/images/wellness/img16.jpg',
    '/images/wellness/img17.jpg',
    '/images/wellness/img18.jpg',
    '/images/wellness/img19.jpg',
    '/images/wellness/img20.jpg'
  ]
);
INSERT INTO gallery (type, images)
VALUES (
  'Restaurants',
  ARRAY[
    '/images/restaurants/img1.jpg',
    '/images/restaurants/img2.jpg',
    '/images/restaurants/img3.jpg',
    '/images/restaurants/img4.jpg',
    '/images/restaurants/img5.jpg',
    '/images/restaurants/img6.jpg',
    '/images/restaurants/img7.jpg',
    '/images/restaurants/img8.jpg',
    '/images/restaurants/img9.jpg',
    '/images/restaurants/img10.jpg',
    '/images/restaurants/img11.jpg',
    '/images/restaurants/img12.jpg',
    '/images/restaurants/img13.jpg',
    '/images/restaurants/img14.jpg',
    '/images/restaurants/img15.jpg'
  ]
);
-- Experience
INSERT INTO gallery (type, images)
VALUES (
  'Experience',
  ARRAY[
    '/images/experience/Kayaking1.jpg',
    '/images/experience/Kayaking2.jpg',
    '/images/experience/Kayaking3.jpg',
    '/images/experience/Parasailing1.jpg',
    '/images/experience/Parasailing2.jpg',
    '/images/experience/Parasailing3.jpg',
    '/images/experience/Snorkeling1.jpg',
    '/images/experience/Snorkeling2.jpg',
    '/images/experience/Snorkeling3.jpg',
    '/images/experience/Stand-up Paddleboarding (SUP)1.jpg',
    '/images/experience/Stand-up Paddleboarding (SUP)2.jpg',
    '/images/experience/Stand-up Paddleboarding (SUP)3.jpg',
    '/images/experience/Windsurfing1.jpg',
    '/images/experience/Windsurfing2.jpg',
    '/images/experience/Windsurfing3.jpg',
    '/images/experience/experience.jpg'
  ]
);

-- Events
INSERT INTO gallery (type, images)
VALUES (
  'Events',
  ARRAY[
    '/images/events/img1.jpg',
    '/images/events/img2.jpg',
    '/images/events/img3.jpg',
    '/images/events/img4.jpg',
    '/images/events/img5.jpg',
    '/images/events/img6.jpg',
    '/images/events/img7.jpg',
    '/images/events/img8.jpg',
    '/images/events/img9.jpg',
    '/images/events/img10.jpg'
  ]
);

-- Header
INSERT INTO gallery (type, images)
VALUES (
  'header',
  ARRAY[
    '/images/header/roomsheader.jpg'
  ]
);

-- aboutUs
INSERT INTO gallery (type, images)
VALUES (
  'aboutUs',
  ARRAY[
    '/images/gallery/about1.jpg',
    '/images/gallery/about2.jpg',
    '/images/gallery/about3.jpg',
    '/images/gallery/google.jpg',
    '/images/gallery/map.jpg',
    '/images/gallery/testimonial.jpg',
    '/images/gallery/privacyPolicy.jpg',
    '/images/gallery/terms.jpg',
    '/images/gallery/cookies.jpg',
    '/images/gallery/booking.jpg'
  ]
);

-- ////////////////////////CREATE ALBUM TABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
CREATE TABLE album (
  id SERIAL PRIMARY KEY,
  type VARCHAR(100),
  images TEXT[]
);


-- ////////////////////INSERTING ALBUMS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
INSERT INTO album (type, images)
VALUES (
  'room',
  ARRAY[
    '/images/gallery/room1.jpg',
    '/images/gallery/room2.jpg',
    '/images/gallery/room3.jpg',
    '/images/gallery/room4.jpg',
    '/images/gallery/room5.jpg'
  ]
);
-- Dinning
INSERT INTO album (type, images) VALUES (
  'dinning',
  ARRAY[
    '/images/gallery/restaurant1.jpg',
    '/images/gallery/restaurant2.jpg',
    '/images/gallery/restaurant3.jpg',
    '/images/gallery/restaurant4.jpg',
    '/images/gallery/restaurant5.jpg'
  ]
);

-- Wellness
INSERT INTO album (type, images) VALUES (
  'Wellnes',
  ARRAY[
    '/images/gallery/wellness1.jpg',
    '/images/gallery/wellness2.jpg',
    '/images/gallery/wellness3.jpg',
    '/images/gallery/wellness4.jpg',
    '/images/gallery/wellness5.jpg',
    '/images/gallery/wellness6.jpg'
  ]
);

-- Experiences
INSERT INTO album (type, images) VALUES (
  'experiences',
  ARRAY[
    '/images/gallery/experience1.jpg',
    '/images/gallery/experience2.jpg',
    '/images/gallery/experience3.jpg',
    '/images/gallery/experience4.jpg',
    '/images/gallery/experience5.jpg',
    '/images/gallery/experience6.jpg',
    '/images/gallery/experience7.jpg',
    '/images/gallery/experience8.jpg',
    '/images/gallery/experience9.jpg',
    '/images/gallery/experience10.jpg',
    '/images/gallery/experience11.jpg',
    '/images/gallery/experience12.jpg',
    '/images/gallery/experience13.jpg',
    '/images/gallery/experience14.jpg',
    '/images/gallery/experience15.jpg'
  ]
);

-- Events
INSERT INTO album (type, images) VALUES (
  'events',
  ARRAY[
    '/images/gallery/event1.jpg',
    '/images/gallery/event2.jpg',
    '/images/gallery/event3.jpg',
    '/images/gallery/event4.jpg',
    '/images/gallery/event5.jpg',
    '/images/gallery/event6.jpg',
    '/images/gallery/event7.jpg',
    '/images/gallery/event8.jpg',
    '/images/gallery/event9.jpg'
  ]
);

-- Guests
INSERT INTO album (type, images) VALUES (
  'guests',
  ARRAY[
    '/images/gallery/guest1.jpg',
    '/images/gallery/guest2.jpg',
    '/images/gallery/guest3.jpg',
    '/images/gallery/guest4.jpg',
    '/images/gallery/guest5.jpg',
    '/images/gallery/guest6.jpg',
    '/images/gallery/guest7.jpg',
    '/images/gallery/guest8.jpg'
  ]
);


-- ///////////////////////////CREATE TESTIMONIALS TABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  rating NUMERIC(2,1) CHECK (rating >= 0 AND rating <= 5),
  img TEXT,
  text TEXT
);


-- ///////////////////////INSERTING TESTIMONIALS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
INSERT INTO testimonials (name, date, rating, img, text) VALUES
('Sophie W., Travel Enthusiast', '2023-10-20', 4.5, '/images/gallery/testimonial1.jpg',
 'Legend Hotel is an absolute gem! From the moment I stepped into the elegant lobby...'),

('David L., Business Traveler', '2023-11-02', 4.6, '/images/gallery/testimonial2.jpg',
 'As a frequent business traveler, Legend Hotel has set a new standard for excellence...'),

('Emily and James P., Honeymooners', '2023-11-10', 4.7, '/images/gallery/testimonial3.jpg',
 'Our honeymoon at Legend Hotel was a dream come true...'),

('Alex M., Adventure Seeker', '2023-11-20', 4.8, '/images/gallery/testimonial4.jpg',
 'Legend Hotel is not just a luxurious stay; it''s an adventure lover''s paradise...'),

('Linda K., Family Vacationer', '2023-11-30', 4.5, '/images/gallery/testimonial5.jpg',
 'Our family getaway at Legend Hotel was nothing short of extraordinary...'),

('Robert H., Golf Enthusiast', '2023-11-30', 4.6, '/images/gallery/testimonial6.jpg',
 'As an avid golfer, Legend Hotel''s proximity to world-class golf courses...'),

('Nadia S., Culinary Connoisseur', '2023-12-05', 4.7, '/images/gallery/testimonial7.jpg',
 'For a culinary journey like no other, Legend Hotel is a gastronomic haven...'),

('Samuel D., Wellness Seeker', '2023-12-11', 4.8, '/images/gallery/testimonial8.jpg',
 'In search of rejuvenation, I found my haven at Legend Hotel''s spa and wellness center...');





