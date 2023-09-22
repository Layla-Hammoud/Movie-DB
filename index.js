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

app.get("/movies/create", (request, response) => {
  response.status(200).json({ message: "create a movie" });
});

app.get("/movies/read/:order?", (request, response) => {
    if(!request.params.order){
        response.status(200).json( {status:200, data:movies } );
    }
    else if(request.params.order == "by-date"){
        sortedMovies = [...movies].sort((old, neww) => old.year - neww.year);
        response.status(200).json( {status:200, data:sortedMovies } );
    }
    else if(request.params.order == "by-rating"){
        sortedMovies = [...movies].sort((old, neww) => old.rating - neww.rating);
        response.status(200).json( {status:200, data:sortedMovies } );
    }else if(request.params.order == "by-title"){
        sortedMovies = [...movies].sort((first,last)=>first.title.localeCompare(last.title))
        response.status(200).json( {status:200, data:sortedMovies } );
    }


});
app.get("/movies/update", (request, response) => {
  response.status(200).json({ message: "update a movie" });
});
app.get("/movies/delete", (request, response) => {
  response.status(200).json({ message: "delete a movie" });
});

app.listen(3000, (request, response) => {
  console.log(`the server is running on port 3000`);
});
