"use client";
import * as React from "react";
import ResponsiveAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { SignInButton, useUser } from "@clerk/nextjs";
import SignedInMenu from "./signedInMenu";

const AppBar = () => {
  const { isSignedIn } = useUser();

  return (
    <ResponsiveAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Car Marketplace
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CM
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            {isSignedIn ? (
              <SignedInMenu />
            ) : (
              <SignInButton mode="modal" forceRedirectUrl="/" />
            )}
          </Box>
        </Toolbar>
      </Container>
    </ResponsiveAppBar>
  );
};
export default AppBar;
