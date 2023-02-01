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
import { async } from "@firebase/util";

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
          {currentUser && currentUser.email}
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
              <Typography variant="h3">Signup Form</Typography>
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
          </Box>
        </Card>
      </Box>
    </>
  );
}
