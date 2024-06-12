import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import { Button, Stack } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface BidModalProps {
  open: boolean;
  onClose: () => void;
  carId: number;
}

const BidModal = ({ open, onClose, carId }: BidModalProps) => {
  const [value, setValue] = React.useState(30);
  const { user } = useUser();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async(data: any) => { // TODO: type.
    if(user?.id) {
      const values = await axios.post('/bid', {
        value: data.bidAmount,
        userId: user.id,
        carId: carId,
      });
      console.log('value is', values)

    }

    setTimeout(onClose, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="input-slider" gutterBottom>
          Amount
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("bidAmount", { required: true, min: 0 })} />
      {errors.exampleRequired && <span>This field is required</span>}
      
      <input type="submit" value="Place bid"/>
    </form>

          </Grid>
          <Grid item>
            <Typography>{value}$</Typography>
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end">
        </Stack>
      </Box>
    </Modal>
  );
};

export default BidModal;
