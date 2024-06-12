import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

export interface PostBidModalBody extends NextApiRequest {
    json: () =>  Promise<{
        value: number;
        userId: string;
        carId: number;
    }>
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

  console.log('create response', createResponse)
  return Response.json({message: 'success'})
}
