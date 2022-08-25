const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    middle_name:String,
    full_name:String,
    std:Number,
    email:String,
    mobile:String,
    password:String
});
studentSchema.pre('save',function (next) {
    const student = this;
    student.full_name =  student.last_name + ' ' + student.first_name + ' ' + student.middle_name;
    next();
});
const student = mongoose.model("student",studentSchema);
module.exports={
    model:student
}