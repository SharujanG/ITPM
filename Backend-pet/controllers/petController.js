const Pet = require('../models/pet');



exports.create = (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { petName, date, location, gender, size } = req.body;

    
    const pet = new Pet({
        petName,
        date,
        location,
        gender,
        size
    })
    // console.log(req.body);
    pet
        .save()
        .then(() => {
            res.status(201).send({message : "Pet Registered Successfully"})
        })
        .catch(err =>{
            //  console.log(err);
            res.status(500).send({message: err.message || "Some error occurred while registering the pet"
            });
        });
}


exports.findAll = (req,res) => {
    Pet.find()
            .then(pet => {
                res.send(pet)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving pet information" })
            })
}


exports.findOne = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Pet.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Pet not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving pet with id " + id})
            })
    }
}


exports.update = (req,res) => {
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Pet.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update pet with ${id}. Maybe pet not found!`})
            }else{
                res.status(201).send({message : "pet details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating pet information"})
        })
}


exports.delete = (req,res) => {
    const id = req.params.id;

    Pet.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete pet with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Pet details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting pet with id = ${id}`});
        })
}