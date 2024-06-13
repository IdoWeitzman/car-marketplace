"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useUser } from "@clerk/nextjs";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Car, Model } from "../types";
import { MODAL_STYLE } from "../common-styles";
import FormControllers from "./formControllers";
import { Button } from "@mui/material";

type FormValues = Model & {
  starting_price: Car["starting_price"];
  picture_url: Car["picture_urls"][number];
  description: Car["description"];
};

const PostCar = () => {
  const { user } = useUser();
  const { handleSubmit, watch, control, setValue } = useForm<FormValues>();
  const formValues = watch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (user?.id) {
      await axios.post("/post-car/api", {
        ...data,
        picture_urls: [data.picture_url],
        user_id: user.id,
      });

      window.location.href = "/manage-your-cars";
    }
  };

  return (
    <Box sx={MODAL_STYLE}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Place a bid
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControllers control={control} formValues={formValues} setFormValue={setValue} />
      </form>
    </Box>
  );
};

export default PostCar;
