const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { createApi, getApis } = require("../controllers/api.controller");

router.post("/create", auth, createApi);
router.get("/", auth, getApis);

module.exports = router;