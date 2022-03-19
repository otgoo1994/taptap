const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const roomController  = require('../controllers/roomController');
const auth = require('../middlewares/auth');

router.post("/create-room", auth, catchErrors(roomController.createRoom));
router.post("/get-players", auth, catchErrors(roomController.getPlayers));
router.post("/get-room", auth, catchErrors(roomController.getRoom));
router.post("/get-all-room", auth, catchErrors(roomController.getAllRooms));
router.post("/get-players-room", auth, catchErrors(roomController.getAllPlayers));
router.post("/check-room", auth, catchErrors(roomController.checkRoom));
module.exports = router;