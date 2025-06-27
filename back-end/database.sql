
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
    termsCondition BOOLEAN NOT NULL DEFAULT FALSE,
    payment VARCHAR(20),
    emailMe BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



-- ////////////////////////INSERTING ROOMS & SUITES\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


-------------- insert id:1:


BEGIN;
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

INSERT INTO room_square_footage (room_id, number, icon)
VALUES (1, 200, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (1, 1, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (1, 1, 'TbBath');

INSERT INTO amenities (name, icon)
VALUES 
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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

----------------------- insert id:2:

BEGIN;

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

INSERT INTO room_square_footage (room_id, number, icon)
VALUES (2, 250, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (2, 2, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (2, 1, 'TbBath');

INSERT INTO amenities (name, icon)
VALUES 
    ('Sitting Area', 'TbSofa')
ON CONFLICT (name) DO NOTHING;

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

INSERT INTO room_square_footage (room_id, number, icon)
VALUES (3, 350, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (3, 2, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (3, 2, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('Minibar', 'Minibar')  
ON CONFLICT (name) DO NOTHING;

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


----------------------- insert id:4:

BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (4, 400, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (4, 2, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (4, 2, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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


------------------ insert id:5  :

BEGIN;

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

INSERT INTO room_square_footage (room_id, number, icon)
VALUES (5, 600, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (5, 4, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (5, 3, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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


-------------------------- insert id:6  :

BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (6, 450, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (6, 3, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (6, 2, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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


----------------insert id:7 :

BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (7, 500, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (7, 2, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (7, 2, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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


------------- insert id :8 :
BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (8, 800, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (8, 6, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (8, 4, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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

------------------------- insert id:9 : 

BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (9, 1000, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (9, 8, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (9, 5, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Balcony', 'MdBalcony'),
    ('24-Hour Room Service', 'Tb24Hours'),
    ('Breakfast', 'MdOutlineFreeBreakfast')
ON CONFLICT (name) DO NOTHING;

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


---------------- insert id:10 : 
BEGIN;

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


INSERT INTO room_square_footage (room_id, number, icon)
VALUES (10, 550, 'GrCube');

INSERT INTO capacity (room_id, number, icon)
VALUES (10, 4, 'MdOutlinePeopleAlt');

INSERT INTO bath_number (room_id, number, icon)
VALUES (10, 2, 'TbBath');

INSERT INTO amenities (name, icon) VALUES
    ('TV', 'PiTelevisionSimpleThin'),
    ('Wi-Fi', 'FaWifi'),
    ('Air Conditioning', 'Air Conditioning'),
    ('Kitchenette', 'FaKitchenSet')
ON CONFLICT (name) DO NOTHING;

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
 'Legend Hotel is an absolute gem! From the moment I stepped into the elegant lobby, I knew my stay would be special. The attention to detail and the warm welcome from the staff made me feel like royalty. The coastal views from my room were breathtaking, and the culinary experience surpassed all expectations. Legend Hotel is more than a stay; it''s an immersive journey into luxury and comfort.'),
 
('David L., Business Traveler', '2023-11-02', 4.6, '/images/gallery/testimonial2.jpg',
 'As a frequent business traveler, Legend Hotel has set a new standard for excellence. The state-of-the-art meeting facilities, coupled with impeccable service, made my work trip exceptionally productive and enjoyable. The coastal locale provided a refreshing change of scenery, and the attention to detail from the staff ensured a seamless experience. I highly recommend Legend Hotel for both business and leisure stays.'),

('Emily and James P., Honeymooners', '2023-11-10', 4.7, '/images/gallery/testimonial3.jpg',
 'Our honeymoon at Legend Hotel was a dream come true. The romantic ambiance, coupled with the stunning coastal backdrop, created the perfect setting for our celebration of love. The spa treatments were heavenly, and the private beach access made our stay truly magical. Legend Hotel exceeded our expectations, and we''re already planning our anniversary trip back!'),

('Alex M., Adventure Seeker', '2023-11-20', 4.8, '/images/gallery/testimonial4.jpg',
 'Legend Hotel is not just a luxurious stay; it''s an adventure lover''s paradise. From windsurfing against the ocean breeze to exploring the vibrant streets of Batu Ferringhi, every moment was filled with excitement. The concierge team''s recommendations for local activities added an authentic touch to my stay. I left Legend Hotel with a suitcase full of memories and a longing to return.'),

('Linda K., Family Vacationer', '2023-11-30', 4.5, '/images/gallery/testimonial5.jpg',
 'Our family getaway at Legend Hotel was nothing short of extraordinary. The spacious accommodations comfortably accommodated our family, and the kids couldn''t get enough of the engaging activities organized by the hotel. From beach picnics to poolside fun, every day brought new adventures. The staff''s friendliness and genuine care for families truly made our stay remarkable. Legend Hotel has become our go-to destination for creating cherished family memories.'),

('Robert H., Golf Enthusiast', '2023-11-30', 4.6, '/images/gallery/testimonial6.jpg',
 'As an avid golfer, Legend Hotel''s proximity to world-class golf courses made it an ideal choice for my golf retreat. The concierge effortlessly arranged tee times, and returning to the hotel after a day on the green felt like coming home. The elegant surroundings, coupled with the serene coastal atmosphere, provided the perfect balance of relaxation and golfing excitement. Legend Hotel seamlessly caters to both my passion for golf and my desire for a luxurious escape.'),

('Nadia S., Culinary Connoisseur', '2023-12-05', 4.7, '/images/gallery/testimonial7.jpg',
 'For a culinary journey like no other, Legend Hotel is a gastronomic haven. Each meal was a masterpiece, a symphony of flavors meticulously crafted by the talented chefs. The diverse culinary offerings, from local delicacies to international fare, showcased the richness of the dining experience. The restaurant''s ambiance, coupled with the impeccable service, made every dining moment an unforgettable affair. Legend Hotel has truly elevated the art of dining.'),

('Samuel D., Wellness Seeker', '2023-12-11', 4.8, '/images/gallery/testimonial8.jpg',
 'In search of rejuvenation, I found my haven at Legend Hotel''s spa and wellness center. The holistic approach to well-being, coupled with expert therapists, offered a sanctuary for relaxation. From soothing massages to invigorating wellness classes, each element contributed to a revitalizing experience. The spa''s serene atmosphere, combined with the coastal setting, created the perfect backdrop for a wellness retreat. Legend Hotel exceeded my expectations, leaving me refreshed and renewed.');


-- ////////CREATE USER TABLE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\:
-- to delete all data and set it to 0: TRUNCATE TABLE tbluser RESTART IDENTITY;

CREATE TABLE tbluser (
    id SERIAL NOT NULL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    firebase_uid VARCHAR(100) ,
    username VARCHAR(50) NOT NULL,
    contact VARCHAR(15),
    accounts TEXT[],
    password TEXT,
    provider VARCHAR(10) NOT NULL DEFAULT 'local',
    country TEXT,
    currency VARCHAR(5) NOT NULL DEFAULT 'USD',
    user_role VARCHAR(10) NOT NULL DEFAULT 'customer' 
        CHECK (user_role IN ('customer', 'admin')),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



