const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); //importante para desfazer migrações e zerar banco de dados antes de fazer os testes
        await connection.migrate.latest(); //migrações devem ser executadas antes de teste ser executado.
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('Verifica se é possível criar uma nova ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('Authorization', '31ef4ecb') teste para verificar autorizações na hora de testar a inserção de casos nos profiles(fazer depois)
        .send({
            "nome" : "APAD do teste master supremo",
	        "email" : "contato@apad.com.br", 
	        "whatsapp" : "28999153123", 
	        "cidade" : "Cachoeiro",
	        "uf" : "ES"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});