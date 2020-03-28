const generateUniqueID = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('Verifica se o ID foi criado corretamente', () => {
        const id = generateUniqueID();
        expect(id).toHaveLength(8);
    });
});