const mongoose = require('mongoose');
const schema = mongoose.Schema;

let attendanceSchema = new schema({
    day: {
        type: Date,
        required: true,
        unique: true
    },
    employee: [{
        _id: {
            type: String,
            required: true
        },
        empId: {
            type: String,
            required: true,
            max: 5
        },
        attTime: {
            type: String,
            required: true
        },
        depTime: {
            type: String,
            required: true
        }
    }],
    user_id: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Attendance', attendanceSchema, 'Attendance');