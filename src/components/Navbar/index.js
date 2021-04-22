import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Button, Box, fade, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Anchor } from "./style";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
  menuButton: {
    marginLeft: theme.spacing(5),
    alignItems: "flex-end",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  toolbar: {
    minHeight: 50,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-end"
          >
            <Typography className={classes.title} variant="h6">
              BlogPost
            </Typography>
            <Button
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Anchor>Home</Anchor>
              </Link>
            </Button>
            <Button
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <Link to="/authors" style={{ textDecoration: "none" }}>
                <Anchor>Authors</Anchor>
              </Link>
            </Button>
            <Button
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Anchor>Sign in</Anchor>
              </Link>
            </Button>
            <Button
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
            >
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Anchor>Login</Anchor>
              </Link>
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box className={classes.offset}></Box>
    </div>
  );
};
