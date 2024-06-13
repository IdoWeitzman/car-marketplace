"use client";
import * as React from "react";
import { Button, Input, InputAdornment, Stack, TextField } from "@mui/material";
import TextArea from "../components/TextArea";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { Car, Model } from "../types";
import axios from "axios";

type FormValues = Model & {
  starting_price: Car["starting_price"];
  picture_url: Car["picture_urls"][number];
  description: Car["description"];
};

interface FormControllersProps {
  control: Control<FormValues, any>;
  formValues: FormValues;
  setFormValue: UseFormSetValue<FormValues>
}

const FormControllers = ({ control, formValues, setFormValue }: FormControllersProps) => {
  const onGenerateClick = async () => {
    const { make, model, year, picture_url } = formValues;

    const res = await axios.post("/api/chatgpt", {
      make,
      model,
      year,
      picture_url,
    });

    setFormValue("description", res.data.result)
  };

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

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextArea
            {...field}
            value={field.value ?? ""}
            placeholder="Description"
            minRows={10}
          />
        )}
      />
      <Button startIcon={<AutoFixHighIcon/>} sx={{marginBottom: '32px'}} onClick={onGenerateClick}>Generate Description with AI</Button>

      <Button type="submit" variant="contained">
        Post car
      </Button>
    </Stack>
  );
};

export default FormControllers;
