"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUser } from "@clerk/nextjs";
import { Button, CardActionArea } from "@mui/material";
import BidModal from "./bid/BidModal";
import { Prisma } from "@prisma/client";
import CarCardInfo from "./carCardInfo";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface CarCardProps {
  carId: number;
  sellerId: string;
  make: string;
  model: string;
  year: number;
  pictureUrls: string[];
  startingPrice: Prisma.Decimal;
}

const CarCard = (props: CarCardProps) => {
  const {
    make,
    model,
    year,
    pictureUrls,
    startingPrice,
    carId,
    sellerId,
  } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={`/view-car?car_id=${carId}&seller_id=${sellerId}`}>
        <CarCardInfo
          startingPrice={startingPrice}
          make={make}
          model={model}
          year={year}
          pictureUrls={pictureUrls}
        />
      </CardActionArea>
    </Card>
  );
};

export default CarCard;
