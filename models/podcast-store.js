'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const podcastStore = {

  store: new JsonStore('./models/podcast-store.json', { podcastCollection: [] }),
  collection: 'podcastCollection',

  getAllPodcasts() {
    return this.store.findAll(this.collection);
  },

  getAllPodcastsForUser(id) {
    return this.store.findBy(this.collection, { userid: id });
  },
  
  getPodcast(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPodcast(podcast, response) {
   podcast.picture.mv('tempimage', err => {
       if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            podcast.picture = result.url;
            response();
          });
       }
   });
   this.store.add(this.collection, podcast);
},

  removePodcast(id) {
    const podcast = this.getPodcast(id);
    this.store.remove(this.collection, podcast);
  },

  removeAllPodcasts() {
    this.store.removeAll(this.collection);
  },

  addEpisode(id, episode) {
    const podcast = this.getPodcast(id);
    podcast.episodes.push(episode);
  },

  removeEpisode(id, episodeId) {
    const podcast = this.getPodcast(id);
    const episodes = podcast.episodes;
    _.remove(episodes, { id: episodeId});
  },
  
   editEpisode(id, episodeId, updatedEpisode) {
    const podcast = this.getPodcast(id);
    const episodes = podcast.episodes;
    const index = episodes.findIndex(episode => episode.id === episodeId);
    episodes[index].title = updatedEpisode.title;
    episodes[index].artist = updatedEpisode.artist;
    episodes[index].genre = updatedEpisode.genre;
    episodes[index].duration = updatedEpisode.duration;
  },
  
  getUserPodcasts(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  }
  
};

module.exports = podcastStore;