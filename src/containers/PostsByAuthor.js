import React, { useMemo, useState } from "react";
import { Post } from "../components/posts";
import { Navbar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";
import { Grid } from "@material-ui/core/";
import { toast } from "react-toastify";
import { getPostsByAuthor } from "../redux/services";

export const PostsByAuthor = (props) => {
  let matchPath = props.match.params.authorId;
  const [posts, setPosts] = useState([]);
  const loadingPost = async () => {
    const res = await getPostsByAuthor(matchPath);
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
  useMemo(() => {
    loadingPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchPath]);
    if (posts.length === 0) {
      toast.error("The author doesn't have any publication");
    }
  
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Grid container direction="row" justify="center">
      <Grid container direction="col" sm={3} justify="center">
        <SideBar />
      </Grid>
      <Grid container direction="col" sm={9} justify="center">
        <Grid container direction="row">
          {posts.map((posts) => {
            return (
              <Grid bgcolor="text.secondary" container sm={4} key={posts.id}>
                <Post {...posts} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      </Grid>
    </ThemeProvider>
  );
};
