const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandler');
const purchaseController  = require('../controllers/purchaseController');
const auth = require('../middlewares/auth');
const webhook = require('../middlewares/webhook');

router.post("/use-coupon", auth, catchErrors(purchaseController.useCoupon));
router.post("/qpay-create-bill", auth, catchErrors(purchaseController.createrQpayBill));
router.post("/check-order", auth, catchErrors(purchaseController.checkOrder));
router.post("/check-qpay-bill", auth, catchErrors(purchaseController.isPaidQpayBill));
router.get("/qpay-result", webhook, catchErrors(purchaseController.qpayWebhook));
// router.post("/confirm-coupon", auth, catchErrors(purchaseController.confirmCoupon));


module.exports = router;