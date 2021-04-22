import React from "react";
import { Box, Grid, Typography } from "@material-ui/core/";
import { Image, Content, NameAuthor, PostDate } from "./Style";



export const Post = (post) => {

  return (
     <Grid bgcolor="text.secondary" container p={5} m={5} key={post.id}> 
      <Grid item sm={12} direction="row" alignItems="center">
      <Typography variant="h1">{post.title}</Typography>
        <Box m={1}>
        <Image src={"https://picsum.photos/id/" + post.id + "/1200"} alt="Img" />
        </Box>
        <Box m={2}>
          <Typography variant="h4">
          <NameAuthor>By: {post.author_firstname}</NameAuthor>
          </Typography>
          <Typography variant="h6">
            <PostDate>{post.publish_date}</PostDate>
            </Typography>
        </Box>
        <Content>
          <Typography variant="h5">
            {post.body}
          </Typography>
        </Content>
        </Grid>
        </Grid>
  )
};
