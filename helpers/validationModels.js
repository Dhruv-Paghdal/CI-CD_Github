module.exports={
    // Validate the data fields for signup
    "add-new-student":{
        first_name:{
            isLength:{
                options: { min: 1}
            },
            errorMessage: "Firstname cannot be empty"
        },
        last_name:{
            isLength:{
                options: { min: 1}
            },
            errorMessage: "Lastname cannot be empty"
        },
        middle_name:{
            isLength:{
                options: { min: 1}
            },
            errorMessage: "Middelname cannot be empty"
        },
        email:{
            isLength:{
                options: { min: 1}
            },
            isEmail: true,
            errorMessage: "Enter a valid email"
        },
        std:{
            isNumeric: true,
            isLength:{
                options: { min: 1, max : 2}
            },
            errorMessage: "Enter a valid std"
        },
        mobile:{
            isLength:{
                options: { min: 10 , max : 10}
            },
            errorMessage: "Enter a valid mobile"
        },
        password:{
            isLength:{
                options: { min: 6},
            },
            errorMessage: "Min lenght of password should be 6"
        }
    },
    // Validate the data fields for login
    "student-login":{
        username:{
            isLength:{
                options: { min: 1},
            },
            errorMessage: "Enter valid username"
        },
        password:{
            isLength:{
                options: { min: 6},
            },
            errorMessage: "Min lenght of password should be 6"
        }
    }
}