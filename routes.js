'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const podcast = require('./controllers/podcast.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/podcast/:id', podcast.index);

router.get('/podcast/:id/deleteEpisode/:episodeid', podcast.deleteEpisode);
router.post('/podcast/:id/addepisode', podcast.addEpisode);

router.get('/dashboard/deletepodcast/:id', dashboard.deletePodcast);
router.post('/dashboard/addpodcast', dashboard.addPodcast);

router.post('/about/addcomment', about.addComment);

router.post('/podcast/:id/updateepisode/:episodeid', podcast.updateEpisode);

// export router module
module.exports = router;


