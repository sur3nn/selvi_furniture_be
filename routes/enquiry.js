const express = require("express")
const router = express.Router()
const enquiryController = require("../controllers/enquiryController")

router.post('/',enquiryController.saveEnquiry);
router.get('/',enquiryController.getEnquiryList);
module.exports = router 