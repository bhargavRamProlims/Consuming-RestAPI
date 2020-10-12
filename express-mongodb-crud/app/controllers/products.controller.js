const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

exports.create = (req, res) => {
	// Validate request
	if (!req.body.code) {
		return res.status(400).send({
			message: "Product Code can not be empty"
		});
	}
	if (!req.body.name) {
		return res.status(400).send({
			message: "Product Name can not be empty"
		});
	}

	const product = new Product({
		code: req.body.code,
		name: req.body.name,
		details: req.body.details || "Untitled details",
		company: req.body.company
	});

	product.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Company."
			});
		});
};

exports.findAll = (req, res) => {

	Product.find().populate('company')
		.then(products => {
			res.send(products);
		}).catch(err => {
			res.status(500).send({
				message: err.message
			});
		});
};

exports.findOne = (req, res) => {
	Product.findById(req.params.ProductId).populate('company')
		.then(products => {
			if (!products) {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			res.send(products);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			return res.status(500).send({
				message: "Error retrieving Product with id " + req.params.ProductId
			});
		});
};


// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
	Product.find({ company: req.params.companyId }).populate('company')
		.exec(function (err, products) {
			if (err) {
				if (err.kind === 'ObjectId') {
					return res.status(404).send({
						message: "Products not found with given Company Id " + req.params.companyId
					});
				}
				return res.status(500).send({
					message: "Error retrieving Products with given Company Id " + req.params.companyId
				});
			}

			res.send(products);
		});
};


exports.update = (req, res) => {
	// Validate Request
	if (!req.body.code) {
		return res.status(400).send({
			message: "Product Code can not be empty"
		});
	}
	if (!req.body.name) {
		return res.status(400).send({
			message: "Product Name can not be empty"
		});
	}

	// Find note and update it with the request body
	Product.findByIdAndUpdate(req.params.ProductId, {
		code: req.body.code,
		name: req.body.name,
		details: req.body.details || "Untitled details",
		company: req.body.company
	}, { new: true })
		.then(result => {
			if (!result) {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			res.send(result);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			return res.status(500).send({
				message: "Error updating Product with id " + req.params.ProductId
			});
		});
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
	Product.findByIdAndRemove(req.params.ProductId).populate('company')
		.then(result => {
			if (!result) {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			res.send({ message: "Product deleted successfully!" });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "Product not found with id " + req.params.ProductId
				});
			}
			return res.status(500).send({
				message: "Could not delete Product with id " + req.params.ProductId
			});
		});
};
