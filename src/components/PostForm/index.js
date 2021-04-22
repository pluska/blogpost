import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, Input, Button } from "./style";
import { createPost } from "../../redux/services";
import { toast } from "react-toastify";

export const PostForm = (profile) => {
  const author_name = profile.profile;
  const id = window.sessionStorage.getItem("token");

  const [post, setPost] = useState({
    title: "",
    body: "",
    draft: false,
    publish_date: "",
    author_firstname: author_name,
    author_id: id,
  });

  const handleInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    await createPost(post);
    toast.success("New post added");
  };

  return (
    <Grid container direction="row" justify="center">
      <Form onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          New Post edition
        </Typography>
        <Typography variant="h6">Title</Typography>
        <Grid container direction="row">
          <Grid item xs={12}>
            <Input
              placeholder="title"
              name="title"
              onChange={handleInputChange}
            />
          </Grid>
          <label />
          <Input
            type="hidden"
            value={false}
            name="draft"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid>
          <Typography variant="h6">Content</Typography>
          <Input placeholder="body" name="body" onChange={handleInputChange} />
          <Typography variant="h6">Publish Date</Typography>
          <Input
            placeholder="publish_date"
            type="date"
            name="publish_date"
            onChange={handleInputChange}
          />
          <Input
            type="hidden"
            name="author_firstname"
            value={author_name}
            onChange={handleInputChange}
          />
          <Input
            type="hidden"
            name="author_id"
            value={id}
            onChange={handleInputChange}
          />
        </Grid>
        <Button>Create</Button>
      </Form>
    </Grid>
  );
};
