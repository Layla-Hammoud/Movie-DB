const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const movieModel = require("./model/movie");

app.use(express.json());

const currentDate = new Date();
const users = [ { username: 'John', password: '1234' }, { username: 'Jane', password: '5678' } ];

app.get("/test", (request, response) => {
  response.json({ status: 200, message: "ok" });
});

app.get("/time", (request, response) => {
  response.json({
    status: 200,
    message: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
  });
});

app.get("/", (request, response) => {
  response.json("ok");
});

app.get("/hello/:id?", (request, response) => {
  let id = request.params.id;
  if (id) {
    response.status(200).json({ status: 200, message: `Hello,${id}` });
  } else {
    response.status(200).json({ message: "Hello!" });
  }
});

app.post("/movies/add", async (request, response) => {
  const { title, year, rating } = request.query;
  try {
    const newMovie = await movieModel.create({ title, year, rating });
    response.status(200).json(newMovie);
  } catch (error) {
    response.status(403).json({
      status: 403,
      error: true,
      message: error.message,
    });
  }
});

app.get("/movies/read/:order?", async (request, response) => {
  const movies = await movieModel.find();
  if (request.params.order == "by-date") {
    const sortedMovies = [...movies].sort((old, neww) => old.year - neww.year);
    response.status(200).json({ status: 200, data: sortedMovies });
  } else if (request.params.order == "by-rating") {
    const sortedMovies = [...movies].sort(
      (old, neww) => old.rating - neww.rating
    );
    response.status(200).json({ status: 200, data: sortedMovies });
  } else if (request.params.order == "by-title") {
    const sortedMovies = [...movies].sort((first, last) =>
      first.title.localeCompare(last.title)
    );
    response.status(200).json({ status: 200, data: sortedMovies });
  } else {
    response.status(200).json({ status: 200, data: movies });
  }
});
app.get("/movies/read/id/:id", async (request, response) => {
  const id = request.params.id;
  let movie;
  try {
    movie = await movieModel.findById(id);
    if (!movie) {
      throw new Error();
    }
    response.status(200).json({ status: 200, data: movie });
  } catch (error) {
    response.status(404).send({
      status: 404,
      error: true,
      message: `the movie does not exist`,
    });
  }
});
app.put("/movies/update/:id", async (request, response) => {
  const { username, password } = request.body;
  const id = request.params.id;
  const newTitle = request.query.title;
  const newYear = request.query.year ? parseInt(request.query.year) : undefined;
  const newRate = request.query.rating ? parseInt(request.query.rating) : undefined;
  try {
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      throw new Error("User is not authenticated");
    }
    const updatedMovie = await movieModel.updateOne(
      { _id: id },
      { title: newTitle, year: newYear, rating: newRate }
    );
    if (!updatedMovie) {
      response.status(404).send({
        status: 404,
        error: true,
        message: `Movie not found`,
      });
    } else {
      response.status(200).send({ status: 200, data: updatedMovie });
    }
  } catch (error) {
    response.status(401).send({
      status: 401,
      error: true,
      message: error.message, 
    });
  }
});
app.delete("/movies/delete/:id", async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = users.find((user) => user.username === username);
    if (!user || user.password !== password) {
      throw new Error("User is not authenticated");
    }
    const id = request.params.id;
    const deletedMovie = await movieModel.deleteOne({ _id: id });
    if (!deletedMovie) {
      response.status(404).send({
        status: 404,
        error: true,
        message: `Movie not found`,
      });
    } else {
      response.status(200).send({ status: 200, data: deletedMovie });
    }
  } catch (error) {
    response.status(401).send({
      status: 401,
      error: true,
      message: error.message,
    });
  }
});




mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, (request, response) => {
      console.log(`Connected to DB the server is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
