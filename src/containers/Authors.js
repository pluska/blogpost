import React, { useEffect, useState } from "react";
import { AuthorsComponent } from "../components/AuthorsComponent";
import { Navbar } from "../components/Navbar";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";
import Grid from "@material-ui/core/Grid";
import { getAuthors } from "../redux/services";

export const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const loadingAuthors = async () => {
    const res = await getAuthors();
    setAuthors(res.data);
  };
  useEffect(() => {
    loadingAuthors();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
        <Grid
          container
          direction="row"
          >
          {authors.map((authors) => {
            return(
          <Grid bgcolor="text.secondary" container key={authors.id}>
          <AuthorsComponent {...authors} />
          </Grid>
        )
      })}
      </Grid>
    </ThemeProvider>
  );
};
