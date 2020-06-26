const mongoose = require('mongoose');
const schema = mongoose.Schema;

let companySchema = new schema({
    companyName: {
        type: String,
        required: true,
        max: 50
    },
    companyEmail: {
        type: String,
        required: [true, 'email is required!'],
        max: 100
    },
    companyDescription: {
        type: String,
        required: true,
        max: 200
    },
    comapnyImg: {
        type: Buffer
    }
});


module.exports = mongoose.model('Company', companySchema, 'Company');