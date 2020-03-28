const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; //linha modificada pra verificar qual é o ambiente(de teste ou de execução)

const connection = knex(config);

module.exports = connection;