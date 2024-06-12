"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Car, Model } from "../../types";

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

export type CarCardInfoProps = Model &
  Pick<Car, "picture_urls" | "starting_price" | "description">;

const CarCardInfo = (props: CarCardInfoProps) => {
  const {
    make,
    model,
    year,
    description,
    picture_urls: pictureUrls,
    starting_price: startingPrice,
  } = props;
  console.log('description is', description)
  return (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={`${make} ${model} ${year}`}
        subheader={`Starting at $${startingPrice}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={pictureUrls[0]}
        alt="Car Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </>
  );
};

export default CarCardInfo;
