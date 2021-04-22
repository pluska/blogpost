import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, Input, Button, ButtonDelete } from "./style";
import { toast } from "react-toastify";
import { getAuthor, updateAuthor, deleteAuthor } from "../../redux/services";
import { useHistory } from "react-router";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const AuthorEdit = () => {
  const match =  window.sessionStorage.getItem('token').toString()
  const [Author, setAuthor] = useState("");
  const history = useHistory()
  const loadingAuthor = async () => {
    const res = await getAuthor(match).then((Prom) =>{
      console.log(Prom)
      return(Prom)
    })
    setAuthor(res.data);
  };
  useEffect(() => {
    loadingAuthor();
  }, []);

  const handleInputChange = (e) => {
    setAuthor({ ...Author, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateAuthor(Author);
    console.log(res);
    toast.success("Author Updated");
    history.push('/admin/author')
  };

  const confirmDelete = async () => {
    const res = await deleteAuthor(Author);
    console.log(res);
    toast.success("Profile Deleted");
    history.push('/')
  };

  const handleDelete = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'WAIT',
      message: 'Do you really want to delete this Profile?!',
      buttons: [
        {
          label: 'Yes',
          onClick: confirmDelete
        },
        {
          label: 'No',
          onClick: () => alert('Click No')
        }
      ]
    });
  };

  console.log(Author)

  return (
    <Grid container direction="row" justify="center">
      <Form onSubmit={handleSubmit}>
        <Typography variant="h3" style={{ textAlign: "center" }}>
          Profile Edition
        </Typography>
        <Typography variant="h6">Full Name</Typography>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Input
              placeholder="Firstname"
              name="firstname"
              value={Author.firstname}
              onChange={handleInputChange}
            />
          </Grid>
          <label />
          <Grid item xs={6}>
          <Input
            placeholder="Lastname"
            name="lastname"
            value={Author.lastname}
            onChange={handleInputChange}
          />
          </Grid>
        </Grid>
        <Grid>
          <Typography variant="h6">Email</Typography>
          <Input name="email" value={Author.email} onChange={handleInputChange} />
          <Typography variant="h6">Birthday</Typography>
          <Input
            placeholder="birthday"
            type="date"
            value={Author.birthdate}
            name="birthdate"
            onChange={handleInputChange}
          />
          <Typography variant="h6">New Password</Typography>
          <Input
            type="password"
            name="password"
            onChange={handleInputChange}
          />
          <Input
            type="hidden"
            name="id"
            value={Author.id}
            onChange={handleInputChange}
          />
        </Grid>
        <Button>Update</Button>
        <ButtonDelete onClick={handleDelete}>Delete</ButtonDelete>
      </Form>
    </Grid>
  );
};
