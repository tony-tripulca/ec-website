import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  MenuList,
  TextField,
  Typography,
} from "@mui/material";

import "./Header.scss";

export default function Header() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, []);

  return (
    <React.Fragment>
      <Box component={"nav"} id="nav-main">
        <Container maxWidth="xl" className="nav-main-holder">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MenuList className="settings">
                <MenuItem>
                  <TextField
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
    </React.Fragment>
  );
}
