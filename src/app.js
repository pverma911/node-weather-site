const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require("./utils/forecast");
const geocode= require("./utils/geocode");


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Checker',
        name: 'Pranshu Verma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranshu Verma'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "It's really easy to check the weather. Why are you even asking for help?",
        title: 'Help',
        name: 'Pranshu Verma'
    })
})


// Using the APIs to check weather:

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

// req.query holds the search query's of a URL

app.get("/products", (req,res) =>{

    if(!req.query.search){
        return res.send({
            error: "Search param not found"
        })
    } else{
        console.log(req.query);
        res.send({
            products: []
        });
    
    }
    
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranshu Verma',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pranshu Verma',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})