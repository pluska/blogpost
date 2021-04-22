import React, { useState, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { getPostsByAuthor } from "../../redux/services";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to={"/admin/author/"} style={{ textDecoration: "none" }}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Create Post" />
    </ListItem>
    </Link>
    <Link to={"/admin/profile/"} style={{ textDecoration: "none" }}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    </Link>
  </div>
);

export const SecondaryListItems = () => {
  const id = window.sessionStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const loadingPosts = async () => {
    const res = await getPostsByAuthor(id);
    setPosts(res.data);
  };
  useEffect(() => {
    loadingPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <ListSubheader inset>Current Posts</ListSubheader>
      {posts.map((posts) => {
        return (
            <Link to={"/admin/posts/" + posts.id} style={{ textDecoration: "none" }}>
          <ListItem button key={posts.id}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={posts.title} />
          </ListItem>
            </Link>
        );
      })}
    </div>
  );
};
