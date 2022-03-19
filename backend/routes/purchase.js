const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const purchaseController  = require('../controllers/purchaseController');
const auth = require('../middlewares/OnlyAuth');

router.post("/qpay-create-bill", auth, catchErrors(purchaseController.qpayCreateBill));
router.post("/use-coupon", auth, catchErrors(purchaseController.useCoupon));
router.post("/confirm-coupon", auth, catchErrors(purchaseController.confirmCoupon));
router.get("/qpay-result", auth, catchErrors(purchaseController.qpayWebhook));
router.post("/check-qpay-bill", auth, catchErrors(purchaseController.isPaidQpayBill));

module.exports = router;