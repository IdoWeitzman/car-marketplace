"use client";
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { Car } from "../types";
import ExpandMoreButton from "./expandMoreButton";

export interface CarCardActionsProps {
  onBidClick: () => void;
  handleExpandClick: () => void;
  isBidsExpanded: boolean;
  sellerId: Car["user_id"];
}

const CarCardActions = ({
  onBidClick,
  handleExpandClick,
  isBidsExpanded,
  sellerId,
}: CarCardActionsProps) => {
  const { isSignedIn, user } = useUser();
  const shouldShowBidButton = isSignedIn && user.id !== sellerId;

  return (
    <CardActions disableSpacing>
      {shouldShowBidButton && <Button onClick={onBidClick}>Bid</Button>}
      <ExpandMoreButton
        expand={isBidsExpanded}
        onClick={handleExpandClick}
        aria-expanded={isBidsExpanded}
        aria-label="show more"
      >
        <Button endIcon={<ExpandMoreIcon />}>
          {isBidsExpanded ? "Hide Bids" : "View Bids"}
        </Button>
      </ExpandMoreButton>
    </CardActions>
  );
};

export default CarCardActions;
