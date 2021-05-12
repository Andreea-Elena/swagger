const express = require("express");
const router = express.Router();

const {
    getAllDataCsv
} = require("../controllers/AutomobileController");

router.get("/getcsv", getAllDataCsv);

module.exports = router;