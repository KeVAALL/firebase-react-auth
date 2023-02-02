import React, { useReducer, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import validator from "validator";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
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
  const { logIn } = useAuth();

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

    try {
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      await logIn(formInput.email, formInput.password);
    } catch {
      setError("Cannot Sign in");
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
              gap: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Login</Typography>
            </Box>
            {emailError && <Alert severity="error">{emailError}</Alert>}

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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              Login
            </Button>
            <Typography variant="subtitle1" sx={{ margin: "auto" }}>
              Need an account? <Link to="/signup"> Signup </Link>
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
