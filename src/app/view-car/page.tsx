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
import { Button } from "@mui/material";
import BidModal from "../bid/BidModal";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { NextPageContext } from "next";
import CarCardInfo from "../carCardInfo";

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

export interface ViewCarProps {
  searchParams: {
    car_id: string;
    seller_id: string;
  };
}

const ViewCar = ({ searchParams }: ViewCarProps) => {
  const { seller_id: sellerId, car_id } = searchParams;
  const carId = Number(car_id);
  const [carData, setCarData] = React.useState<any>();
  const { isSignedIn, user } = useUser();
  const [expanded, setExpanded] = React.useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = React.useState(false);
  const shouldShowBidButton = isSignedIn && user.id !== sellerId;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onBidClick = () => {
    setIsBidModalOpen(true);
  };

  React.useEffect(() => {
    axios
      .get(`/view-car/api?car_id=${carId}`)
      .then(({ data }) => {
        setCarData(data);
      })
  }, [carId]);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        {carData ? (
          <>
            <CarCardInfo
              startingPrice={carData.starting_price}
              make={carData.carmodels.make}
              model={carData.carmodels.model}
              year={carData.carmodels.year}
              pictureUrls={carData.picture_urls}
            />
            <CardActions disableSpacing>
              {shouldShowBidButton && <Button onClick={onBidClick}>Bid</Button>}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <Button endIcon={<ExpandMoreIcon />}>
                  {expanded ? "Hide Bids" : "View Bids"}
                </Button>
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {carData?.bids.map((bid: any) => (
                  <div key={bid.bid_id}>{JSON.stringify(bid)}</div>
                ))}
              </CardContent>
            </Collapse>
          </>
        ) : (
          <div>loading card data...</div>
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
