"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CarCardInfo from "./carCardInfo";
import { Car, Model } from "./types";

export type CarCardProps = Model &
  Pick<Car, "bids" | "car_id" | "picture_urls" | "starting_price"> & {
    sellerId: Car["user_id"];
  };

const CarCard = (props: CarCardProps) => {
  const {
    make,
    model,
    year,
    picture_urls: pictureUrls,
    starting_price,
    car_id,
    sellerId,
  } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/view-car?car_id=${car_id}&seller_id=${sellerId}`}>
        <CarCardInfo
          starting_price={starting_price}
          make={make}
          model={model}
          year={year}
          picture_urls={pictureUrls}
        />
      </CardActionArea>
    </Card>
  );
};

export default CarCard;
