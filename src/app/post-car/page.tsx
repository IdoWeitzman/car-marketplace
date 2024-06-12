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
import { MODAL_STYLE } from "../common-styles";

type FormValues = Model & {
  starting_price: Car["starting_price"];
  picture_url: Car["picture_urls"][number];
  description: Car["description"];
};

const PostCar = () => {
  const { user } = useUser();
  const { handleSubmit, watch, control } = useForm<FormValues>();
  const formWatcher = watch();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (user?.id) {
     await axios.post("/post-car/api", {
        ...data,
        picture_urls: [data.picture_url],
        user_id: user.id,
      });

      window.location.href = '/manage-your-cars';
    }
  };

  return (
    <Box sx={MODAL_STYLE}>
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
            name="description"
            control={control}
            render={({ field }) => <TextField {...field} label="Description" />}
          />
          <Controller
            name="starting_price"
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
            name="picture_url"
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
