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

  const [catalogs, setCatalogs] = useState([]);

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

  useEffect(() => {
    handleListCatalog();
  }, [handleListCatalog]);

  return (
    <React.Fragment>
      <Header />
      <Box component={"section"} id="store-front">
        <Container maxWidth="xl" className="store-front-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography className="section-title">Products</Typography>
            </Grid>
            {catalogs.map((i, iKey) => (
              <Grid item xs={12} lg={4} key={iKey}>
                <Paper variant="outlined" className="card">
                  <Typography>{i.name}</Typography>
                  <Typography>{i.description}</Typography>
                  <Typography>${i.amount}</Typography>
                  <Button
                    component={Link}
                    to={`/catalog-details/${i._id}`}
                    variant="contained"
                  >
                    Details
                  </Button>
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
