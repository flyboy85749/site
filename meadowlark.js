/* eslint-disable no-undef */
const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlers = require('./lib/handlers')
const app = express();
const bodyParser = require('body-parser');

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// home page route
app.get('/', handlers.home)

// about page route
app.get('/about', handlers.about)

// custom 404 page
app.use(handlers.notFound)

// custom 500 page
app.use(handlers.serverError)


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Express started on http://localhost:${port}` + 
        ' press Ctrl-c to terminate.')
    })
} else {
    module.exports = app
}