// import connection
import db from "../config/database.js";

// Get All Users
export const getUsers = (result) => {
  db.query(`select tu.OUID id, tu.A_NAME name, tu.A_SURNAME surname, tu.A_CREATE_DATE createDate, ts.A_NAME sex
from tb_users tu
         join tb_sex ts on tu.A_SEX = ts.OUID
where tu.A_STATUS = 10`, (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Get Single User
export const getUserById = (id, result) => {
  db.query(`select tu.OUID id, tu.A_NAME name, tu.A_SURNAME surname, tu.A_CREATE_DATE createDate, ts.A_NAME sex
from tb_users tu
         join tb_sex ts on tu.A_SEX = ts.OUID
where tu.A_STATUS = 10 and tu.OUID=?`, [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

export const insertUserToUsers = (data, result) => {
  db.query(`insert into tb_users (A_NAME, A_SURNAME, A_CREATE_DATE) values (?, ?, NOW())`
    , [data.name, data.surname], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  )
  ;
}
export const insertUserToAuth = (data, result) => {
  db.query(`insert into tb_auth (a_pass, a_login, a_type) VALUES(?, ?, 1);`
    , [data.pass, data.login], (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  )
  ;
}

export const updateUserById = (data, id, result) => {
  db.query("UPDATE user SET product_name = ?, product_price = ? WHERE product_id = ?", [data.product_name, data.product_price, id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

// Delete Product to Database
export const deleteUserById = (id, result) => {
  db.query("update tb_users set A_STATUS=20 where OUID=?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}

export const loginUser = (data, result) => {
  db.query(`select A_OUID,A_TYPE from tb_auth where A_LOGIN=? and A_PASS=? `, [data.login, data.pass], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results[0]);
    }
  });
}

export const checkLoginUser = (data, result) => {
  db.query(`select max(CASE when A_LOGIN = ? then 1 else 0 end) as z
from tb_auth`, [data.login], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      result(null, results);
    }
  });
}