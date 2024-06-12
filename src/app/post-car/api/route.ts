import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

export interface PostBidModalBody extends NextApiRequest {
  json: () => Promise<{
    model: string;
    make: string;
    year: number;
    startingPrice: number;
    userId: string;
    pictureUrl: string;
  }>;
}

export async function POST(request: PostBidModalBody) {
  const {
    model,
    make,
    year: yearAsString,
    userId,
    startingPrice: startingPriceAsString,
    pictureUrl,
  } = await request.json();
  const year = Number(yearAsString);
  const startingPrice = Number(startingPriceAsString);
  const prisma = new PrismaClient();

  await prisma.cars.create({
    data: {
      user_id: userId,
      starting_price: startingPrice,
      picture_urls: [pictureUrl],
      carmodels: {
        connectOrCreate: {
          where: {
            make_model_year: {
              make,
              model,
              year,
            },
          },
          create: {
            model,
            make,
            year,
          },
        },
      },
    },
  });

  return Response.json({ message: "success" });
}
