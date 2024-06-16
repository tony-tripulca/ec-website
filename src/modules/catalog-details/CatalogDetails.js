import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";

import "./CatalogDetails.scss";

import Header from "../../components/header/Header";

import CatalogService from "../../services/CatalogService";
import CheckoutService from "../../services/CheckoutService";

export default function CatalogDetails() {
  const { uid } = useParams();

  const [snackbar, setSnackbar] = useState({
    x: "right",
    y: "top",
    open: false,
    duration: 6000,
    text: "",
    severity: "succes",
  });

  const [catalog, setCatalog] = useState({});

  const handleGetCatalog = useCallback(() => {
    CatalogService.read(uid)
      .then((response) => {
        setCatalog(response.data);
      })
      .catch((error) => {
        setSnackbar((snackbar) => ({
          ...snackbar,
          open: true,
          text: "Oops! Something went wrong",
          severity: "error",
        }));
      });
  }, []);

  const handleAddToCart = () => {
    CheckoutService.create({
      name: catalog.name || "",
      description: catalog.description || "",
      amount: catalog.amount || 1,
      email: localStorage.getItem("email"),
    })
      .then((response) => {
        setSnackbar((snackbar) => ({
          ...snackbar,
          open: true,
          text: "Added to card",
          severity: "success",
        }));
      })
      .catch((error) => {
        setSnackbar((snackbar) => ({
          ...snackbar,
          open: true,
          text: "Oops! Something went wrong",
          severity: "error",
        }));
      });
  };

  useEffect(() => {
    handleGetCatalog();
  }, [handleGetCatalog]);

  return (
    <React.Fragment>
      <Header />
      <Box component={"section"} id="catalog-details">
        <Container maxWidth="xl" className="catalog-details-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="section-title">Product Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined" className="card">
                <Typography className="catalog catalog-name">
                  {catalog.name}
                </Typography>
                <Typography className="catalog catalog-description">
                  {catalog.description}
                </Typography>
                <Typography className="catalog catalog-amount">
                  ${catalog.amount}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
              <Button variant="contained" onClick={() => handleAddToCart()}>
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: snackbar.y, horizontal: snackbar.x }}
        autoHideDuration={snackbar.duration}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
