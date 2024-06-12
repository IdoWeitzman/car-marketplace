import { Prisma, bids } from "@prisma/client";

export type Car = Prisma.carsGetPayload<{ select: {
    bids: true,
    user_id: true,
    carmodels: true,
    picture_urls: true,
    starting_price: true,
    car_id: true,
} }>;

export type Bid = Prisma.bidsGetPayload<{ select: { bid_amount: true,
    user_id: true,
    car_id: true,
}}>;

export type Model = Prisma.carmodelsGetPayload<{ select: { make: true,
    model: true,
    year: true,
}}>;