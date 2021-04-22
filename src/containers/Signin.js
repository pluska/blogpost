import React from "react";
import {UserForm} from "../components/UserForm";
import { Navbar } from "../components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";


const SingIn = () => (
  <ThemeProvider theme={theme}>
    <Navbar></Navbar>
    <UserForm />
  </ThemeProvider>
);

export default SingIn