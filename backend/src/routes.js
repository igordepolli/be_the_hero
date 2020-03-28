const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const CasosController = require('./controllers/CasosController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({ //validação para inserir no BD
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(1000000000).max(99999999999),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(), //validação para verificar se a autorização com o header está correta
    }).unknown(),
}), ProfileController.index);

routes.get('/casos', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number().integer(),
    })
}),CasosController.index);

routes.post('/casos', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        valor: Joi.number().required().min(1),
    })
}), CasosController.create);


routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(), //validação para garantir que o parametro passado é um id válido de um caso
    })
}), CasosController.delete);

module.exports = routes;