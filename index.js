const express = require('express');
const app = express();

app.get('/',(request,response)=>{
    response.send('ok')
})

app.listen(3000,(request,response)=>{
    console.log(`the server is running on port 3000`)
})