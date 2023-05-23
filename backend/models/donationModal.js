const mongoose = require("mongoose");

//create user modal
const donationSchema = mongoose.Schema(
  {
    NameOfDonator: { type: "String", required: true },
    NameOfPlant: { type: "String", required: true },
    Category: { type: "String", required: true },
    Quantity: { type: "String", required: true},
    Address: { type: "String", required: true },
    ContactNumber: { type: "number", required: true, default: 0 },
    Status: { type: "String", default:"Pending"},
    Delete: { type: "String", default:"Delete"},
  },
  {
    timestapms: true,
  }
);


const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
