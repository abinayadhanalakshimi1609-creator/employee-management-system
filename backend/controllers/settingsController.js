const Settings = require("../models/Settings");

// Save or Update Settings
exports.saveSettings = async (req, res) => {

    try {

        let settings = await Settings.findOne();

        if (settings) {

            settings.adminName = req.body.adminName;
            settings.adminEmail = req.body.adminEmail;
            settings.adminPhone = req.body.adminPhone;
            settings.password = req.body.password;

            await settings.save();

            return res.json({
                message: "Settings Updated Successfully"
            });

        }

        settings = new Settings({
            adminName: req.body.adminName,
            adminEmail: req.body.adminEmail,
            adminPhone: req.body.adminPhone,
            password: req.body.password
        });

        await settings.save();

        res.json({
            message: "Settings Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get Settings
exports.getSettings = async (req, res) => {

    try {

        const settings = await Settings.findOne();

        if (!settings) {
            return res.json({});
        }

        res.json(settings);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};