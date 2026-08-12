const Settings = require("../models/Settings");

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const settings = await Settings.findOne();

        if (!settings) {
            return res.status(401).json({
                success: false,
                message: "Admin settings not found"
            });
        }

        if (
            email === settings.adminEmail &&
            password === settings.password
        ) {

            return res.json({
                success: true,
                message: "Login Successful"
            });

        } else {

            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            });

        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};