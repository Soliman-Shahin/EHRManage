const mongoose = require('mongoose');
const schema = mongoose.Schema;

let departmentSchema = new schema({
    deptNo: { type: String, required: true, unique: true, max: 5 },
    deptName: { type: String, required: true, max: 50 }
});


module.exports = mongoose.model('Department', departmentSchema, 'Departments');