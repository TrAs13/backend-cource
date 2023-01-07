import db from "../config/database.js";
// Get All Users
export const getRecords = (id, result) => {
  db.query(`select records.OUID                              as id,
       DATE_ADD(records.A_DATE, INTERVAL 3 HOUR) as date,
       types.A_NAME                              as traintype,
       trainer.A_NAME                            as name,
       trainer.A_SURNAME                         as surname,
       case
           when records.A_CANCEL = 0 and now() < records.A_DATE then 'mdi-alarm'
           when now() > records.A_DATE and records.A_CANCEL = 0 then 'mdi-checkbox-marked-circle'
           else 'mdi-cancel'
           end                                   as icon
        ,
       ti.A_TIMESTART                            as time
from tb_records records
         join tb_records_type types on records.A_TYPE = types.OUID
         join tb_trainers trainer on records.A_TRAINER = trainer.OUID
         join tb_interval ti on records.A_INTERVAL = ti.OUID
where records.A_USER = ?
order by records.A_DATE desc`, [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const getRecordById = (id, result) => {
  db.query(`select records.OUID as id,
       DATE_ADD(records.A_DATE, INTERVAL 3 HOUR) as date,
       types.A_NAME as traintype,
       trainer.A_NAME as name,
       trainer.A_SURNAME as surname,
       case
           when now() > records.A_DATE then 'mdi-checkbox-marked-circle'
           else 'mdi-cancel'
           end as icon
from tb_records records
         join tb_records_type types on records.A_TYPE = types.OUID
         join tb_trainers trainer on records.A_TRAINER = trainer.OUID where records.OUID=? order by records.A_DATE desc`, [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const getRecordsTypes = (result) => {
  db.query(`SELECT t.ouid as id,t.A_NAME as name
        FROM course.tb_records_type t`, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const getRecordsTimes = (result) => {
  db.query(`SELECT t.ouid as id,t.A_TIMESTART as time
FROM tb_interval t;
`, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const checkRecord = (data, result) => {
  db.query(`select IF((select count(*)
           from tb_records
           where A_DATE in (?)
             and (A_INTERVAL = ? or ? = 0)
             and (A_TYPE = ? or ? = 0)
             and (A_TRAINER = ? or ? = 0)) < (select ? *
                                                                   IF(? = 0, (select count(*) from tb_interval),
                                                                      (select count(*) from tb_interval where OUID = ?)) *
                                                                   IF(? = 0,
                                                                      (select least(sum(A_PLACE_COUNTS), (select count(*) from tb_trainers))
                                                                       from tb_records_type),
                                                                      (select least(sum(A_PLACE_COUNTS),
                                                                                    (select count(*) from tb_trainers where A_TYPE = ?))
                                                                       from tb_records_type
                                                                       where OUID = ?))/ IF(? = 0, (select 1),
                (select count(*) from tb_trainers where A_TYPE = ?))), (select 1),
          (select 0)) as can;`, [data.dates, data.time, data.time, data.course, data.course, data.trainer, data.trainer, data.countDate, data.time, data.time, data.course, data.course, data.course, data.trainer, data.course], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

export const freeRecord = (data, result) => {
  db.query(`select DATE_ADD(A_DATE, INTERVAL 3 HOUR) as date
           from tb_records
           where A_DATE in (?)
             and (A_INTERVAL = ?)
             and (A_TYPE = ?)
             and (A_TRAINER = ?);`, [data.dates, data.time, data.course, data.trainer], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const insertRecord = (data, result) => {
  db.query(`insert into tb_records (a_date, a_user, a_trainer, a_interval, a_type,a_cancel)
VALUES (?, ?, ?, ?, ?,0);`, [data.dates, data.user, data.trainer, data.time, data.course], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}