const dotenv = require('dotenv');
require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routers/workoutRouters')
const usertRoutes = require('./routers/usersRouter')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', usertRoutes)

// connect to db
const DBURL= process.env.MONGO_LOCAL;
mongoose.connect(DBURL)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

