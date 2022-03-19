const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const lessonController  = require('../controllers/lesson');
const auth = require('../middlewares/OnlyAuth');

router.post("/get-lesson-list", auth, catchErrors(lessonController.getAll));
router.post("/get-lesson", auth, catchErrors(lessonController.selectedLesson));
router.post("/get-result-lessons", auth, catchErrors(lessonController.PrevWithNext));
router.post("/update-user-lesson", auth, catchErrors(lessonController.updateUserLesson));

module.exports = router;