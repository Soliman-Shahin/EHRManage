const mongoose = require('mongoose');
const schema = mongoose.Schema;

let policySchema = new schema({
    policyNo: {
        type: String,
        required: true,
        unique: true,
        max: 5
    },
    policyName: {
        type: String,
        required: true,
        max: 50
    },
    details: {
        type: String,
        required: true,
        max: 200
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Policy', policySchema, 'Policies');