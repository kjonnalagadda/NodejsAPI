import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', async(req, res) =>{
    try{
        const response = await axios.get('https://bored-api.appbrewery.com/random');
        const result = response.data;
        console.log(result.length);
        console.log(result);
        res.render('index.ejs', {data: result});
    }
    catch (error){
        console.error('Failed to make request: ', error.message);
        res.render('index.ejs', {error: error.message});
    }
});

app.post('/', async(req, res) =>{
    try{
        const type = req.body.type;
        const participants = req.body.participants;
        const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
        const result = response.data;
        const result1 = result[Math.floor(Math.random() * result.length)];
        res.render('solution.ejs', {data: result1});
    }
    catch (error){
        console.error('Failed to make a request: ', error.message);
        res.render('solution.ejs', {error: 'No activities that match your criteria.'});
    }
});

app.listen(port, () =>{
    console.log('Server running on ' + port);
});