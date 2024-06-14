import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import "./Cart.scss";

import Header from "../../components/header/Header";
import CheckoutService from "../../services/CheckoutService";

export default function Cart() {
  const [snackbar, setSnackbar] = useState({
    x: "right",
    y: "top",
    open: false,
    duration: 6000,
    text: "",
    severity: "succes",
  });

  const [orders, setOrders] = useState([]);

  const handleOrderList = useCallback(() => {
    CheckoutService.list(localStorage.getItem("email"))
      .then((response) => {
        setOrders(response.data);
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

  const handleRemove = (uid) => {
    CheckoutService.remove(uid)
      .then((response) => {
        setSnackbar((snackbar) => ({
          ...snackbar,
          open: true,
          text: "Item has been removed",
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
      })
      .finally(() => {
        handleOrderList();
      });
  };

  const handlePurchase = () => {
    CheckoutService.purchase(localStorage.getItem("email"))
      .then((response) => {
        setSnackbar((snackbar) => ({
          ...snackbar,
          open: true,
          text: "Thank you!",
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
      })
      .finally(() => {
        handleOrderList();
      });
  };

  const getTotal = () => {
    let total = 0;

    orders.forEach((i, iKey) => {
      total += parseInt(i.amount);
    });

    return total;
  };

  useEffect(() => {
    handleOrderList();
  }, [handleOrderList]);

  return (
    <React.Fragment>
      <Header />
      <Box component={"section"} id="cart-front">
        <Container maxWidth="xl" className="cart-front-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="section-title">My Orders</Typography>
            </Grid>
            {!orders.length && (
              <Grid item xs={12}>
                <Typography>
                  You are all set! <Link to="/">View more products</Link>
                </Typography>
              </Grid>
            )}
            {orders.map((i, iKey) => (
              <Grid item xs={12} lg={4} key={iKey}>
                <Paper variant="outlined" className="card">
                  <Typography>{i.name}</Typography>
                  <Typography>{i.description}</Typography>
                  <Typography>${i.amount}</Typography>
                  <Button
                    variant="contained"
                    color="red"
                    onClick={() => handleRemove(i._id)}
                  >
                    Remove
                  </Button>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12} textAlign={"right"}>
              <Typography className="total">
                Total amount: ${getTotal()}
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
              <TextField label="Name" />
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
              <TextField label="Card" />
            </Grid>
            <Grid item xs={12} textAlign={"right"}>
              <Button variant="contained" onClick={() => handlePurchase()}>
                Checkout
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
