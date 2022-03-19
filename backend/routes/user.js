const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const userController  = require('../controllers/user');
const auth = require('../middlewares/OnlyAuth');

// route
router.post("/login",catchErrors(userController.login));
router.post("/register",catchErrors(userController.register));
router.get("/current", auth, catchErrors(userController.currentUser));
router.get("/top-all-time", catchErrors(userController.Tops));
router.get("/top-this-month", catchErrors(userController.topsThisMonth));
router.get("/verify-mail", catchErrors(userController.VerifyEmail));
router.post("/forgot-password", catchErrors(userController.forgotPassword));
router.post("/change-password", auth, catchErrors(userController.changePassword));
router.post("/get-user-info", auth, catchErrors(userController.LoggedUserInfo));
router.post("/update-profile", auth, catchErrors(userController.UpdateProfile));
router.post("/update-profile-info", auth, catchErrors(userController.UpdateInfo));
router.post("/get-friends", auth, catchErrors(userController.GetFriends));
router.post("/facebook-login", catchErrors(userController.facebookLogin));
router.post("/last-races", auth, catchErrors(userController.getLastRaces));
router.post("/get-all-players-gift-race", auth, catchErrors(userController.getTopPlayersFromGiftRace));
router.post("/upgrade-gift-race-wpm", auth, catchErrors(userController.upgradeGiftRaceWpm));
router.post("/get-notify", auth, catchErrors(userController.getNotify));

module.exports = router;