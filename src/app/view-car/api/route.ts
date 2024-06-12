import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();
  const car_id = Number(request.nextUrl.searchParams.get("car_id"));

  const car = await prisma.cars.findFirst({
    where: { car_id },
    include: { carmodels: true, bids: true },
  });

  return Response.json({ ...car });
}
