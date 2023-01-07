import db from "../config/database.js";

export const getRoutesByRole = (id, result) => {
  db.query(`select A_ID as id,A_NAME as name,A_ROUTE as url from tb_routes where A_ROLE=?`, [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}
