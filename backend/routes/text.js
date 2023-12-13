const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const textController  = require('../controllers/textController');
const auth = require('../middlewares/auth');

router.post('/get-practice', catchErrors(textController.getBeginText));
router.post('/selected-text', auth, catchErrors(textController.getSelectecText));
router.post('/active-ranking-text', auth, catchErrors(textController.getRankText));
router.post('/get-all-ranking-text', auth, catchErrors(textController.getAllRankText));
router.post('/upgrade-wpm', auth, catchErrors(textController.upgradeWpm));
router.post('/get-race-text-list', catchErrors(textController.getRaceTextList));
router.post('/get-race-text', catchErrors(textController.getRaceText));
router.post('/register-race-user', catchErrors(textController.regRaceUser));

module.exports = router;