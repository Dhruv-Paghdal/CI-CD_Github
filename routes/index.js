const express = require('express');
const router = express.Router();
const jwt  = require('jsonwebtoken');
const studentModel = require("../model/Student");
const secret = "123!@#";

router.get("/", (req, res) => {
    res.send("Hello World!")
})
// Routes for signup and login
/**
 * @api {post} /signup Register a new student
 * @apiName RegisterStudent
 * 
 * @apiBody {String} first_name Student First Name
 * @apiBody {String} middle_name Student Middle Name
 * @apiBody {String} last_name Student Last Name
 * @apiBody {Number} std Student Standard
 * @apiBody {String} email Student Email Address
 * @apiBody {String} mobile Student Mobile Number
 * @apiBody {String} password Student Password
 *
 * @apiSuccess {String} status-code Status-code of response.
 * @apiSuccess {String} message Student registered successfully .
 * @apiSuccess {String} data JWT Token.
 * 
 * @apiError UserExist Email_ID or Mobile already in use.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "status-code":"500",
 *       "message":"Internal server error.",
 *       "data":[]
 *     }
 *
 */
router.post("/signup",validation('add-new-student'),async function(req,res){
    try {
        const {first_name,middle_name,last_name,std,mobile,email,password} = req.body;
        const studentExist = await studentModel.model.findOne({$or: [{email},{mobile}]});
        if(studentExist){
            return res.status(400).json({"status-code":"400","message":"Signup failed, Email_ID or Mobile already in use.","data":[]})
        } 
        else{
            const newStudent  = await studentModel.model.create({
                first_name,
                middle_name,
                last_name,
                std,
                mobile,
                email,
                password
            });
            if(newStudent){
                const data = {
                    student:{
                        id:newStudent._id
                    }
                }
                const token = jwt.sign(data,secret);
                return res.status(201).json({"status-code":"201","message":"Student registered successfully","data":token})
            }
            else{
                return res.status(400).json({"status-code":"400","message":"Signup failed, Error in adding the student.","data":[]})
            }
        }  
    } catch (error) {
        return res.status(500).json({"status-code":"500","message":"Internal server error.","data":[]})
    }
});
/**
 * @api {post} /login Register a new student
 * @apiName StudentLogin
 *
 * 
 * @apiBody {String} username Student Username
 * @apiBody {String} password Student password
 * 
 * @apiSuccess {String} status-code Status-code of response.
 * @apiSuccess {String} message Student Loggedin successfully .
 * @apiSuccess {String} data JWT Token.
 * 
 * @apiError Invalid-Credentials Enter correct credentials.
 * 
 * @apiErrorExample {json} Error-Response:
 *     {
 *       "status-code":"500",
 *       "message":"Internal server error.",
 *       "data":[]
 *     }
 *
 */
router.post("/login",validation('student-login'),async function(req,res){
    try {
        const {username,password} = req.body;
        const studentExist = await studentModel.model.findOne({$or: [{email: username},{mobile: username}]});
        if((studentExist) && (studentExist.password===password)){
            const data = {
                student:{
                    id:studentExist._id
                }
            }
            const token = jwt.sign(data,secret);
            return res.status(200).json({"status-code":"200","message":"Student loggedin successfully","data":token})
        } 
        else{
            return res.status(400).json({"status-code":"400","message":"Enter correct credentials.","data":[]})
        }  
    } catch (error) {
        return res.status(500).json({"status-code":"500","message":"Internal server error.","data":[]})
    }
});
module.exports=router;