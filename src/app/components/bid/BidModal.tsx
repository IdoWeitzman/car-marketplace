import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Button, Slider, Stack } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { MODAL_STYLE } from "@/app/common-styles";

interface FormValues {
  bidAmount: number;
}

export interface BidModalProps {
  open: boolean;
  onClose: () => void;
  carId: number;
  highestBid: number;
}

const BidModal = ({ open, onClose, carId, highestBid}: BidModalProps) => {
  const { user } = useUser();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      bidAmount: highestBid + 1,
    },
  });
  const formWatcher = watch();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    if (user?.id) {
      await axios.post("/bid", {
        value: data.bidAmount,
        userId: user.id,
        carId: carId,
      });
    }

    setTimeout(onClose, 1000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...MODAL_STYLE, gap: 2 }}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Place a bid
        </Typography>
        <Typography id="input-slider" gutterBottom>
          Amount
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" gap={2}>
            <Stack direction="row" gap={3} alignItems="center">
              <Controller
                name="bidAmount"
                control={control}
                render={({ field }) => (
                  <Slider min={highestBid} max={200000} {...field} />
                )}
              />
              <Typography>{formWatcher.bidAmount}$</Typography>
              {errors.bidAmount && <span>This field is required</span>}
            </Stack>
            <Stack alignItems="flex-end" width="100%">
              <Button variant="contained" type="submit">
                {" "}
                Place Bid
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default BidModal;
