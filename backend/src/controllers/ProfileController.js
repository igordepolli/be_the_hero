const connection = require('../database/connection');

module.exports = {

    // async searchForName (request) {
    //     const { nome } = request.query;

    //     const ong = await connection('ongs').where('nome', nome).select('id').first();

    //     if (ong == null) {
    //         return response.status(404).json({ error: "ONG não encontrada!"});
    //     }

    //     return ong;
    // },

    // async search (request, response) {
    //     const ong_id = this.searchForName(request);

    //     console.log(ong_id);

    //     const casos = await connection('casos').where('ong_id', ong_id).select('*');

    //     if (casos == null) {
    //         return response.status(404).json({ error: "Não há casos para esta ONG!"});
    //     }

    //     return response.json(casos);
    // },


    async index (request, response) {
        const ong_id = request.headers.authorization;

        const casos = await connection('casos').where('ong_id', ong_id).select('*');

        return response.json(casos);
    }
};