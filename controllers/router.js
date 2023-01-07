import {getRoutesByRole} from "../models/routerModel.js";

export const showRoutesByRole = (req, res) => {
  getRoutesByRole(req.params.id, (err, results) => {
    if (err){
      res.send(err);
    }else{
      res.json(results);
    }
  });
}
