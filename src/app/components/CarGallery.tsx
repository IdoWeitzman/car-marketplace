"use server";
import { PrismaClient } from "@prisma/client";
import CarCard from "./car-card/carCard";
import { Box, Grid } from "@mui/material";
import { Car } from "../types";

interface CarGelleryProps {
  galleryUserId?: Car["user_id"];
}

const CarGellery = async ({ galleryUserId }: CarGelleryProps) => {
  const prisma = new PrismaClient();
  const filterByUserId = galleryUserId ? { user_id: galleryUserId } : {};
  const carsData = await prisma.cars.findMany({
    include: { carmodels: true, bids: true },
    where: { is_available: true, ...filterByUserId },
  });

  return (
    <Grid container spacing={4}>
      {carsData.map(
        ({
          car_id,
          carmodels: { year, make, model },
          picture_urls,
          starting_price,
          bids,
          user_id,
          description,
        }) => (
          <Grid key={car_id} item>
            <CarCard
              sellerId={user_id}
              car_id={car_id}
              make={make}
              year={year}
              model={model}
              picture_urls={picture_urls}
              starting_price={starting_price}
              bids={bids}
              description={description}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default CarGellery;
