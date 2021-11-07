const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const schema = mongoose.Schema;

let employeeSchema = new schema({
    _id: {
        type: Number,
        required: true
    },
    empFName: {
        type: String,
        required: true,
        max: 20
    },
    empLName: {
        type: String,
        required: true,
        max: 20
    },
    empEmail: {
        type: String,
        required: [true, 'email is required!'],
        max: 100,
        unique: true
    },
    empAddress: {
        type: String,
        max: 100
    },
    empBDay: {
        type: String
    },
    empPhone: {
        type: Number,
        required: true,
        unique: true
    },
    empGender: {
        type: String,
        max: 1,
        required: function() {
            return this.empGender == 'M' || this.empGender == 'F';
        }
    },
    empRole: {
        type: String,
        max: 50
    },
    empBankNo: {
        type: String,
        max: 20,
        unique: true
    },
    empNationality: {
        type: String,
        max: 30
    },
    empNationalId: {
        type: String,
        required: true,
        max: 20,
        unique: true
    },
    empCollegeDegree: {
        type: String,
        max: 60
    },
    empRelationship: {
        type: String,
        max: 20
    },
    empSalary: {
        type: Number,
        required: true
    },
    empHolidays: {
        type: Number
    },
    empDepartment: {
        type: String,
        max: 25
    },
    empType: {
        type: String,
        max: 20
    },
    contractType: {
        type: String,
        max: 30
    },
    empImg: {
        type: Buffer
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

employeeSchema.set("toJSON", {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

autoIncrement.initialize(mongoose.connection);
employeeSchema.plugin(autoIncrement.plugin, { model: "Employee", startAt: 1, });

module.exports = mongoose.model('Employee', employeeSchema, 'Employees');