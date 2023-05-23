const Job = require('../models/job');



exports.create = (req,res) => {
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { title, date, location, workingmode, requirement } = req.body;

    
    const job = new Job({
        title,
        date,
        location,
        workingmode,
        requirement
    })
    // console.log(req.body);
    job
        .save()
        .then(() => {
            res.status(201).send({message : "Job Registered Successfully"})
        })
        .catch(err =>{
            //  console.log(err);
            res.status(500).send({message: err.message || "Some error occurred while registering the job"
            });
        });
}


exports.findAll = (req,res) => {
    Job.find()
            .then(job => {
                res.send(job)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving job information" })
            })
}


exports.findOne = (req,res) => {
    if(req.params.id){
        const id = req.params.id;

        Job.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Job not found with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving job with id " + id})
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
    Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot update job with ${id}. Maybe job not found!`})
            }else{
                res.status(201).send({message : "Job details updated successfully"})
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error occurred while updating job information"})
        })
}


exports.delete = (req,res) => {
    const id = req.params.id;

    Job.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({message : `Cannot delete job with ${id}. Maybe id is incorrect`})
            }
            else{
                res.status(201).send({message : "Job details deleted successfully"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({message : `Error deleting job with id = ${id}`});
        })
}