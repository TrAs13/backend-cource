// import express
import express from "express";

// import function from controller
import {showUsers, showUserById, updateUser, deleteUser} from "../controllers/user.js";
import {checkLogin, logUser, registerUserToAuth, registerUserToUsers} from "../controllers/auth.js";
import {showRoutesByRole} from "../controllers/router.js";
import {
  showRecords,
  showRecordById,
  showRecordsTypes,
  showRecordsTimes,
  showCheckRecord, showFreeRecord, createRecord
} from "../controllers/record.js";
import {showTrainers} from "../controllers/trainer.js";
// init express router
const router = express.Router();

router.get('/users', showUsers);

router.post('/login', logUser);

router.get('/users/:id', showUserById);

router.get('/routes/:id', showRoutesByRole);

router.post('/registerU', registerUserToUsers);
router.post('/registerA', registerUserToAuth);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.get('/records/:id', showRecords);

router.get('/record/:id', showRecordById)

router.get('/trainers', showTrainers);

router.get('/records_types/', showRecordsTypes);

router.get('/records_times/', showRecordsTimes);

router.post('/check_record/', showCheckRecord);

router.post('/free_record/', showFreeRecord);

router.post('/create_record', createRecord);

router.post('/check_login', checkLogin);
// export default router
export default router;