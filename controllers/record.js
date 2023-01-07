import {
  getRecords,
  getRecordById,
  getRecordsTypes,
  getRecordsTimes,
  checkRecord,
  freeRecord, insertRecord
} from "../models/recordModel.js";
import {loginUser} from "../models/userModel.js";

// Get All Products
export const showRecords = (req, res) => {
  getRecords(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const showRecordById = (req, res) => {
  getRecordById(req.params.id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const showRecordsTypes = (req, res) => {
  getRecordsTypes((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const showRecordsTimes = (req, res) => {
  getRecordsTimes((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

export const showCheckRecord = (req, res) => {
  const data=req.body
  checkRecord(data, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}

export const showFreeRecord = (req, res) => {
  const data=req.body
  freeRecord(data, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}

export const createRecord = (req, res) => {
  const data = req.body;
  insertRecord(data, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}