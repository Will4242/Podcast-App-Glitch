'use strict';

const logger = require('../utils/logger');
const podcastStore = require('../models/podcast-store');
const accounts = require ('./accounts.js');

const podcast = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const podcastId = request.params.id;
    logger.debug('Podcast id = ' + podcastId);
    if (loggedInUser) {
    const viewData = {
      title: 'Podcast',
      podcast: podcastStore.getPodcast(podcastId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture
    };
    response.render('podcast', viewData);
    }
    else response.redirect('/');
},
  deleteEpisode(request, response) {
    const podcastId = request.params.id;
    const episodeId = request.params.episodeid;
    logger.debug(`Deleting Episode ${episodeId} from Podcast ${podcastId}`);
    podcastStore.removeEpisode(podcastId, episodeId);
    response.redirect('/podcast/' + podcastId);
  },
  addEpisode(request, response) {
    const uuid = require('uuid');
    const podcastId = request.params.id;
    const podcast = podcastStore.getPodcast(podcastId);
    const newEpisode = {
    id: uuid(),
    title: request.body.title,
    artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
  };
    podcastStore.addEpisode(podcastId, newEpisode);
    response.redirect('/podcast/' + podcastId);
  },
  
  updateEpisode(request, response) {
    const podcastId = request.params.id;
    const episodeId = request.params.episodeid;
    logger.debug("updating episode " + episodeId);
    const updatedEpisode = {
      title: request.body.title,
      artist: request.body.artist,
      genre: request.body.genre,
      duration: request.body.duration
    };
    podcastStore.editEpisode(podcastId, episodeId, updatedEpisode);
    response.redirect('/podcast/' + podcastId);
  }
};



module.exports = podcast;