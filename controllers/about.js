'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const commentStore = require('../models/comment-store.js');
const accounts = require ('./accounts.js');
var viewData = null;
//var loggedInUser = null;

// create about object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    if (loggedInUser) {
      viewData  = {
        title: 'About the Podcast App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        comments:commentStore.getAllComments()
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
  addComment(request, response) {
    const date = new Date();
    const uuid = require('uuid');
    const podcastId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      commentName: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      date: date,
      comment: request.body.comment,
      
    };
    logger.debug("Creating a new comment" + newComment);
    commentStore.addComment(newComment);
    response.render('about', viewData);
    
  },
};

// export the about module
module.exports = about;