// Import function from Product Model
import {loginUser, checkLoginUser, insertUserToUsers, insertUserToAuth} from "../models/userModel.js";

// Get User Product
export const logUser = (req, res) => {
  const data=req.body
  loginUser(data, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}

export const registerUserToUsers = (req, res) => {
  insertUserToUsers(req.body, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}

export const registerUserToAuth = (req, res) => {
  insertUserToAuth(req.body, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}

export const checkLogin = (req, res) => {
  const data=req.body
  checkLoginUser(data, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results[0]);
    }
  });
}

