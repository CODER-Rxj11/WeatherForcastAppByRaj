const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const axios = require('axios');
// BODY PARSER IS USED TO FETCH THE DATA FROM THE HTML PAGE
// EXTENDED TRUE IS BECASE TO FETCH THE EXTENDED DATA FROM HTML PAGE
router.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/a',function(req, res, next) {
  var cityname = req.body.cityname;
  const options = {
    method: 'GET',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.APIKEY}`,
  };
  
  // WITHOUT PAGE REFRESH DATA 
  axios.request(options)
    .then(function (response) {
      if(response.data){
        let weatherdata =response.data;
        let temp = Math.floor((weatherdata.main.temp- 273.15)*1E2)/100;
        let weatherType = weatherdata.weather[0].main;
        const date = new Date();
        let time = date.toLocaleTimeString();// 11:18:48 AM
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
      res.render("weather", {weatherdata,weatherType,temp,cityname,currentDate,time});
    }
  })
  .catch(function(err){
    res.render("sorry")
  })
});

module.exports = router;
