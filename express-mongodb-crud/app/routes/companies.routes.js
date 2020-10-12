module.exports = (app) => {

	const companies = require('../controllers/companies.controller.js')
	//data initializing
	app.get('/api/companies/init', companies.init);
	//creating companies
	app.post('/api/companies', companies.create);
	//find all companies
	app.get('/api/companies', companies.findAll);
	//find by company id 
	app.get('/api/companies/:CompanyId', companies.findOne);
	//update by company id
	app.put('/api/companies/:CompanyId', companies.update);
	//delete by company id
	app.delete('/api/companies/:CompanyId', companies.delete);
}