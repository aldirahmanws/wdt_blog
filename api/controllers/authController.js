const authService = require("../service/authService");

exports.signup = async (req, res) => {
    try {
        const { body } = req;
        if (!body.name || !body.email || !body.password) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields",
            });
        }
        const newUser = {
            name: body.name,
            email: body.email,
            password: body.password
        }
        const createdUser = await authService.createNewUser(newUser);
        return res.json({
            status: true,
            message: "Successful registration"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
};

exports.signin = async(req, res) => {
    try {
        const { body } = req;
        if (!body.email || !body.password) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }
        const user = {
            email: body.email,
            password: body.password
        }

        const loginUser = await authService.loginUser(user);
        return res.json({
            status: true,
            message: "Success",
            data: loginUser
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
}

exports.refreshToken = async(req, res) => {
    try {
        const { body } = req;
        if (!body.refresh_token) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }
        
        const refreshTokenUser = await authService.refreshToken(body.refresh_token);

        return res.json({
            message: "Success",
            data: refreshTokenUser
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
}

exports.forgotPassword = async(req, res) => {
    try {
        const { body } = req;
        if (!body.email) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }

        const forgotPasswordUser = await authService.forgotPasswordUser(body.email);
        return res.json({
            status: true,
            message: "Success",
            data: forgotPasswordUser
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
}

exports.resetPassword = async(req, res) => {
    try {
        const { body } = req;
        if (!body.email || !body.new_password) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }
        const resetPasswordUser = await authService.resetPasswordUser(body);

        return res.json({
            status: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
}

exports.changePassword = async(req, res) => {
    try {
        const { body } = req;
        if (!body.old_password || !body.new_password) {
            return res.status(400).json({
                status: false,
                message: "Please complete all fields"
            });
        }
        const user = {
            ...req.userData,
            ...body
        }
        const changePasswordUser = await authService.changePasswordUser(user);

        return res.json({
            status: true,
            message: "Success"
        });
    } catch (error) {
        return res.status(error.status_code || 500).json({
            status: false,
            message: error.message
        });
    }
}