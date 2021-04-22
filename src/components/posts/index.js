import React from "react";
import { Box, Grid, Button, Typography } from "@material-ui/core/";
import { Image, Title, Content, NameAuthor, PostDate } from "./Style";
import { Link } from "react-router-dom";

export const Post = (posts) => {
  return (
    <Grid item sm={11} direction="row" alignItems="center" wrap="nowrap">
      <Box m={1}>
        <Image src={"https://picsum.photos/id/" + posts.id + "/200"} alt="Img" />
      </Box>
      <Box m={2}>
        <Title>{posts.title}</Title>
        <Content>{posts.body}</Content>
      </Box>
      <Box m={2}>
        <Link
          to={"/post/" + posts.id}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Button variant="contained" color="secondary" fullWidth={true}>
            See more
          </Button>
        </Link>
        <Typography variant="h6">
          <NameAuthor>By: {posts.author_firstname}</NameAuthor>
          <PostDate>{posts.publish_date}</PostDate>
        </Typography>
      </Box>
    </Grid>
  );
};
