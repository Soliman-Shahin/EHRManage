const mongoose = require('mongoose');
const schema = mongoose.Schema;

let holidaysSchema = new schema({
    empId: {
        type: String,
        required: true,
        max: 5
    },
    empFName: {
        type: String,
        required: true,
        max: 50
    },
    empLName: {
        type: String,
        required: true,
        max: 50
    },
    holiDate: {
        type: Date,
        required: true
    },
    remainingDays: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Holiday', holidaysSchema, 'Holidays');