"use server";
import CarGallery from "../components/CarGallery";
import { auth } from "@clerk/nextjs/server";

const ManageYourCarsPage = () => {
  const { userId } = auth();

  return <CarGallery galleryUserId={userId ?? ""} />;
};

export default ManageYourCarsPage;
