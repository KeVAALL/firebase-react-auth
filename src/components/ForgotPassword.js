import React, { useReducer, useState } from "react";

import {
  Card,
  Box,
  Typography,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Alert,
  Button,
} from "@mui/material";

import validator from "validator";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
    }
  );
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setEmailError("");

    if (!validator.isEmail(formInput.email)) {
      return setEmailError("Enter Valid Email :(");
    }

    try {
      setMessage("");
      setError("");
      setEmailError("");

      setLoading(true);
      await resetPassword(formInput.email);
      setMessage("Check your inbox for further details");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);

    setFormInput({
      email: "",
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          //   m: 4,
        }}
      >
        <Card sx={{ minWidth: 500, mx: "auto", mt: 10 }}>
          <Box
            component="form"
            sx={{
              m: 4,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            onSubmit={handleSubmit}
          >
            {message && <Alert severity="success">{message}</Alert>}
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Password Reset</Typography>
            </Box>
            {emailError && <Alert severity="error">{emailError}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={formInput.email}
                onChange={handleInput}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              Reset Password
            </Button>
            <Box sx={{ m: "auto" }}>
              {" "}
              <Typography variant="subtitle1">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Typography variant="subtitle1" sx={{ margin: "auto" }}>
            Need an account? <Link to="/signup"> Signup </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}
