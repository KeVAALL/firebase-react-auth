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
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validator.isEmail(formInput.email)) {
      return setEmailError("Enter Valid Email :(");
    }
    if (formInput.password !== formInput.confirmPassword) {
      return setPasswordError("Passwords do not match");
    }

    try {
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await signUp(formInput.email, formInput.password);
      navigate("/login");
    } catch {
      setError("Cannot create an account");
    }

    setLoading(false);

    setFormInput({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

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
        <Card sx={{ minWidth: 500, mt: 10 }}>
          <Box
            component="form"
            sx={{
              m: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              gap: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Signup Form</Typography>
            </Box>
            {emailError && <Alert severity="error">{emailError}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            {passwordError && <Alert severity="warning">{passwordError}</Alert>}
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                value={formInput.email}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                value={formInput.password}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                value={formInput.confirmPassword}
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
              SignUp
            </Button>

            <Typography variant="subtitle1" sx={{ margin: "auto" }}>
              Already have an account? <Link to="/login"> Login </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
