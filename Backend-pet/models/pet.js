const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    
  petName:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
      },
    gender: {
        type: String,
        required: true,
      },  
    size: {
         type: String,
         required: true,
  }
    // colour: {
    //   type: String,
    //   required: true,
    // }
});

module.exports = mongoose.model('Pet', petSchema);
