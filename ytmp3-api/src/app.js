const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
const path = require('path');
require('dotenv').config();

//temp
const videoController = require('./controllers/videoController')

app.use(bodyParser.json({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib
app.use(bodyParser.urlencoded({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib


app.set('port', process.env.PORT || 3000) 

//get routes
//BROKEN , DIRECTLY USE CONTROLLER INSTEAD
//CORS
//const videoRoutes = require("./routes/video")

//use cors
app.use(cors());
app.options('*', cors());




app.get('/', (req, res, next) =>{
    res.send({status : "REACHED /"});
})

app.get('/video/:url' , videoController.showVideo )

//server startup
app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})