import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import AppBar from "./appBar";
import CarGellery from "./CarGallery";

export default function Home() {
  return (
    <CarGellery />
  );
}
