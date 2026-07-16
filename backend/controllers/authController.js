exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (
        email === "admin@gmail.com" &&
        password === "admin123"
    ) {

        res.json({
            success: true,
            message: "Login Successful"
        });

    } else {

        res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });

    }

};