const jwt = require('jsonwebtoken');
const secret="123!@#";

const isAuthenticated = function(req,res,next){
    const token = req.headers['auth-token'];
    if(!token){
        return res.status(401).json({"status-code":"401","message":"Authenticate using a valid token","data":[]});
    }
    try {
        const data = jwt.verify(token,secret);
        req.student = data.student;
        const studentId = data.student.id;
        next();
    } catch (error) {
        return res.status(401).json({"status-code":"401","message":"Authenticate using a valid token","data":[]});
    }
}

module.exports=isAuthenticated;