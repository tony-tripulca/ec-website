import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import "./NotFound.scss";

export default function NotFound() {
  return (
    <React.Fragment>
      <Box component={"section"} id="not-found">
        <Box className="not-found-holder panel">
          <Typography component={"h1"} variant="h6">
            404 | Page Not Found
          </Typography>
          <Link to="/">Back to home</Link>
        </Box>
      </Box>
    </React.Fragment>
  );
}
