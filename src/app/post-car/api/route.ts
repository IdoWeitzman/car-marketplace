import { Car, Model } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

export interface PostBidModalBody extends NextApiRequest {
  json: () => Promise<Car & Model>;
}

export async function POST(request: PostBidModalBody) {
  const {
    model,
    make,
    year,
    user_id,
    starting_price,
    picture_urls,
  } = await request.json();
  const prisma = new PrismaClient();

  await prisma.cars.create({
    data: {
      user_id,
      starting_price,
      picture_urls,
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
