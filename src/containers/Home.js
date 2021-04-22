import React, { useEffect, useState, useMemo } from "react";
import { Post } from "../components/posts";
import { Navbar } from "../components/Navbar";
import {SideBar} from "../components/SideBar"
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";
import {
  Grid,
  InputBase,
  makeStyles,
  fade,
  Box
} from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";
import { getPosts } from "../redux/services";

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

export const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const loadingPost = async () => {
    const res = await getPosts();
    const postDateFormat = res.data
      .map((post) => {
        return {
          ...post,
          createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
          updatedAt: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setPosts(postDateFormat);
  };
  useEffect(() => {
    loadingPost();
  }, []);

  const [filter, setFilter] = useState("Search here");
  const [filterPosts, setFilterPosts] = useState(posts)

  useMemo(() => {
   const result = posts.filter((post) => {
      if (post.title) {
        return post.title.toLowerCase().includes(filter.toLowerCase());
      }
      return post.title
    });

    setFilterPosts(result)
  }, [posts, filter])
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
        {/* <SideBar/> */}
      <Grid container direction="row" justify="center">
        <Box
          bgcolor="primary.main"
          borderRadius="borderRadius"
          color="#ffffff"
          m={4}
          p={2}
        >
          <SearchIcon />
          <InputBase
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </Box>
      </Grid>
      <Grid container direction="row">
        {posts.map((filterPosts) => {
          return (
            <Grid
            bgcolor="text.secondary"
            container
            sm={4}
            key={filterPosts.id}
            >
              <Post {...filterPosts} />
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
};
