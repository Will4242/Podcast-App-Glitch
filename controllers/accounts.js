'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const podcastStore = require('../models/podcast-store.js');

//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {
    
     const podcasts = podcastStore.getAllPodcasts();
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
      title: 'Login or Signup',
      totalPodcasts: numPodcasts,
        totalEpisodes: numEpisodes,
        avgEpisodes: average,
        largest: largestPodcastTitle,
        smallest: smallestPodcastTitle
    };
    response.render('index', viewData);
  },
  //login function to render login page
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  //logout function to render logout page
  logout(request, response) {
    response.cookie('podcast', '');
    response.redirect('/');
  },
 //signup function to render signup page 
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
 //register function to render the registration page for adding a new user
  register(request, response) {
    const user = request.body;
    user.id = uuid();
    user.picture = request.files.picture,
    logger.info('registering' + user.email);
    userstore.addUser(user,function(){
      response.cookie('podcast', user.email);
      logger.info('logging in' + user.email);
    response.redirect('/start');
    });
  },
  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('podcast', user.email);
      logger.info('logging in' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },
 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.podcast;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;