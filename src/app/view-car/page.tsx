"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import BidModal from "../components/bid/BidModal";
import axios from "axios";
import CarCardInfo from "../components/car-card/carCardInfo";
import { Car } from "../types";
import CarCardBids from "./carCardBids";
import CarCardActions from "./carCardActions";

export interface ViewCarProps {
  searchParams: {
    car_id: Car["car_id"];
    seller_id: Car["user_id"];
  };
}

const ViewCar = ({ searchParams }: ViewCarProps) => {
  const { seller_id: sellerId, car_id } = searchParams;
  const carId = Number(car_id);
  const [carData, setCarData] = React.useState<Car>();
  const [expanded, setExpanded] = React.useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onBidClick = () => {
    setIsBidModalOpen(true);
  };

  React.useEffect(() => {
    axios.get(`/view-car/api?car_id=${carId}`).then(({ data }) => {
      setCarData(data);
    });
  }, [carId]);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        {carData ? (
          <>
            <CarCardInfo
              description={carData.description}
              starting_price={carData.starting_price}
              make={carData.carmodels.make}
              model={carData.carmodels.model}
              year={carData.carmodels.year}
              picture_urls={carData.picture_urls}
            />
            <CarCardActions
              isBidsExpanded={expanded}
              onBidClick={onBidClick}
              handleExpandClick={handleExpandClick}
              sellerId={sellerId}
            />
            <CarCardBids bids={carData.bids} expanded={expanded} />
          </>
        ) : (
          <div>loading car data...</div>
        )}
      </Card>
      <BidModal
        open={isBidModalOpen}
        onClose={() => setIsBidModalOpen(false)}
        carId={carId}
      />
    </>
  );
};

export default ViewCar;
