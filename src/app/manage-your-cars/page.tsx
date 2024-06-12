"use server"
import CarGallery from "../CarGallery";
import { ManageYourCarsProps } from "./types";
import { auth } from "@clerk/nextjs/server";

const ManageYourCarsPage = (props: ManageYourCarsProps) => {
  const {userId} = auth();

    console.log('user is is', userId)
  return (
    <div>
      <CarGallery galleryUserId={userId ?? ''} />
    </div>
  );
};

export default ManageYourCarsPage;
