const mongoose = require('mongoose');
const schema = mongoose.Schema;

let employeeSchema = new schema({
    empNo: { type: String, required: true, unique: true, max: 5 },
    empFName: { type: String, required: true, max: 20 },
    empLName: { type: String, required: true, max: 20 },
    empEmail: { type: String, required: [true, 'email is required!'], max: 100 },
    empAddress: { type: String, required: true, max: 100 },
    empBDay: { type: String, required: true },
    empPhone: { type: String, required: true, max: 15 },
    empGender: {
        type: String,
        max: 1,
        required: function() {
            return this.empGender == 'M' || this.empGender == 'F';
        }
    },
    empRole: { type: String, required: true, max: 50 },
    empBankNo: { type: String, required: true, max: 20 },
    empNationality: { type: String, required: true, max: 30 },
    empNationalId: { type: String, required: true, max: 20 },
    empCollegeDegree: { type: String, required: true, max: 60 },
    empRelationship: { type: String, required: true, max: 20 },
    empSalary: { type: String, required: true, max: 10 },
    empHolidays: { type: String, required: true, max: 5 },
    empDepartment: { type: String, max: 25 },
    empType: { type: String, max: 20 },
    contractType: { type: String, required: true, max: 30 },
    empImg: { type: Buffer }
});


module.exports = mongoose.model('Employee', employeeSchema, 'Employees');