const studentModel = require('../model/Student');
// Get Loggedin student data
exports.getStudentData=async function(studentId){
    try {
        const student = await studentModel.model.findOne({_id:studentId},{password:0,_id:0,__v:0});
        return  student;
    } catch (error) {
        const err = {"status-code":"500","message":"Internal server error.","data":[]};
    }
}