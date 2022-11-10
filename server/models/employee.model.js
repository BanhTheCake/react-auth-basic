const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
}, {
    collection: 'employees',
    timestamps: true
});

module.exports = mongoose.model('employees', employeeSchema)