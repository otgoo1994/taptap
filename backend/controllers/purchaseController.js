const nodemailer = require("nodemailer");
const axios = require('axios');
const query = require("../config/query");
const exec = require("../config/promise");

// const qpayTemplateId = "TEST_INVOICE";
// const qpayMerchantId = "TEST_MERCHANT";
// const qpayClientId = "qpay_test";
// const qpayClientSecret = "sdZv9k9m"

const qpay_username = "TYPING_MN";
const qpay_password = "1rdVxOzz";

// const qpay_username = "VEGAN_MARKET";
// const qpay_password = "BXuayzYg";



const method = {    
    checkQpayBill: async function (invoice) {
        let token = await method.getQpayToken();
        token = await token.access_token;
        
        const data = {
            object_type: "INVOICE",
            object_id : invoice,
            offset: {
                page_number: 1,
                page_limit : 100
            }
        }
    
        let str = axios.post('https://merchant.qpay.mn/v2/payment/check', data, {
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

        const data = {
            invoice_code: 'TYPING_MN_INVOICE',
            sender_invoice_no: invoiceId,
            invoice_receiver_code: 'typing.mn',
            invoice_description: 'typing.mn сайтын үйлчилгээний эрх сунгах',
            sender_branch_code: 'typing.mn',
            amount,
            callback_url: 'https://api.typing.mn/purchase/qpay-result?payment_id=' + invoiceId
        };
    
        let str = axios.post('https://merchant.qpay.mn/v2/invoice', data, {
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
            username : qpay_username,
            password : qpay_password,
        };

        let str = axios.post('https://merchant.qpay.mn/v2/auth/token', {}, {
                auth: data
            })
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
            ( dt ).setDate( dt.getDate() + parseInt(month) )
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

    if (amount != 5900 && amount != 12900) {
        res.json({
            result: 'Forbidden!',
            status: 403,
        });   

        return;     
    } 

    const type = amount === 5900 ? 1 : 2;
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
    
    const params = {invoice_id: invoiceId, payment_id: bill.invoice_id, qpayqr: bill.qr_image, type, status: 'PENDING', userId: payload.id, amount, created_at: new Date(), end_at: new Date().addDays(2)}
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
    const { payment_id } = req.query;
    
    let day;
    let string = `SELECT id, amount, type, userId, payment_id from orders WHERE invoice_id = '${payment_id}'`;
    const invoice = await exec.execute(string);
    
    if (!invoice.length) {
        res.json({
            status: 402,
            result: 'failed',
            message: 'Нэхэмжлэх олдсонгүй'
        });
        return;
    }
    
    let check = await method.checkQpayBill(invoice[0].payment_id);
    if (!check) {
        res.json({
            status: 403,
            result: 'failed',
            message: 'Forbidden'
        });

        return;
    }


    if (!check.rows.length) {
        res.json({
            status: 402,
            result: 'failed',
            message: 'Төлөгдөөгүй нэхэмжлэх'
        });
        return;
    }

    let isPaid = check.rows[0].payment_status;
    let amount = check.paid_amount;


    day = invoice[0].type === 1 ? 30 : 90;

    if (isPaid !== 'PAID') {
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

        const user = await method.updateUserExpireDate(invoice[0].userId, day);
        if (!user) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }



        string = `UPDATE orders SET status = 'PAID', updated_at = NOW() WHERE invoice_id = '${payment_id}'`;
        const paidBill = await exec.execute(string);

        if (!paidBill) {
            res.status(200).json({
                result: 'something went wrong',
                status: 403
            });
            return;
        }


        string = query.getUserInfo(invoice[0].userId);
        const userInfo = await exec.execute(string);

        if (userInfo.length) {
            const cost = parseInt(invoice[0].amount * 0.2);
            string = `UPDATE users SET cost = cost + ${cost} WHERE id = ${userInfo[0].invited}`;
            console.log(string, '=======');
            await exec.execute(string);
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