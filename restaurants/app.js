const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

// const restaurantData = require('./restaurant.json')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('index',{restaurants: restaurants.results})
})

app.get('/restaurants/:rest_id',(req,res) =>{
    const rest = restaurants.results.find(
        rest => rest.id.toString() === req.params.rest_id
      )  
    

    res.render('show', {restaurants: rest });
})

app.get('/search' , (req,res) =>{

    const keyword = req.query.keyword
    console.log(keyword)

    const categorySearch = restaurants.results.filter(rest=> {
        return rest.category.includes(keyword)
    })

    const nameSearch = restaurants.results.filter(rest=> {
        return rest.name.includes(keyword)
    })
    let object = { ...categorySearch, ...nameSearch};
    console.log(object)
    res.render('index', {restaurants: object }) 
       
}) 

app.listen(port,()=>{
    console.log(`Express is listening on http://localhost:${port}`)
})
