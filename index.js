
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

//this ensure all the npm packages added above can be used throughout the application.
global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index.ejs', { });
});

//sets the UI routers to be used in the web browser
const petsRouter = require('./routes/pets')
app.use('/pets', petsRouter);

const petTypeRouter = require('./routes/petType')
app.use('/petType', petTypeRouter);

const ownerRouter = require('./routes/owner')
app.use('/owner', ownerRouter);

const userRouter = require('./routes/users')
app.use('/users', userRouter);

const loginRouter = require('./routes/login')
app.use('/login', loginRouter);

const homeRouter = require('./routes/home')
app.use('/home', homeRouter);



// sets all API routers to be used in the restfulAPI
// const apiRouter = require('./routes/api')
// app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

//ensures that the server is started and logs which port it's running on
app.listen(PORT, () => {
    console.log(`Awesome pets directory, running on ${PORT}.`)
});