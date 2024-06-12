"use server";
import { PrismaClient } from "@prisma/client";
import CarCard from "./carCard";
import { Box, Grid } from "@mui/material";

interface CarGelleryProps {
  galleryUserId?: string;
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
        }) => (
          <Grid key={car_id} item>
            <CarCard
              sellerId={user_id}
              carId={car_id}
              make={make}
              year={year}
              model={model}
              pictureUrls={picture_urls}
              startingPrice={starting_price}
              bids={bids}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default CarGellery;
