import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { Car } from "../../types";

export interface PostBidModalBody extends NextApiRequest {
  json: () => Promise<{
    value: number;
    userId: Car["user_id"];
    carId: Car["car_id"];
  }>;
}

export async function POST(request: PostBidModalBody) {
  const { value, userId, carId } = await request.json();
  const prisma = new PrismaClient();

  const createResponse = await prisma.bids.create({
    data: {
      bid_amount: value,
      user_id: userId,
      car_id: carId,
    },
  });

  return Response.json({ message: "success" });
}
