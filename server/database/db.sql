CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title text NOT NULL,
    body text,
    draft BOOLEAN,
    author_firstname text NOT NULL CHECK (author_firstname <> ''),
    publish_date date NOT NULL,
    author_id INTEGER REFERENCES authors(id)
);

CREATE TABLE IF NOT EXISTS author (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    firstname text NOT NULL CHECK (firstname <> ''),
    lastname text NOT NULL CHECK (lastname <> ''),
    email text NOT NULL CHECK (email <> ''),
    birthdate date NOT NULL,
    password text NOT NULL,
);