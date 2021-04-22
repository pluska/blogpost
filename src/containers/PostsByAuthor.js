import React, { useEffect, useState } from "react";
import { Post } from "../components/posts";
import { Navbar } from "../components/Navbar";
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
  useEffect(() => {
    loadingPost();
  }, []);
  if (posts.length === 0){
    toast.error("The author doesn't have any publication")
  }

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Grid container direction="row">
        {posts.map((posts) => {
          return (
            <Grid bgcolor="text.secondary" container sm={4} key={posts.id}>
              <Post {...posts} />
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
};
