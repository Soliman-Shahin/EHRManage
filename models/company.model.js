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
    companyImg: {
        type: Buffer
    },
    user_id: {
        type: String,
        required: true
    },
    department: [{
        deptNo: {
            type: Number,
            max: 5
        },
        deptName: {
            type: String,
            max: 50
        }
    }]
});


module.exports = mongoose.model('Company', companySchema, 'Companies');