const express = require('express')
const axios = require('axios')
const CachedData = require('../models/cachedData')

const router = express.Router();

router.get('/nba', async(req, res) => {
    console.log('GET NBA FIRED')
    const url = 'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json'
    let cachedData = await CachedData.findOne({ url });

    if (cachedData && Date.now() - cachedData.lastUpdated.getTime() < 15000) {
      console.log('Returning cached data for NBA feed');
      return res.json(cachedData.data);
    }
  
    console.log('Fetching fresh data for NBA feed');
    const response = await axios.get(url);
    const data = response.data;
    cachedData = await CachedData.findOneAndUpdate({ url }, { data }, { upsert: true, new: true });
    console.log(res.json, 'data res in json')
    return res.json(data);
});
  
router.get('/mlb', async (req, res) => {
    console.log('GET MLB FIRED')
    console.log('mlb route started')
    const url = 'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json';
    let cachedData = await CachedData.findOne({ url });
    if (cachedData && Date.now() - cachedData.lastUpdated.getTime() < 15000) {
        console.log('Returning cached data for MLB feed');
        return res.json(cachedData.data);
      }
    
      console.log('Fetching fresh data for MLB feed');
      const response = await axios.get(url);
      console.log(response)
      const data = response.data;
      console.log(data)
      cachedData = await CachedData.findOneAndUpdate({ url }, { data }, { upsert: true, new: true });
      console.log(res.json, 'data res in json')
      return res.json(data);
  });

  module.exports = router;