const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define Path
const pathPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars and customize Views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathPublic))

app.get('', (req, res) => {
    res.render('index', {
        name: "Hardik Amareliya",
        title: "Weather"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: "Hardik Amareliya",
        title: "About"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is help page",
        name: "Hardik Amareliya",
        title: "Help"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided.'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error){
                return res.send({error})
            }

            res.status(200).send({
                forecast,
                place,
                address
            })
        })
    })
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hardik',
        errorMessage: 'Help artical not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hardik',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port '+ port);
})