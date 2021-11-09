const Company = require('../models/company.model');

exports.createCompany = (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/logo/' + req.body.companyName + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let company = new Company({
            companyName: req.body.companyName,
            companyEmail: req.body.companyEmail,
            companyDescription: req.body.companyDescription,
            companyImg: req.files.imageFile.data,
            user_id: req.user.id
        });
        company.save((err) => {
            if (!err) {
                console.log('Company was Created')
                req.flash('info', 'Company created successfully')
                res.redirect('/dashboard/company')
            } else {
                console.log(err)
            }
        })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
};

exports.company = (req, res) => {
    Company.findById(req.params.id,
        (err, company) => {
            if (err) return err;
            res.status(200).json({ success: true, data: company });
        });
};

exports.updateCompany = (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/logo/' + req.body.companyName + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let newfeilds = {
            companyName: req.body.companyName,
            companyEmail: req.body.companyEmail,
            companyDescription: req.body.companyDescription,
            companyImg: req.files.imageFile.data
        }
        Company.updateOne({ _id: req.params.id }, newfeilds,
            (err) => {
                if (!err) {
                    console.log('Company was Updated')
                    req.flash('info', 'Company Updated successfully')
                    res.redirect('/dashboard/company')
                } else {
                    console.log(err)
                }
            })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
};

exports.deleteCompany = (req, res) => {
    Company.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Company was Deleted')
                req.flash('info', 'Company Deleted successfully')
                res.redirect('/dashboard/company')
            } else {
                console.log(err)
            }
        })
};