const knex= require('knex');

const config= require('../knexfile');

const environment= process.env.ENVIRONMENT;

module.exports= knex(config[environment]);