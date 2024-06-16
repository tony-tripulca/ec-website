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

import "./StoreFront.scss";

import CatalogService from "../../services/CatalogService";
import Header from "../../components/header/Header";

export default function StoreFront() {
  const [snackbar, setSnackbar] = useState({
    x: "right",
    y: "top",
    open: false,
    duration: 6000,
    text: "",
    severity: "succes",
  });

  const [admin, setAdmin] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [catalog, setCatalog] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const handleListCatalog = useCallback(() => {
    CatalogService.list()
      .then((response) => {
        setCatalogs(response.data);
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

  const handleRemoveCatalog = (uid) => {
    CatalogService.remove(uid)
      .then(() => {
        handleListCatalog();
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

  const handleCreateCatalog = () => {
    CatalogService.create(catalog)
      .then(() => {
        handleListCatalog();
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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCatalog((catalog) => ({ ...catalog, [name]: value }));
  };

  useEffect(() => {
    handleListCatalog();
  }, [handleListCatalog]);

  return (
    <React.Fragment>
      <Header onStateChange={(state) => setAdmin(state)} />
      <Box component={"section"} id="store-front">
        <Container maxWidth="xl" className="store-front-holder">
          {admin && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography className="section-title">Add Product</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  vaue={catalog.name}
                  onChange={(event) => handleOnChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  vaue={catalog.description}
                  onChange={(event) => handleOnChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  name="amount"
                  vaue={catalog.amount}
                  onChange={(event) => handleOnChange(event)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleCreateCatalog()}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Typography className="section-title">Products</Typography>
            </Grid>
            {catalogs.map((i, iKey) => (
              <Grid item xs={12} lg={4} key={iKey}>
                <Paper variant="outlined" className="card">
                  <Typography>{i.name}</Typography>
                  <Typography>{i.description}</Typography>
                  <Typography>${i.amount}</Typography>
                  <Box className="action-buttons">
                    {admin && (
                      <Button
                        variant="contained"
                        color="red"
                        onClick={() => handleRemoveCatalog(i._id)}
                        className="btn btn-remove"
                      >
                        Remove
                      </Button>
                    )}

                    <Button
                      component={Link}
                      to={`/catalog-details/${i._id}`}
                      variant="contained"
                      className="btn btn-details"
                    >
                      Details
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
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
