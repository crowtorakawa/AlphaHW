// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs =  require('express-handlebars')
const movies = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set ('view engine', 'handlebars')
app.use(express.static('public'))
// routes setting
app.get('/', (req, res) => {
    const movieOne = {
        id: 1,
        title: 'Here is Movie Title',
        image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
    }
    const movieList = [
        {
          id: 1,
          title: 'Jurassic World: Fallen Kingdom',
          image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg'
        },
        {
          id: 2,
          title: 'Ant-Man and the Wasp',
          image: 'https://movie-list.alphacamp.io/posters/rv1AWImgx386ULjcf62VYaW8zSt.jpg'
        },{
          id: 3,
          title: "Thor: Ragnarok",
          image: "https://movie-list.alphacamp.io/posters/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
        },
        {
          id: 4,
          title: "Avengers: Infinity War",
          image: "https://movie-list.alphacamp.io/posters/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg"
        },
        {
          id: 5,
          title: "Mission: Impossible - Fallout",
          image: "https://movie-list.alphacamp.io/posters/80PWnSTkygi3QWWmJ3hrAwqvLnO.jpg"
        },
        {
          id: 6,
          title: "Incredibles 2",
          image: "https://movie-list.alphacamp.io/posters/x1txcDXkcM65gl7w20PwYSxAYah.jpg"
        },
        {
          id: 7,
          title: "Fifty Shades Freed",
          image: "https://movie-list.alphacamp.io/posters/jjPJ4s3DWZZvI4vw8Xfi4Vqa1Q8.jpg"
        },
        {
          id: 8,
          title: "The First Purge",
          image: "https://movie-list.alphacamp.io/posters/2slvblTroiT1lY9bYLK7Amigo1k.jpg"
        },
      ]
    res.render('index',{movie: movieOne,movies: movies.results});
})

// start and listen on the Express server
app.listen(port, () =>{
    console.log(`Express is listening on http://localhost:${port}`)
})