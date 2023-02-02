import { Alert, Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { currentUser, logOut } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logOut();
      navigate("/login");
    } catch {
      setError("Cannot Logout");
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          //   m: 4,
        }}
      >
        {" "}
        <Card sx={{ minWidth: 500, mt: 10 }}>
          <Box
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: 4,
            }}
          >
            {" "}
            <Typography variant="h3" m="auto">
              {" "}
              Profile
            </Typography>
            <Typography variant="body1" m="auto">
              {" "}
              Email: {currentUser.email}
            </Typography>
            <Button variant="outlined" sx={{ mx: 3 }}>
              <Link
                to="/update-profile"
                style={{ textDecoration: "none", textDecorationColor: "black" }}
              >
                Update Profile
              </Link>
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 3 }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        </Card>
      </Box>
    </>
  );
}
