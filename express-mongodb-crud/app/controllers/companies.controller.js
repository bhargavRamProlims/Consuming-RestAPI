const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');

exports.init = (req, res) => {
    var apple = new Company({
        name: 'Apple',
        street: 'Cupertino, CA 95014',
        phone: '1-408-996-1010'
    });

    apple.save(function (err) {
        if (err) return console.error(err.stack)

        console.log("Apple company is added")

        //Apple now exists, so lets create a Product
        var iphone7 = new Product({
            code: "A-123",
            name: "Iphone7",
            details: "Price: 649.00 USD & FREE shipping",
            company: apple._id
        });

        iphone7.save(function (err) {
            if (err) return console.error(err.stack)

            console.log("Iphone 7 is added")
        });

        var iPadPro = new Product({
            code: "A-456",
            name: "IPadPro",
            details: "Price: 417.67 USD & FREE shipping",
            company: apple._id
        });

        iPadPro.save(function (err) {
            if (err) return console.error(err.stack)

            console.log("IPadPro is added");
        });

    });


    var samsung = new Company({
        name: 'Samsung',
        street: 'Seocho District, Seoul, South Korea',
        phone: '+82-2-2053-3000'
    });

    samsung.save(function (err) {
        if (err) return console.error(err.stack)

        console.log("Samsung company is added")

        // Samsung now exists, so lets create a Product
        var galaxyJ7 = new Product({
            code: "S-012",
            name: "GalaxyJ7",
            details: "Price: 219.00 USD & FREE shipping",
            company: samsung._id
        });

        galaxyJ7.save(function (err) {
            if (err) return console.error(err.stack)
            console.log("GalaxyJ7 is added")
        });

        var galaxyTabA = new Product({
            code: "S-456",
            name: "GalaxyTabA",
            details: "Price: 299.99 USD & FREE shipping",
            company: samsung._id
        });

        galaxyTabA.save(function (err) {
            if (err) return console.error(err.stack)
            console.log("GalaxyTabA is added")
        })
    });

    res.send("Done Initial Data!");
}

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Company Name can not be empty"
        });
    }

    // Create a Company
    const company = new Company({
        name: req.body.name,
        street: req.body.street || "Untitled Street",
        phone: req.body.phone || "Untitled Phone"
    });

    // Save Company in the database
    company.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Company."
            });
        });
};

exports.findAll = (req, res) => {
    Company.find()
        .then(products => {
            res.send(products);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.findOne = (req, res) => {
    Company.findById(req.params.CompanyId)
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.CompanyId
                });
            }
            res.send(products);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.CompanyId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Company with id " + req.params.CompanyId
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Company name can not be empty"
        });
    }

    // Find note and update it with the request body
    Company.findByIdAndUpdate(req.params.CompanyId, {
        name: req.body.name,
        street: req.body.street || "Untitled Street",
        phone: req.body.phone || "Untitled Phone",
    }, { new: true })
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Comapny not found with id " + req.params.CompanyId
                });
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.CompanyId
                });
            }
            return res.status(500).send({
                message: "Error updating Company with id " + req.params.CompanyId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Company.findByIdAndRemove(req.params.CompanyId)
        .then(result => {
            if (!result) {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.CompanyId
                });
            }
            res.send({ message: "Company deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Company not found with id " + req.params.CompanyId
                });
            }
            return res.status(500).send({
                message: "Could not delete Company with id " + req.params.CompanyId
            });
        });
};
