import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  MenuList,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import "./Header.scss";

export default function Header() {
  const [snackbar, setSnackbar] = useState({
    x: "left",
    y: "top",
    open: false,
    duration: 6000,
    text: "",
    severity: "succes",
  });

  const [email, setEmail] = useState("");

  useEffect(() => {
    let _email = localStorage.getItem("email");

    if (_email) {
      setEmail(_email);
    } else {
      setSnackbar((snackbar) => ({
        ...snackbar,
        open: true,
        text: "Please update your email",
        severity: "error",
      }));
    }
  }, []);

  return (
    <React.Fragment>
      <Box component={"nav"} id="nav-main">
        <Container maxWidth="xl" className="nav-main-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MenuList className="settings">
                <MenuItem disableRipple>
                  <TextField
                    type="email"
                    label="Your email address"
                    size="small"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      localStorage.setItem("email", event.target.value);
                    }}
                  />
                </MenuItem>
                <MenuItem disableRipple>
                  <Button variant="outlined">Switch to admin</Button>
                </MenuItem>
              </MenuList>
            </Grid>
            <Grid item xs={12}>
              <MenuList className="links">
                <MenuItem>
                  <Link to="/">Home</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/cart">My Cart</Link>
                </MenuItem>
              </MenuList>
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
