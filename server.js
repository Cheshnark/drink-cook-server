const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req,res) => {
    res.json('hi');
});

app.get('/food', (req,res) => {

    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/list',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        },
        params: {from: '0', size: '20', q:''},
      };
      
      axios.request(options).then(function (response) {
          res.json(response.data);
      }).catch(function (error) {
          console.error(error);
      });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})