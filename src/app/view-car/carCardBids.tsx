"use client";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { IconButtonProps } from "@mui/material/IconButton";
import { List, ListItemText } from "@mui/material";
import { Car } from "../types";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface CarCardBidsProps {
  expanded: boolean;
  bids: Car["bids"];
}

const CarCardBids = ({ expanded, bids }: CarCardBidsProps) => {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <List>
          {bids.map(({ bid_time, bid_id, bid_amount }) => (
            <ListItemText
              key={bid_id}
              primary={`${bid_amount}$`}
              secondary={
                bid_time
                  ? `Placed at: ${new Date(bid_time).toLocaleString()}`
                  : null
              }
            />
          ))}
        </List>
      </CardContent>
    </Collapse>
  );
};

export default CarCardBids;
