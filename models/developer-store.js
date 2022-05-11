'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');


const developerStore = {

  
  developerCollection: require('./developer-store.json').developers,
  
  store: new JsonStore('./models/developer-store.json', { developers: [] }),
  collection: 'developers',

  
  getAllDevelopers() {
    return this.store.findAll(this.collection);
  },

};


module.exports = developerStore;