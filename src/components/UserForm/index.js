import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, Input, Button } from "./style";
import { createAuthor } from "../../redux/services";
import { toast } from 'react-toastify'
import { useHistory } from "react-router";


export const UserForm = () => {

  const history = useHistory()

  const [author, setAuthor] = useState({
    firstname: "",
    lastname: "",
    email: "",
    birthdate: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuthor(author)
    toast.success('New author added')
    history.push('/')
  }

  return (
    <Grid container direction="row" justify="center">
      <Form onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          BlogPost
        </Typography>
        <Typography variant="h6">Fullname</Typography>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Input
              placeholder="firstname"
              name="firstname"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <label />
            <Input
              placeholder="lastname"
              name="lastname"
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h6">Email</Typography>
          <Input
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
          />
          <Typography variant="h6">Birthdate</Typography>
          <Input
            placeholder="Birthdate"
            type="date"
            name="birthdate"
            onChange={handleInputChange}
          />
          <Typography variant="h6">Password </Typography>
          <Input
            placeholder="Password"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </Grid>
        <Button>Sign in</Button>
      </Form>
    </Grid>
  );
};
