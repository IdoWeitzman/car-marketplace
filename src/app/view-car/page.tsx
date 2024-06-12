"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "@clerk/nextjs";
import { Button, List, ListItemText } from "@mui/material";
import BidModal from "../components/bid/BidModal";
import axios from "axios";
import CarCardInfo from "../components/car-card/carCardInfo";
import { Car } from "../types";

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
    car_id: Car['car_id'];
    seller_id: Car['user_id'];
  };
}

const ViewCar = ({ searchParams }: ViewCarProps) => {
  const { seller_id: sellerId, car_id } = searchParams;
  const carId = Number(car_id);
  const [carData, setCarData] = React.useState<Car>();
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
              starting_price={carData.starting_price}
              make={carData.carmodels.make}
              model={carData.carmodels.model}
              year={carData.carmodels.year}
              picture_urls={carData.picture_urls}
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
              <List>
                {carData?.bids.map(({bid_time, bid_id, bid_amount}) => (
                                 <ListItemText
                                 key={bid_id}
                                 primary={`${bid_amount}$`}
                                 secondary={bid_time ? `Placed at: ${new Date(bid_time).toLocaleString()}`: null}
                               />

                ))}
                                  </List>
              </CardContent>
            </Collapse>
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
