const express = require("express");
const router = express.Router();

const {
    saveSettings,
    getSettings
} = require("../controllers/settingsController");

router.post("/settings", saveSettings);
router.get("/settings", getSettings);

module.exports = router;