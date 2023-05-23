const Garbage = require("../models/garbage");

exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const { area, date, collectorName, garbageType } = req.body;

  const garbage = new Garbage({
    area,
    date,
    collectorName,
    garbageType,
  });
  // console.log(req.body);
  garbage
    .save()
    .then(() => {
      res.status(201).send({ message: "Garbage Registered Successfully" });
    })
    .catch((err) => {
      //  console.log(err);
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while registering the garbage",
        });
    });
};

exports.findAll = (req, res) => {
  Garbage.find()
    .then((garbage) => {
      res.send(garbage);
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Error Occurred while retrieving garbage information",
        });
    });
};

exports.findOne = (req, res) => {
  if (req.params.id) {
    const id = req.params.id;

    Garbage.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Garbage not found with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving garbage with id " + id });
      });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Garbage.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update garbage with ${id}. Maybe garbage not found!`,
          });
      } else {
        res
          .status(201)
          .send({ message: "Garbage details updated successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error occurred while updating garbage information" });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Garbage.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot delete garbage with ${id}. Maybe id is incorrect`,
          });
      } else {
        res
          .status(201)
          .send({ message: "Garbage details deleted successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ message: `Error deleting garbage with id = ${id}` });
    });
};
