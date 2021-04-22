const bcrypt = require("bcrypt");

module.exports.healthCheck = async () => {
  await connectToDatabase();
  console.log("Connection successful.");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Connection successful." }),
  };
};

module.exports.createPost = async (event) => {
  try {
    const { Post } = await connectToDatabase();
    const {
      title,
      body,
      draft,
      publish_date,
      author_firstname,
      author_id,
    } = JSON.parse(event.body);
    let newPost = await Post.create(
      {
        title,
        body,
        draft,
        publish_date,
        author_firstname,
        author_id,
      },
      {
        fields: [
          "title",
          "body",
          "draft",
          "publish_",
          "author_firstname",
          "author_id",
        ],
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(newPost),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: `Could not create the post ${err}`,
    };
  }
};

module.exports.getOnePost = async (event) => {
  try {
    const { Post } = await connectToDatabase();
    const post = await Post.findByPk(event.pathParameters.id);
    if (!post)
      throw new HTTPError(
        404,
        `Post with id: ${event.pathParameters.id} was not found`
      );
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could not fetch the Post.",
    };
  }
};

module.exports.getAllPosts = async () => {
  try {
    const { Post } = await connectToDatabase();
    const posts = await Post.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the posts.",
    };
  }
};

module.exports.getAllPostsByAuthor = async (event) => {
  try {
    const author_id = event.pathParameters.id;
    const { Post } = await connectToDatabase();
    const posts = await Post.findAll({
      where: {
        author_id: author_id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(posts),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not find the posts.",
    };
  }
};

module.exports.updatePost = async (event) => {
  try {
    const input = JSON.parse(event.body);
    const { Post } = await connectToDatabase();
    const post = await Post.findByPk(event.pathParameters.id);
    if (!post)
      throw new HTTPError(
        404,
        `Post with id: ${event.pathParameters.id} was not found`
      );
    if (input.title) post.title = input.title;
    if (input.body) post.body = input.body;
    if (input.draft) post.draft = input.draft;
    if (input.publish_date) post.publish_date = input.publish_date;
    await post.save();
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could not update the Post.",
    };
  }
};

module.exports.destroyPost = async (event) => {
  try {
    const { Post } = await connectToDatabase();
    const post = await Post.findByPk(event.pathParameters.id);
    if (!post)
      throw new HTTPError(
        404,
        `Post with id: ${event.pathParameters.id} was not found`
      );
    await post.destroy();
    return {
      statusCode: 200,
      body: JSON.stringify(post),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could destroy fetch the Post.",
    };
  }
};

module.exports.createAuthor = async (event) => {
  try {
    const { Author } = await connectToDatabase();
    const { firstname, lastname, email, birthdate, password } = JSON.parse(
      event.body
    );
    let newAuthor = await Author.create(
      {
        firstname,
        lastname,
        email,
        birthdate,
        password,
      },
      {
        fields: ["firstname", "lastname", "email", "birthdate", "password"],
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(newAuthor),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: `Could not create the author ${err}.`,
    };
  }
};

module.exports.getOneAuthor = async (event) => {
  try {
    const { Author } = await connectToDatabase();
    const author = await Author.findByPk(event.pathParameters.id);
    if (!author)
      throw new HTTPError(
        404,
        `Author with id: ${event.pathParameters.id} was not found`
      );
    return {
      statusCode: 200,
      body: JSON.stringify(author),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could not fetch the author.",
    };
  }
};

module.exports.getAllAuthors = async () => {
  try {
    const { Author } = await connectToDatabase();
    const authors = await Author.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(authors),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: "Could not fetch the authors.",
    };
  }
};

module.exports.updateAuthor = async (event) => {
  try {
    const input = JSON.parse(event.body);
    const { Author } = await connectToDatabase();
    const author = await Author.findByPk(event.pathParameters.id);
    if (!author)
      throw new HTTPError(
        404,
        `Author with id: ${event.pathParameters.id} was not found`
      );
    if (input.firstname) author.firstname = input.firstname;
    if (input.lastname) author.lastname = input.lastname;
    if (input.email) author.email = input.email;
    if (input.birthdate) author.birthdate = input.birthdate;
    await author.save();
    return {
      statusCode: 200,
      body: JSON.stringify(author),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could not update the author.",
    };
  }
};

module.exports.destroyAuthor = async (event) => {
  try {
    const { Author } = await connectToDatabase();
    const author = await Author.findByPk(event.pathParameters.id);
    if (!author)
      throw new HTTPError(
        404,
        `Author with id: ${event.pathParameters.id} was not found`
      );
    await author.destroy();
    return {
      statusCode: 200,
      body: JSON.stringify(author),
    };
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || "Could destroy fetch the author.",
    };
  }
};

module.exports.login = async function (event) {
  try {
    const { Author } = await connectToDatabase();
    const { email, password } = JSON.parse(event.body);
    const author = await Author.findOne({ where: { email: email } });
    if (!author) {
      throw new HTTPError(404, `Author or Password not found`);
    } else {
      const equals = password === author.password ? true : false
      if (!equals) {
        throw new HTTPError(404, `Author or Password not found`);
      } else {
        return {
          statusCode: 200,
          body: JSON.stringify(author),
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-Type": "text/plain" },
      body: err.message || `Could not create the author ${err}.`,
    };
  }
};

const connectToDatabase = require("./db");

function HTTPError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}
