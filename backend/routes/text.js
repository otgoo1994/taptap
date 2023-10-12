const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const textController  = require('../controllers/textController');
const auth = require('../middlewares/auth');

router.post('/get-practice', catchErrors(textController.getBeginText));
router.post('/selected-text', auth, catchErrors(textController.getSelectecText));
router.post('/active-ranking-text', auth, catchErrors(textController.getRankText));
router.post('/get-all-ranking-text', auth, catchErrors(textController.getAllRankText));
router.post('/upgrade-wpm', auth, catchErrors(textController.upgradeWpm));

module.exports = router;