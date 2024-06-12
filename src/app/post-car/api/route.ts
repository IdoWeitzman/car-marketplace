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
    description,
  } = await request.json();
  const prisma = new PrismaClient();
  const yearInt = Number(year);

  await prisma.cars.create({
    data: {
      user_id,
      starting_price,
      picture_urls,
      description,
      carmodels: {
        connectOrCreate: {
          where: {
            make_model_year: {
              make,
              model,
              year: yearInt,
            },
          },
          create: {
            model,
            make,
            year: yearInt,
          },
        },
      },
    },
  });

  return Response.json({ message: "success" });
}
