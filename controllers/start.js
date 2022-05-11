'use strict';

// import all required modules
const logger = require('../utils/logger');
const podcastStore = require('../models/podcast-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){

      const podcasts = podcastStore.getAllPodcastsForUser(loggedInUser.id);
      let numPodcasts = podcasts.length;
      let numEpisodes = 0;
      for (let item of podcasts) {
        numEpisodes += item.episodes.length;
      }
      
      let average = numEpisodes/numPodcasts

    let currentLargest = 0;
let largestPodcastTitle = "";

for (let podcast of podcasts) {
    
    if(podcast.episodes.length > currentLargest){
        currentLargest = podcast.episodes.length;
        largestPodcastTitle = podcast.title;
    }
       
}
    let currentSmallest = 1;
let smallestPodcastTitle = "";

for (let podcast of podcasts) {
    
    if(podcast.episodes.length < currentSmallest){
        currentSmallest = podcast.episodes.length;
        smallestPodcastTitle = podcast.title;
    }
       
}
      

      const viewData = {
        title: 'Welcome to the Podcast App!',
        totalPodcasts: numPodcasts,
        totalEpisodes: numEpisodes,
        avgEpisodes: average,
        largest: largestPodcastTitle,
        smallest: smallestPodcastTitle,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;

