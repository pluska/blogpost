import React from "react";
import {PostForm} from "../components/PostForm";
import { Navbar } from "../components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";


const NewPost = () => (
  <ThemeProvider theme={theme}>
    <Navbar></Navbar>
    <PostForm />
  </ThemeProvider>
);

export default NewPost