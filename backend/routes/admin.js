const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const adminController  = require('../controllers/adminController');
const lessonController  = require('../controllers/lesson');
const auth = require('../middlewares/admin');


router.post("/login",catchErrors(adminController.login));
router.post("/delete-lesson", auth, catchErrors(adminController.deleteLesson));
router.post("/add-lesson", auth, catchErrors(adminController.addLesson));
router.get('/get-max-lvl', auth, catchErrors(adminController.getMaxLvl));
router.post("/add-admin", auth, catchErrors(adminController.register));
router.post("/get-lesson-list", auth, catchErrors(lessonController.getAll));


// router.post("/get-admins", auth, catchErrors(adminController.getAdmins));
// router.post("/add-admin", auth, catchErrors(adminController.register));
// router.post("/get-admin-info", auth, catchErrors(adminController.LoggedUserInfo));
// router.post("/update-profile", auth, catchErrors(adminController.UpdateProfile));
// router.post("/update-profile-info", auth, catchErrors(adminController.UpdateInfo));
// router.post("/change-password", auth, catchErrors(adminController.changePassword));
// router.post("/add-text", auth, catchErrors(adminController.addTexts));
// router.post("/add-lesson", auth, catchErrors(adminController.addLesson));
// router.post("/get-text", auth, catchErrors(adminController.getText));
// router.post("/delete-text", auth, catchErrors(adminController.deleteText));
// router.post("/get-race", auth, catchErrors(adminController.getRaceText));
// router.post("/add-text-image", auth, catchErrors(adminController.addTextImage));
// router.post("/get-banner", auth, catchErrors(adminController.getBanners));
// router.post("/delete-banner", auth, catchErrors(adminController.deleteBanner));
// router.post("/add-banner", auth, catchErrors(adminController.addBanner));
// router.post("/all-users", auth, catchErrors(adminController.allUsers));
// router.get('/get-max-lvl', auth, catchErrors(adminController.getMaxLvl));
// router.post("/set-end-state-race", auth, catchErrors(adminController.setEndStateRace));

module.exports = router;