import React from "react";
import {
  Typography,
  makeStyles,
  Avatar,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core/";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export const AuthorsComponent = (authors) => {
  const author = authors.authors
  const classes = useStyles();
  return (
    <Link to={"/author/posts/" + author.id} style={{ textDecoration: "none" }}>
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Avatar" src={"https://i.pravatar.cc/150?img=" + author.id} />
        </ListItemAvatar>
        <ListItemText
          primary={author.firstname + " " + author.lastname}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body1"
                className={classes.inline}
                color="textPrimary"
              >
                {author.email} <br />
              </Typography>
              {author.birthdate}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
    </Link>
  );
};
