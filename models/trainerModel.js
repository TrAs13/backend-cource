import db from "../config/database.js";

export const getTrainers = (result) => {
  db.query(`select trainer.OUID id, trainer.A_NAME name, trainer.A_SURNAME surname, types.A_NAME typename, types.OUID typeid
from tb_trainers trainer
         join tb_records_type types on trainer.A_TYPE = types.OUID`, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}