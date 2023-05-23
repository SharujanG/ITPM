//importing modals and required files
const asyncHandler = require("express-async-handler");
const Donation = require("../models/donationModal");
const { green } = require("colors");

//user register function
const registerDonation = asyncHandler(async (req, res) => {
  //getting body data
  const { NameOfDonator,
    NameOfPlant,
    Category,
    Quantity,
    Address,
    ContactNumber, } = req.body;

  //backend validation for body data
  if (!NameOfDonator || !NameOfPlant || !Category || !Quantity || !Address || !ContactNumber) {
    res.send(400);
    throw new error("Please enter all the fields!!!");
  }



  //create new user in database
  const donation = await Donation.create({
    NameOfDonator,
    NameOfPlant,
    Category,
    Quantity,
    Address,
    ContactNumber,
  });

  //send response to frontend
  if (donation) {
    console.log("Registered!!!".green.bold);
    res.status(201).json({
      donation
    });
  } else {
    //send error message to frontend
    console.log("Failed to Register !!!".red.bold);
    res.status(400).json({
      error: "Failed to Register !!!",
    });
    throw new error("Failed to Register !!!");
  }
});


//getting single user details
const getForms = asyncHandler(async (req, res) => {
  //getting body data

  //find user in database
  const forms = await Donation.find();

  //send user data if user is available is db
  if (forms) {
    res.json({
      forms
    });
    console.log(user);
  } else {
    //send error message
    console.log("Error fetching forms".red.bold);
    res.status(401).json({
      error: "cannot find forms",
    });
    throw new error("Error fetching forms");
  }
});
const approveForm = asyncHandler(async(req,res)=>{

    const{formId}=req.body;

    if(!formId){
         res.status(400);
        throw new error("Invalid data passes into backend request!!!");
    }else{
        const updateForm = await Donation.findByIdAndUpdate(formId,{
            Status:"Approved",
        },
        {
            new: true,
        });

        if(updateForm){
            res.status(201).json({
              updateForm
            })

            console.log(updateForm);
        }else{
        res.status(400);
        throw new error("Form not updated !!!");
    }
    }

})

const deleteForm = asyncHandler(async(req,res)=>{

    const {formId}=req.body;
    console.log(formId);
    if(!formId){
        console.log('Invalid data passes into backend request');
        return res.sendStatus(400);
    }else{

    try {

        const form = await Donation.findOneAndDelete({_id:formId});

        if(form){
            res.status(201).json({
                form
            })
            console.log('Form deleted');
        }
        
    } catch (error) {
        res.status(400);
        throw new error("Error while deleting form !!!"+error.message);
    }
}

})


//exporting all fucntions
module.exports = {
  registerDonation,
  getForms,
  approveForm,
  deleteForm
};
