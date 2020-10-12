module.exports = (app) => {
    const products = require('../controllers/products.controller.js');
	
    app.get('/api/products', products.findAll);
    
    app.get('/api/products/company/:companyId', products.findByCompanyId);

    app.get('/api/products/:ProductId', products.findOne);

    app.post('/api/products', products.create);

    app.put('/api/products/:ProductId', products.update);

    app.delete('/api/products/:ProductId', products.delete);
}