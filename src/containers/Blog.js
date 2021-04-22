import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Post } from "../components/Post";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/Themes";
import {getPostsById} from "../redux/services"


const Blog = (props) => {
  
  let matchPath = props.match.params.postId
  const [post, setPost] = useState();
  const loadingPost = async () => {
    const res = await getPostsById(matchPath)
    setPost(res.data);
  };
  useEffect(() => {
    loadingPost();
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Post {...post} />
    </ThemeProvider>
  );
};

export default Blog