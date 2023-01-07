import {getTrainers} from "../models/trainerModel.js";

// Get All Products
export const showTrainers = (req, res) => {
  getTrainers((err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}