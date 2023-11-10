const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const userController  = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post("/facebook-login", catchErrors(userController.facebookLogin));
router.post("/get-user-info", auth, catchErrors(userController.LoggedUserInfo));
router.post("/login",catchErrors(userController.login));
router.post("/check-user-email",catchErrors(userController.checkUserEmail));
router.post("/register",catchErrors(userController.register));
router.post("/send-verify-code",catchErrors(userController.sendVerifyAgain));
router.post("/confirm-verify-code", catchErrors(userController.confirmVerifyCode));
router.post("/reset-password", catchErrors(userController.resetPassword));
router.post("/change-password", auth, catchErrors(userController.changePassword));
router.post("/get-order-list", auth, catchErrors(userController.getOrderList));
router.post("/update-user-info", auth, catchErrors(userController.updateUserInfo));
router.post("/send-invite", auth, catchErrors(userController.sendInvite));

module.exports = router;