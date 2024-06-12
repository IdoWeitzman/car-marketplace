"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
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

const PostCar = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    // TODO: type.
    if (user?.id) {
      const values = await axios.post("/post-car/api", {
        ...data,
        userId: user.id,
      });
    }
  };

  return (
    <Box sx={style}>
      <Typography id="input-slider" gutterBottom>
        Amount
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Make"
              type="text"
              {...register("make", { required: true })}
            />
            <input
              placeholder="Model"
              type="text"
              {...register("model", { required: true })}
            />
            <input
              placeholder="Year"
              type="number"
              {...register("year", {
                required: true,
                min: 1900,
                max: new Date().getFullYear(),
              })}
            />
            <input
              placeholder="Starting Price"
              type="number"
              {...register("startingPrice", { required: true, min: 0 })}
            />
            <input
              placeholder="Picture Url"
              type="string"
              {...register("pictureUrl", { required: true })}
            />

            <input type="submit" value="Post car" />
          </form>
        </Grid>
        <Grid item>{/* <Typography>{value}$</Typography> */}</Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end"></Stack>
    </Box>
  );
};

export default PostCar;
