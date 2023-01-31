import React, { useReducer } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

export default function Signup() {
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      confirmPassword: "",
    }
  );

  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
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
          >
            <Box sx={{ mb: 3 }}>
              {" "}
              <Typography variant="h3">Signup Form</Typography>
            </Box>
            <FormControl variant="standard">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name="email"
                defaultValue={formInput.email}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl variant="standard">
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                name="password"
                defaultValue={formInput.password}
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
                defaultValue={formInput.confirmPassword}
                onChange={handleInput}
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
