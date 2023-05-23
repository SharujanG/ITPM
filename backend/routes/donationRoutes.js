const express = require("express");
const router = express.Router();

//importing all controller functions
const {
  registerDonation,getForms,approveForm,deleteForm,
} = require("../controllers/donationControllers");

//routing all end points
router.route("/register").post(registerDonation);
router.route("/getAllForms").post(getForms);
router.route("/approveForm").post(approveForm);
router.route("/deleteForm").post(deleteForm);

module.exports = router;
