import React, { useState } from "react";
import { Form, Input, Button } from "./style";
import { Grid, Typography } from "@material-ui/core";
import { useInputValue } from "../App/useInputValue";
import { loginAuthor } from "../../redux/services";
import { toast } from 'react-toastify'
import { useHistory } from "react-router";

export const LoginForm = ({ onSubmit }) => {
  const history = useHistory()
  const email = useInputValue("");
  const password = useInputValue("");
  const [button, setButton] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    setButton('disabled')
    let form = {
      email: email.value,
      password: password.value,
    };    
    try{
      const res = await loginAuthor(form)
      toast.success('Login success');
      const profile = res.data.firstname ? res.data.firstname : "Author"
      const login = res.data.id
      window.sessionStorage.setItem('profile',profile)
      onSubmit(login)
      history.push('/admin/author')
      
    } catch (error) {
      toast.error('Email or password not found');
      setButton('')
    }

  };

  return (
    <Grid container direction="row" justify="center">
      <Form onSubmit={onSubmit}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          BlogPost
        </Typography>
        <Input placeholder="Email" {...email} />
        <Input placeholder="Password" type="password" {...password} />
        <Button onClick={handleSubmit} disabled={button}>Log in</Button>
      </Form>
    </Grid>
  );
};
