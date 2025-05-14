const router = require("express").Router();
router.use("/auth", require("../auth"));
router.use("/students", require("./students"));

module.exports = router;
