const nodemailer = require("nodemailer");
const axios = require('axios');
const query = require("../config/query");
const exec = require("../config/promise");

// const qpayTemplateId = "TEST_INVOICE";
// const qpayMerchantId = "TEST_MERCHANT";
// const qpayClientId = "qpay_test";
// const qpayClientSecret = "sdZv9k9m"

const qpayTemplateId = "ICBC_REMAX_INVOICE";
const qpayMerchantId = "ICBC_REMAX";
const qpayClientId = "60C6A5B2-8597-8A5B-7719-8783A6B185C6";
const qpayClientSecret = "95D354F5-1C09-2BD7-108D-47286EE37A26"



const method = {    
    checkQpayBill: async function (invoice) {
        let token = await method.getQpayToken();
        token = await token.access_token;
        
        const data = {
            "merchant_id": qpayMerchantId,
            "bill_no": invoice
        }
    
        let str = axios.post('https://api.qpay.mn/v1/bill/check', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
        }).then((res) => {
            return res.data;
        }).catch(error => {
            console.log(error);
        });
        
        return await str;
    },
    createBill: async function (token, user, amount, invoiceId) {
    
        const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const data = {
            template_id: qpayTemplateId,
            merchant_id: qpayMerchantId,
            branch_id: "1",
            pos_id: "1",
            receiver: {
                id: user.id.toString(),
                register_no: "",
                name: user.name,
                email: user.email,
                phone_number: user.phone,
                note: user.name
            },
            bill_no: invoiceId,
            date: datetime,
            description: "test",
            amount: amount,
            btuk_code: "",
            vat_flag: "0"
        }
    
        let str = axios.post('https://api.qpay.mn/v1/bill/create', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.error(err);
            });
        
        return await str;
    },    
    getQpayToken: async function() {
        const data = {
            "client_id": qpayClientId,
            "client_secret": qpayClientSecret,
            "grant_type":"client",
            "refresh_token":""
        };

        let str = axios.post('https://api.qpay.mn/v1/auth/token', data)
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.error(err.message);
            });

        return await str;
    },
    updateUserExpireDate: async function(user, month) {
        let string = query.getUserInfo(user);
        
        const data = await exec.execute(string);

        if (!data.length) {
            return false;
        }


        

        const dt = new Date(new Date(data[0].end_at).getTime() > Date.now() ? data[0].end_at : Date.now()); 

        let date = new Date(
            ( dt ).setDate( dt.getDate() + month )
        ).toISOString().replace(/T/, ' ').replace(/\..+/, '');
        

        string = `UPDATE users SET end_at = '${date}', updated_at = NOW() WHERE id = ${user}`;
        const upt = await exec.execute(string);

        if (!upt) {
            return false;
        }

        return data;
    }
}


const useCoupon = async (req, res) => {
    const { coupon } = req.body;
    const payload = await exec.getPayload(req);

    let string = query.getCoupon(coupon);
    const code = await exec.execute(string);
    if (code.length > 0) {

        const user = await method.updateUserExpireDate(payload.id, code[0].month);
        if (!user) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }

        


        string = query.updateCoupon(coupon);
        const upt = await exec.execute(string);
        
        if (!upt) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }  
        
        string = query.getUserInfo(payload.id);
        const info = await exec.execute(string);

        if (!info.length) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }

        return res.json({
            result: 'success',
            data: code[0],
            user: info[0]
        });
    }

    res.json({
        result: 'fail',
        status: 404
    });
}



const checkOrder = async (req, res) => {
    const { invoiceId } = req.body;
    const payload = await exec.getPayload(req);

    let string = query.selectOrder(invoiceId, payload.id);
    const data = await exec.execute(string);

    if (!data.length) {
        res.json({
            result: 'fail',
            status: 402
        });

        return;
    }

    res.json({
        result: 'success',
        data: data[0],
        status: 200
    });
}

const isPaidQpayBill = async (req, res) => {
    const { invoiceId } = req.body;
    const payload = await exec.getPayload(req);

    let string = query.isPaidQpay(invoiceId);    
    const data = await exec.execute(string);

    if (!data.length) {
        res.json({
            result: 'fail'
        });
        return;
    }

    string = query.getUserInfo(payload.id);
    const user = await exec.execute(string);
    

    res.json({
        result: 'success',
        data: data[0],
        user: user.length ? user[0] : {}
    });
}

const createrQpayBill = async (req, res) => {
    const payload = await exec.getPayload(req);
    const { amount } = req.body;

    const type = amount === 3900 ? 1 : 2;
    const invoiceId = 'TY' + Date.now();

    let string = query.checkQpayRecord('PENDING', type, payload.id);
    const data = await exec.execute(string);

    if (data.length) {
        res.json({
            result: 'success',
            status: 200,
            payment: data[0]
        });   

        return;     
    } 

    string = query.getUserInfo(payload.id);
    const user = await exec.execute(string);
    let token = await method.getQpayToken();

    if (!user.length || !token.access_token) {
        res.json({
            result: 'Forbidden',
            status: 403
        });   
        return;
    }

    let bill = await method.createBill(token.access_token, user[0], amount, invoiceId);
    const params = {invoice_id: invoiceId, payment_id: bill.payment_id, qpayqr: bill.qPay_QRcode, type, status: 'PENDING', userId: payload.id, amount, created_at: new Date(), end_at: new Date().addDays(2)}
    string = query.insert('orders');

    const invoice = await exec.execute(string, params);

    if (!invoice) {
        res.json({
            result: 'Forbidden',
            status: 403
        });   
        return;
    }

    res.json({
        status: 200,
        result: 'success',
        payment: {
            invoice_id: invoiceId,
            payment_id: bill.payment_id,
            qpayqr: bill.qPay_QRcode
        }
    });
}

const qpayWebhook = async (req, res) => {
    const { invoiceId } = req.query;
    
    let day;
    let string = `SELECT id, amount, type, userId from orders WHERE invoice_id = '${invoiceId}'`;
    const invoice = await exec.execute(string);
    
    if (!invoice.length) {
        res.json({
            status: 402,
            result: 'failed',
            message: 'Нэхэмжлэх олдсонгүй'
        });
        return;
    }
    
    let check = await method.checkQpayBill(invoiceId);
    if (!check) {
        res.json({
            status: 403,
            result: 'failed',
            message: 'Forbidden'
        });

        return;
    }

    let isPaid = check.payment_info.payment_status;
    let amount = check.goods_detail[0].unit_price;

    day = invoice[0].type === 1 ? 30 : 90;

    if (isPaid === 'NOT_PAID') {
        res.json({
            status: 402,
            result: 'failed',
            message: 'Төлөгдөөгүй нэхэмжлэх'
        });
        return;
    }

    if (isPaid === 'PAID') {
        if (amount !== invoice[0].amount) {
            res.json({
                status: 402,
                result: 'failed',
                message: 'Дутуу төлөлт'
            });
            return;
        }

        const user = await method.updateUserExpireDate(invoice.userId, day);
        if (!user) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }

        res.json({
            status: 200,
            result: 'success',
            message: 'Амжилттай'
        });
    }

}


module.exports = {
    useCoupon,
    createrQpayBill,
    isPaidQpayBill,
    checkOrder,
    qpayWebhook
};