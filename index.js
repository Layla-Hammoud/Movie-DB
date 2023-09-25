const express = require("express");
const app = express();

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب", year: 1992, rating: 6.2 },
];

const currentDate = new Date();

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

app.get("/search", (request, response) => {
  let searchData = request.query.s;
  if (searchData) {
    response.status(200).json({ status: 200, message: "ok", data: searchData });
  } else {
    response.status(500).json({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

app.post("/movies/add", (request, response) => {
  const { title, year, rating } = request.query;
  if (!title || !year) {
    response.status(403).json({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else if (year.length !== 4 || Number.isNaN(parseInt(year))) {
    response.status(403).json({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else {
    let rate;
    if (!rating) {
      rate = "4";
    }
    movies.push({ title: title, year: year, rating: rate });
    response.status(200).json({ movies });
  }
});

app.get("/movies/read/:order?", (request, response) => {
  if (!request.params.order) {
    response.status(200).json({ status: 200, data: movies });
  } else if (request.params.order == "by-date") {
    sortedMovies = [...movies].sort((old, neww) => old.year - neww.year);
    response.status(200).json({ status: 200, data: sortedMovies });
  } else if (request.params.order == "by-rating") {
    sortedMovies = [...movies].sort((old, neww) => old.rating - neww.rating);
    response.status(200).json({ status: 200, data: sortedMovies });
  } else if (request.params.order == "by-title") {
    sortedMovies = [...movies].sort((first, last) =>
      first.title.localeCompare(last.title)
    );
    response.status(200).json({ status: 200, data: sortedMovies });
  }
});
app.get("/movies/read/id/:id", (request, response) => {
  let id = request.params.id - 1; // if the id is 1 we will sent the first movies in the array
  if (id < 0 || id > movies.length - 1) {
    response.status(404).send({
      status: 404,
      error: true,
      message: `the movie ${id + 1} does not exist`,
    });
  } else {
    response.status(200).json({ status: 200, data: movies[id] });
  }
});
app.put("/movies/update/:id", (request, response) => {
  const id = parseInt(request.params.id) - 1;
  const newTitle = request.query.title;
  const newYear = parseInt(request.query.year);
  const newRate = parseInt(request.query.rating);
  if (movies[id] === undefined) {
    response.status(404).send({
      status: 404,
      error: true,
      message: `the movie ${id + 1} does not exist`,
    });
  }
    if(newTitle!==undefined){
      movies[id].title = newTitle;
    }
    if(!Number.isNaN(newYear)){
      movies[id].year = newYear;
    }
    if(!Number.isNaN(newRate)){
      movies[id].rating = newRate;
    }
    response.status(200).send({ status: 200, data: movies })
});

app.delete("/movies/delete/:id", (request, response) => {
  const id = request.params.id - 1;
  if (id < 0 || id > movies.length - 1) {
    response.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${id + 1} does not exist`,
    });
  } else {
    movies.splice(id, 1);
    response.status(200).json({ status: 200, data: movies });
  }
});

app.listen(3000, (request, response) => {
  console.log(`the server is running on port 3000`);
});
