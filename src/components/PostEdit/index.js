import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Form, Input, Button, ButtonDelete } from "./style";
import { toast } from "react-toastify";
import { getPostsById, updatePost, deletePost } from "../../redux/services";
import { useHistory } from "react-router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const PostEdit = (matchPath) => {
    const match = matchPath.matchPath;
    const [post, setPost] = useState("");
    const history = useHistory();
    useEffect(() => {
        const loadingPost = async () => {
            const res = await getPostsById(match);
            setPost(res.data);
        };
        loadingPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updatePost(post);
        console.log(res);
        toast.success("Post Updated");
        history.push("/admin/author");
    };

    const confirmDelete = async () => {
        const res = await deletePost(post);
        console.log(res);
        toast.success("Post Deleted");
        history.push("/admin/author");
    };

    const handleDelete = (e) => {
        e.preventDefault();
        confirmAlert({
            title: "WAIT",
            message: "Do you really want to delete this post?!",
            buttons: [
                {
                    label: "Yes",
                    onClick: confirmDelete,
                },
                {
                    label: "No",
                    onClick: () => alert("Click No"),
                },
            ],
        });
    };

    return (
        <Grid container direction="row" justify="center">
            <Form onSubmit={handleSubmit}>
                <Typography variant="h3" style={{ textAlign: "center" }}>
                    Post Edition
                </Typography>
                <Typography variant="h6">Title</Typography>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Input
                            placeholder="title"
                            name="title"
                            value={post.title}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <label />
                    <Input
                        type="hidden"
                        name="draft"
                        value={post.draft}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid>
                    <Typography variant="h6">Content</Typography>
                    <Input
                        name="body"
                        value={post.body}
                        onChange={handleInputChange}
                    />
                    <Typography variant="h6">Publish Date</Typography>
                    <Input
                        placeholder="publish_date"
                        type="date"
                        value={post.publish_Date}
                        name="publish_date"
                        onChange={handleInputChange}
                    />
                    <Input
                        type="hidden"
                        name="author_firstname"
                        value={post.author_firstname}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="hidden"
                        name="author_id"
                        value={post.author_id}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Button>Update</Button>
                <ButtonDelete onClick={handleDelete}>Delete</ButtonDelete>
            </Form>
        </Grid>
    );
};
