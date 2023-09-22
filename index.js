const express = require('express');
const app = express();

const currentDate = new Date();

app.get('/test',(request,response)=>{
    response.send({status:200, message:"ok"})
})

app.get('/time',(request,response)=>{
    response.send({status:200, message:`${currentDate.getHours()}:${currentDate.getMinutes()}`})
})

app.get('/',(request,response)=>{
    response.send('ok')
})

app.listen(3000,(request,response)=>{
    console.log(`the server is running on port 3000`)
})