import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Navbar } from "../components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";
import Context from "../components/App/Context";

const Login = () => (
  <ThemeProvider theme={theme}>
    <Navbar></Navbar>
    <Context.Consumer>
      {({ activateAuth }) => {
        return <LoginForm onSubmit={activateAuth}/>;
      }}
    </Context.Consumer>
  </ThemeProvider>
);

export default Login;
