const express = require("express");
const app = express();

const currentDate = new Date();

app.get("/test", (request, response) => {
  response.send({ status: 200, message: "ok" });
});

app.get("/time", (request, response) => {
  response.send({
    status: 200,
    message: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
  });
});

app.get("/", (request, response) => {
  response.json("ok");
});

app.get("/hello/:id?", (request, response) => {
  response.json(request.params.id ? `Hello ${request.params.id}!` : `Hello!`);
});

app.get("/search", (request, response) => {
  let searchData = request.query.s;
  if(searchData){
    response.json({status:200, message:"ok", data:searchData});
  }else{
    response.status(500).json({status:500, error:true, message:"you have to provide a search"})
  }
});

app.listen(3000, (request, response) => {
  console.log(`the server is running on port 3000`);
});
