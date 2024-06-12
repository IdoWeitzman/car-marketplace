import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { Button, Slider, Stack } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface FormValues {
  bidAmount: number;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export interface BidModalProps {
  open: boolean;
  onClose: () => void;
  carId: number;
}

const BidModal = ({ open, onClose, carId }: BidModalProps) => {
  const { user } = useUser();
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      bidAmount: 0,
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
      <Box sx={style}>
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
                    <Slider min={0} max={200000} {...field} />
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
