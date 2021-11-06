const mongoose = require('mongoose');
const schema = mongoose.Schema;

let attendanceSchema = new schema({
    day: {
        type: Date,
        required: true,
        unique: true
    },
    employee: [{
        empNo: {
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
        attTime: {
            type: String,
            required: true
        },
        depTime: {
            type: String,
            required: true
        }
    }]
});


module.exports = mongoose.model('Attendance', attendanceSchema, 'Attendance');