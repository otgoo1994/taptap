const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const userController  = require('../controllers/user');
const auth = require('../middlewares/auth');

// router.post("/register",catchErrors(userController.register));
// router.get("/current", auth, catchErrors(userController.currentUser));
// router.get("/top-all-time", catchErrors(userController.Tops));
// router.get("/top-this-month", catchErrors(userController.topsThisMonth));
// router.get("/verify-mail", catchErrors(userController.VerifyEmail));
// router.post("/forgot-password", catchErrors(userController.forgotPassword));
// router.post("/change-password", auth, catchErrors(userController.changePassword));
// router.post("/update-profile", auth, catchErrors(userController.UpdateProfile));
// router.post("/update-profile-info", auth, catchErrors(userController.UpdateInfo));
// router.post("/get-friends", auth, catchErrors(userController.GetFriends));
// router.post("/last-races", auth, catchErrors(userController.getLastRaces));
// router.post("/get-all-players-gift-race", auth, catchErrors(userController.getTopPlayersFromGiftRace));
// router.post("/upgrade-gift-race-wpm", auth, catchErrors(userController.upgradeGiftRaceWpm));
// router.post("/get-notify", auth, catchErrors(userController.getNotify));


router.post("/facebook-login", catchErrors(userController.facebookLogin));
router.post("/get-user-info", auth, catchErrors(userController.LoggedUserInfo));
router.post("/login",catchErrors(userController.login));
router.post("/check-user-email",catchErrors(userController.checkUserEmail));
router.post("/register",catchErrors(userController.register));
router.post("/send-verify-code",catchErrors(userController.sendVerifyAgain));
router.post("/confirm-verify-code", catchErrors(userController.confirmVerifyCode));
router.post("/reset-password", catchErrors(userController.resetPassword));
router.post("/change-password", catchErrors(userController.changePassword));
router.post("/get-order-list", catchErrors(userController.getOrderList));
router.post("/update-user-info", catchErrors(userController.updateUserInfo));

module.exports = router;