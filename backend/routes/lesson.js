const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const lessonController  = require('../controllers/lesson');
const auth = require('../middlewares/auth');

router.post("/get-lesson-list", auth, catchErrors(lessonController.getAll));
router.post("/get-lesson", auth, catchErrors(lessonController.selectedLesson));
router.post("/update-user-lesson", auth, catchErrors(lessonController.updateUserLesson));
router.post("/next-lesson", auth, catchErrors(lessonController.nextLesson));

module.exports = router;