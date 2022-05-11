'use strict';

const uuid = require('uuid');

// import all required modules
const logger = require('../utils/logger');
const podcastStore = require('../models/podcast-store.js');
const accounts = require ('./accounts.js');


// create dashboard object
const dashboard = {
 
  
  deletePodcast(request, response) {
    const podcastId = request.params.id;
    logger.debug(`Deleting Podcast ${podcastId}`);
    podcastStore.removePodcast(podcastId);
    response.redirect('/dashboard/');
  },
  addPodcast(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newPodcast = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      episodes: []
    };
    logger.debug("Creating a new Podcast" + newPodcast);
    podcastStore.addPodcast(newPodcast, function() {
      response.redirect("/dashboard");
    });
  },
  
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    const viewData = {
      title: 'Podcast Dashboard',
      podcasts: podcastStore.getUserPodcasts(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    logger.info('about to render' + viewData.podcasts);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
};

// export the dashboard module
module.exports = dashboard;