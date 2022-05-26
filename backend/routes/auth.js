const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    obj = { example: "######", testing: 1234567890 }
    res.json(obj);
});

module.exports = router;