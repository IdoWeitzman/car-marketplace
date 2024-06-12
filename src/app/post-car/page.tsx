"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, Input, InputAdornment, Stack, TextField } from "@mui/material";
import { useUser } from "@clerk/nextjs";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Car, Model } from "../types";

type FormValues = Model & {
  startingPrice: Car["starting_price"];
  pictureUrl: Car["picture_urls"][number];
};
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
  display: 'flex',
  flexDirection: 'column',
  gap: 8
};

const PostCar = () => {
  const { user } = useUser();
  const { register, handleSubmit, watch, control } = useForm<FormValues>();
  const formWatcher = watch();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (user?.id) {
      const values = await axios.post("/post-car/api", {
        ...data,
        userId: user.id,
      });
    }
  };

  return (
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Place a bid
        </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" gap={2}>
          <Controller
            name="make"
            control={control}
            render={({ field }) => <TextField {...field} label="Make" />}
          />
          <Controller
            name="model"
            control={control}
            render={({ field }) => <TextField {...field} label="Model" />}
          />
          <Controller
            name="year"
            control={control}
            render={({ field }) => (
              <TextField type="number" label="Year" {...field} />
            )}
          />
          <Controller
            name="startingPrice"
            control={control}
            render={({ field }) => (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                type="number"
                label="Starting Price"
                {...field}
              />
            )}
          />
          <Controller
            name="pictureUrl"
            control={control}
            render={({ field }) => <TextField label="Picture Url" {...field} />}
          />

          <Button type="submit" variant="contained">
            Post car
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PostCar;
