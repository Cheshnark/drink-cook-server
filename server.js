const express = require('express');
const cors = require('cors');
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

const app = express();

app.use(cors());

app.get('/', (req,res) => {
    res.json('hi');
});

app.get('/fun', (req,res) => {
    res.json('fun');
});

app.get('/food/:recipe', (req,res) => {
    const params = (req.params.recipe).replace(/\s/g, '%20').toLowerCase();;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };
    
    fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${params}?rapidapi-key=${process.env.REACT_APP_RAPID_API_KEY}`, options)
        .then(response => response.json())
        .then(response => res.json(response))
        .catch(err => console.error(err));

});



let port = process.env.PORT;
if(port==null || port==""){
  port=8000;
};

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
})