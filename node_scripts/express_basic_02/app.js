const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res) => {
    res.send(`this is my first express web app`)
})

app.listen(port,()=>{
    console.log(`Express is running on localhost:${port}`)
})

app.get('/popular/:language/languages/:name',(req,res)=>{
    res.send(`<h1>${req.params.language} is my express ${req.params.name} app</h1>`)
})
    
