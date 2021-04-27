import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "../containers/Home";
import NotFoundPage from "../components/404";
import EditPost from "../components/EditPost";
import Login from "../containers/Login";
import SingIn from "../containers/Signin";
import NewPost from "../containers/NewPost";
import Blog from "../containers/Blog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostsByAuthor } from "../containers/PostsByAuthor";
import { Provider } from "react-redux";
import generateStore from "../redux/store";
import Dashboard from "../components/Dashboard";
import Context from "../components/App/Context";
import EditAuthor from "../components/EditAuthor";

const App = () => {
  const store = generateStore();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signin" component={SingIn} />
          <Route exact path="/new/post" component={NewPost} />
          <Route exact path="/post/:postId" component={Blog} />
          <Route
            exact
            path="/author/posts/:authorId"
            component={PostsByAuthor}
          />
          <Route component={EditPost} exact path="/admin/posts/:id"/>
          <Route component={EditAuthor} exact path="/admin/profile/"/>
          <Context.Consumer>
            {({ isAuth }) =>
              isAuth ? (
                <Route>
                <Dashboard exact path="/admin/author" />
                </Route>
                ) : (
                  <Route>
                  <Login exact path="/admin/author" />
                  </Route>
                  )
                }
          </Context.Consumer>
          <Route component={NotFoundPage} />
        </Switch>
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
