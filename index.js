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
  let id = request.params.id;
  if(id){
    response.status(200).json( {status:200, message:`Hello,${id}`})
  }
  else{
    response.status(200).json({message:"Hello!"})
  }
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
