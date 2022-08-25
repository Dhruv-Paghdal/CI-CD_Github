const express = require('express');
const router = express.Router();
const studentServices = require('../services/student');

// Routes for getting student detail
/**
 * @api {get} / Get loggedin student detail
 * @apiName GetStudent
 *
 * @apiHeader {String} auth-token JWT Token.
 *  
 * @apiSuccess {String} status-code Status-code of response.
 * @apiSuccess {String} message  Student Found .
 * @apiSuccess {Object} data  Response Data.
 * @apiSuccess {String} data.fisrt_name  Student First Name.
 * @apiSuccess {String} data.last_name  Student Last Name.
 * @apiSuccess {String} data.middle_name  Student Middle Name.
 * @apiSuccess {String} data.std  Student Standard.
 * @apiSuccess {String} data.mobile  Student Mobile.
 * @apiSuccess {String} data.email  Student Email.
 * @apiSuccess {String} data.full_name  Student Full Name.
 * 
 * @apiError Invalid-Token Authenticate using a valid token.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "status-code":"500",
 *       "message":"Internal server error.",
 *       "data":[]
 *     }
 * 
 */
router.get("/",async function(req,res){
    const student = await studentServices.getStudentData(req.student.id);
    if(student){
        return res.status(200).json({"status-code":"200","message":"Student Found","data":student})
    }
    else{
        return res.status(500).json({"status-code":"500","message":"Internal server error.","data":[]})
    }
});
/**
 * @api {get} /logout Logout the student
 * @apiName LogoutStudent
 *
 * @apiHeader {String} auth-token JWT Token.
 * 
 * @apiSuccess {String} status-code Status-code of response.
 * @apiSuccess {String} message  Loggedout Successfully.
 * @apiSuccess {array} data  [].
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "status-code":"500",
 *       "message":"Internal server error.",
 *       "data":[]
 *     }
 */
router.get("/logout",function(req,res){
    try {
        req.student=null;
        return res.status(200).json({"status-code":"200","message":"Loggedout Successfully.","data":[]})
    } catch (error) {
        return res.status(500).json({"status-code":"500","message":"Internal server error.","data":[]})
    }
});
module.exports=router;