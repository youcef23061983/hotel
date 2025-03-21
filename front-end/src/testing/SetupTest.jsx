import * as matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock for matchMedia
const mockMatchMedia = (matches) => ({
  matches,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
});

if (typeof window !== "undefined") {
  window.matchMedia = vi.fn().mockImplementation((query) => {
    return mockMatchMedia(false);
  });
}
export const mockData = [
  {
    id: 1,
    name: "single",
    room_square_footage: {
      number: 200,
      icon: "GrCube",
    },
    capacity: {
      number: 1,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 0,
    max_pets: 0,
    pets_allowed: false,
    butler_service: false,
    iving_room: false,
    breakfast: true,
    price: 120,

    type: "room",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 2,
    name: "double",
    type: "dining",
    room_square_footage: {
      number: 150,
      icon: "GrCube",
    },
    capacity: {
      number: 2,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 0,
    max_pets: 0,
    pets_allowed: false,
    butler_service: false,
    iving_room: false,
    breakfast: true,
    price: 110,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 3,
    name: "terace",
    type: "room",
    room_square_footage: {
      number: 300,
      icon: "GrCube",
    },
    capacity: {
      number: 3,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 0,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 170,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 4,
    name: "garden",
    type: "guest",
    room_square_footage: {
      number: 350,
      icon: "GrCube",
    },
    capacity: {
      number: 4,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 0,
    max_pets: 0,
    pets_allowed: false,
    butler_service: false,
    iving_room: false,
    breakfast: true,
    price: 100,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image8.jpg",
      "https://hotel.com/image10.jpg",
      "https://hotel.com/image11.jpg",
      "https://hotel.com/image12.jpg",
      "https://hotel.com/image13.jpg",
      "https://hotel.com/image14.jpg",
    ],
  },
  {
    id: 5,
    name: "presidential",
    type: "room",
    room_square_footage: {
      number: 400,
      icon: "GrCube",
    },
    capacity: {
      number: 5,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 4,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 90,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 6,
    name: "penthouse",
    type: "room",
    room_square_footage: {
      number: 450,
      icon: "GrCube",
    },
    capacity: {
      number: 3,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 3,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 130,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 7,
    name: "junior",
    type: "events",
    room_square_footage: {
      number: 450,
      icon: "GrCube",
    },
    capacity: {
      number: 1,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 2,
    max_pets: 0,
    pets_allowed: false,
    butler_service: false,
    iving_room: false,
    breakfast: true,
    price: 80,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 8,
    name: "deluxe",
    type: "room",
    room_square_footage: {
      number: 500,
      icon: "GrCube",
    },
    capacity: {
      number: 4,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 1,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 150,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 9,
    name: "Executive",
    type: "Suite",
    room_square_footage: {
      number: 500,
      icon: "GrCube",
    },
    capacity: {
      number: 2,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 1,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 180,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    id: 10,
    name: "Two-Bedroom",
    type: "room",
    room_square_footage: {
      number: 500,
      icon: "GrCube",
    },
    capacity: {
      number: 4,
      icon: "MdOutlinePeopleAlt",
    },
    max_children: 1,
    max_pets: 0,
    pets_allowed: false,
    butler_service: true,
    iving_room: false,
    breakfast: true,
    price: 120,

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
];
export const mockData3 = [
  {
    name: "you",
    type: "room",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "yohju",
    type: "dining",

    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "yhjfou",
    type: "suite",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "yohgdu",
    type: "guest",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image8.jpg",
      "https://hotel.com/image10.jpg",
      "https://hotel.com/image11.jpg",
      "https://hotel.com/image12.jpg",
      "https://hotel.com/image13.jpg",
      "https://hotel.com/image14.jpg",
    ],
  },
  {
    name: "yooyfu",
    type: "Wellnes",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "sqdqsf",
    type: "experiences",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "fgrg",
    type: "events",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
  {
    name: "ituk",
    type: "visitor",
    images: [
      "https://hotel.com/image1.jpg",
      "https://hotel.com/image2.jpg",
      "https://hotel.com/image3.jpg",
      "https://hotel.com/image4.jpg",
      "https://hotel.com/image5.jpg",
      "https://hotel.com/image6.jpg",
      "https://hotel.com/image7.jpg",
    ],
  },
];
export const mockData2 = {
  name: "Standard Single Room",
  type: "room",
  id: 1,
  intoduction:
    "Indulge in the cozy embrace of our Standard Single Room, a retreat designed for solo travelers seeking tranquility. Enjoy the breathtaking City view from your balcony, and relish in amenities such as a TV, Wi-Fi, and 24-Hour Room Service. Immerse yourself in the comfort of a well-appointed space where every detail is crafted for your convenience.",
  room_square_footage: {
    number: 200,
    icon: "GrCube",
  },
  capacity: {
    number: 1,
    icon: "MdOutlinePeopleAlt",
  },
  bath_number: {
    number: 1,
    icon: "TbBath",
  },
  unavailables: [],
  booking: [],
  max_children: 0,
  max_pets: 0,
  pets_allowed: false,
  butler_service: false,
  view: "City",
  living_room: false,
  breakfast: true,
  amenities: [
    {
      name: "TV",
      icon: "PiTelevisionSimpleThin",
    },
    {
      name: "Wi-Fi",
      icon: "FaWifi",
    },
    {
      name: "Air Conditioning",
      icon: "Air Conditioning",
    },
    {
      name: "Balcony",
      icon: "MdBalcony",
    },
    {
      name: "24-Hour Room Service",
      icon: "Tb24Hours",
    },
    {
      name: "Breakfast",
      icon: "MdOutlineFreeBreakfast",
    },
  ],
  price: 120,
  images: [
    "/images/rooms/standard single room/img1.jpg",
    "/images/rooms/standard single room/img2.jpg",
    "/images/rooms/standard single room/img3.jpg",
  ],
  feedback:
    "A comfortable room with a fantastic city view. The 24-hour room service was a lifesaver!",
};
// Mock for UseFetch
vi.mock("../components/UseFetch", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: mockData,
    isPending: false,
    error: null,
  })),
}));

vi.mock("../components/BookingUseFetch", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data: mockData2,
    isPending: false,
    error: null,
  })),
}));
vi.mock("../components/DetailUseFetchQueries", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    data1: mockData,
    data2: mockData2,
    isPending1: false,
    isPending2: false,
    error1: null,
    error2: null,
  })),
}));
