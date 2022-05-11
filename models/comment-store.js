'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const logger = require('../utils/logger');


const commentStore = {

  store: new JsonStore('./models/comment-store.json', { commentCollection: [] }),
  collection: 'commentCollection',

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  getAllCommentsForUser(id) {
    return this.store.findBy(this.collection, { userid: id });
  },
  
  getcomment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addComment(comment, response) {
   this.store.add(this.collection, comment);
},

  removeComment(id) {
    const comment = this.getComment(id);
    this.store.remove(this.collection, comment);
  },

  removeAllComments() {
    this.store.removeAll(this.collection);
  },
  
  getUserComments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  }
  
};

module.exports = commentStore;