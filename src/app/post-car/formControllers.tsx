"use client";
import * as React from "react";
import { Button, Input, InputAdornment, Stack, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { Car, Model } from "../types";

type FormValues = Model & {
  starting_price: Car["starting_price"];
  picture_url: Car["picture_urls"][number];
  description: Car["description"];
};

interface FormControllersProps {
  control: Control<FormValues, any>;
}

const FormControllers = ({ control }: FormControllersProps) => {
  return (
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
  );
};

export default FormControllers;
