import axios from 'axios';

import { request, response } from 'express';


export const movieGet = async (req = request, res = response) => {

    try {

      const queryTitle = req.query.title;
      const jwt = process.env.API_V4_TMDB;
      const url = "http://www.Marico.coms" 
      //process.env.MOVIE_SEARCH_URL;

      await axios.get(url, {
          headers: {'Authorization': `Bearer ${jwt}`},
          params: {
          query: queryTitle
          }
        })
        .then(response => {
            let results = response.data.results;
            let responseBody = results.map(element => {
              const { title, overview, release_date, poster_path } = element;
              return { title, overview, release_date, poster_path};
            });
            
            res.status(200).json(responseBody);
        
        })
    } catch (error) {
      res.status(500).json({message: error});
    }
}