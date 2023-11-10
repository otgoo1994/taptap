const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const adminController  = require('../controllers/adminController');
const lessonController  = require('../controllers/lesson');
const purchaseController  = require('../controllers/purchaseController');
const auth = require('../middlewares/admin');


router.post("/login",catchErrors(adminController.login));
router.post("/delete-lesson", auth, catchErrors(adminController.deleteLesson));
router.post("/add-lesson", auth, catchErrors(adminController.addLesson));
router.get('/get-max-lvl', auth, catchErrors(adminController.getMaxLvl));
router.post("/add-admin", auth, catchErrors(adminController.register));
router.post("/get-lesson-list", auth, catchErrors(lessonController.getAll));
router.post("/get-coupons", auth, catchErrors(adminController.coupons));
router.post("/create-coupons", auth, catchErrors(adminController.createCoupon));
router.post("/delete-coupon", auth, catchErrors(adminController.deleteCoupon));
router.post("/get-current-lesson", auth, catchErrors(adminController.getCurrentLesson));
router.post("/update-lesson", auth, catchErrors(adminController.updateLesson));
router.post("/get-orders", auth, catchErrors(adminController.getOrders));
router.post("/check-order", auth, catchErrors(adminController.checkOrder));
router.post("/update-order", auth, catchErrors(adminController.updateOrder));
router.post("/get-users", auth, catchErrors(adminController.getUsers));
router.post("/update-user-expired-date", auth, catchErrors(adminController.updateUserExpiredDate));
router.post("/update-user-invite-stat", auth, catchErrors(adminController.updateUserInviteStatus));

module.exports = router;