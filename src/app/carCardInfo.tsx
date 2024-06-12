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

export interface CarCardInfoProps {
  make: string;
  model: string;
  year: number;
  pictureUrls: string[];
  startingPrice: Prisma.Decimal;
}

const CarCardInfo = (props: CarCardInfoProps) => {
  const {
    make,
    model,
    year,
    pictureUrls,
    startingPrice,
  } = props;

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
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </>
  );
};

export default CarCardInfo;
