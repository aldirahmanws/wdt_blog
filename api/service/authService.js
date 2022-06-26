const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../config/database");

exports.createNewUser = async (newUser) => {
    try {
        const isAlreadyAdded = await db.query(
            `SELECT COUNT(*) FROM public."user" where "email" = '${newUser.email}'`
        );

        if (parseInt(isAlreadyAdded.rows[0].count) > 0) {
            throw {
                status_code: 400,
                message: "Email Duplicate",
            };
        }

        newUser.password = await bcrypt.hash(newUser.password, 10);

        let insertQuery = `INSERT INTO public."user"(
	        "name", "email", "password")
	        VALUES ('${newUser.name}', '${newUser.email}', '${newUser.password}');`;

        const result = await db.query(insertQuery);
        if (!result) {
            throw {
                status_code: 500,
                message: result.message,
            };
        }

        return true;
    } catch (error) {
        throw {
            status_code: 500,
            message: error.message || "Failed",
        };
    }
};

exports.loginUser = async (dataUser) => {
    try {
        const user = await db.query(
            `SELECT * FROM public."user" where "email" = '${dataUser.email}'`
        );
        if (user.rowCount == 0) {
            throw {
                status_code: 400,
                message: "Email not found",
            };
        }

        var checkPassword = await bcrypt.compare(
            dataUser.password,
            user.rows[0].password
        );
        if (!checkPassword) {
            throw {
                status_code: 400,
                message: "Password does not match",
            };
        }

        const accessToken = await jwt.sign(
            {
                user_id: user.rows[0].user_id,
                name: user.rows[0].name,
                email: user.rows[0].email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = await jwt.sign(
            {
                user_id: user.rows[0].user_id,
                name: user.rows[0].name,
                email: user.rows[0].email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d",
            }
        );

        let insertRefreshToken = `INSERT INTO public."token"(
	        "refresh_token")
	        VALUES ('${refreshToken}');`;

        const resultInsertRefreshToken = await db.query(insertRefreshToken);
        if (!resultInsertRefreshToken) {
            throw {
                status_code: 400,
                message: resultInsertRefreshToken.message,
            };
        }
        const responseLogin = {
            refresh_token: refreshToken,
            access_token: accessToken,
        };
        return responseLogin;
    } catch (error) {
        throw {
            status_code: error.status_code || 500,
            message: error.message,
        };
    }
};

exports.refreshToken = async (refresh_token) => {
    try {
        const token = await db.query(`SELECT * FROM public."token" where "refresh_token" = '${refresh_token}'`)
        
        if(token.rowCount == 0){
            throw {
                status_code: 400,
                message: "Refresh Token not valid",
            };
        }
        const user = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, result) => {
            
            if(err){
                if (err.message == "jwt expired") {
                    throw {
                        status_code: 400,
                        message: "Token expired",
                    }
                }
                throw {
                    status_code: 400,
                    message: "Token not valid",
                }
            }

            return result
        })
        
        const accessToken = await jwt.sign(
            {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        );
        const refreshToken = await jwt.sign(
            {
                user_id: user.user_id,
                name: user.name,
                email: user.email
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: "7d",
            }
        );

        let insertRefreshToken = `INSERT INTO public."token"(
	        "refresh_token")
	        VALUES ('${refreshToken}');`;

        const resultInsertRefreshToken = await db.query(insertRefreshToken);
        if (!resultInsertRefreshToken) {
            throw {
                status_code: 400,
                message: resultInsertRefreshToken.message,
            };
        }
        const responseLogin = {
            refresh_token: refreshToken,
            access_token: accessToken,
        };
        return responseLogin;
    } catch (error) {
        throw {
            status_code: error.status_code || 500,
            message: error.message,
        };
    }
};

exports.forgotPasswordUser = async (email) => {
    try {
        const password = "12345678"
        const newPassword = await bcrypt.hash(password, 10);
        const user = await db.query(`SELECT * FROM public."user" where "email" = '${email}'`)
        if(user.rowCount == 0){
            throw {
                status_code: 400,        
                message: "Email not found"
            };
        }

        const updateUser = await db.query(`UPDATE public."user" set "password" = '${newPassword}' where "email" = '${email}'`)
        if (!updateUser) {
            throw {
                status_code: 200,
                message: resultInsertRefreshToken.message
            };
        }
            
        const responseForgotPassword = {
            new_password: password
        };

        return responseForgotPassword;
    } catch (error) {
        throw {
            status_code: error.status_code || 500,
            message: error.message,
        };
    }
};

exports.resetPasswordUser = async (dataUser) => {
    try {
        const user = await db.query(`SELECT * FROM public."user" where "email" = '${dataUser.email}'`)
        if(user.rowCount == 0){
            throw {
                status_code: 200,
                message: "Email not found",
            };
        }
        
        const newPassword = await bcrypt.hash(dataUser.new_password, 10);
        const updatePasswordUser = await db.query(`UPDATE public."user" set "password" = '${newPassword}' where "email" = '${dataUser.email}'`)
        if (!updatePasswordUser) {
            throw {
                status_code: 200,
                message: updatePasswordUser.message
            };
        }
        
        return true;
    } catch (error) {
        throw {
            status_code: error.status_code || 500,
            message: error.message,
        };
    }
};

exports.changePasswordUser = async (dataUser) => {
    try {
        const user = await db.query(`SELECT * FROM public."user" where "user_id" = '${dataUser.user_id}'`)
        if(user.rowCount == 0){
            throw {
                status_code: 400,                
                message: "User not found"
            };
        }
        var checkPassword = await bcrypt.compare(
            dataUser.old_password,
            user.rows[0].password
        );
        if (!checkPassword) {
            throw {
                status_code: 400,
                message: "Password tidak sesuai"
            };
        }
        const newPassword = await bcrypt.hash(dataUser.new_password, 10);
        const updatePasswordUser = await db.query(`UPDATE public."user" set "password" = '${newPassword}' where "user_id" = '${dataUser.user_id}'`)
        if (!updatePasswordUser) {
            throw {
                status_code: 500,
                message: updatePasswordUser.message
            };
        }
        
        return true;
    } catch (error) {
        throw {
            status_code: error.status_code || 500,
            message: error.message,
        };
    }
};