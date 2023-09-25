const db = require("../config/db");
const nodemailer = require("nodemailer");
const sha256 = require("js-sha256");
const jwt = require('jwt-then');
const axios = require('axios');
const { readSync } = require("fs");
  

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.mn',
    port: 465,
    secure: true,
    auth: {
      user: 'support@itlab.mn',
      pass: 'Itl@b2020'
    }
  });

  const qpayTemplateId = "TEST_INVOICE";
  const qpayMerchantId = "TEST_MERCHANT";
  const qpayClientId = "qpay_test";
  const qpayClientSecret = "sdZv9k9m"

  exports.confirmCoupon = async (req, res) => {
      const { coupon, month } = req.body;

      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token, 'HS256');

      let confirm = `UPDATE coupons set used = 1 WHERE coupon = '${coupon}'`;
      db.query(confirm, async (err, result) => {
          if(err) {
              throw err;
          }
          let end = `SELECT end_at from users WHERE id = ${payload.id}`;
          db.query(end, async (err, result) => {
              if(err) {
                  throw err;
              }
              let date = new Date(result[0].end_at);
              let newDate = new Date(date.setMonth(date.getMonth() + month)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
              
              let updt = `UPDATE users SET end_at = '${newDate}' WHERE id = ${payload.id}`;
              db.query(updt, async (err, result) => {
                  if(err) {
                      throw err;
                  }

                  res.json({
                    result: 'success',
                    end_at: newDate.toString()
                  }); 
              });
          });
      });
  }

  exports.qpayWebhook = async (req, res) => {
    const { invoiceId } = req.query;
    let month;
    let bill = `SELECT id, amount, type from orders WHERE invoice_id = '${invoiceId}'`;
    db.query(bill, async (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {

            let check = await checkQpayBill(invoiceId);
            let isPaid = check.payment_info.payment_status;
            let amount = check.goods_detail[0].unit_price;

            if(result[0].type == 1) {
                month = 3;
            } else if(result[0].type == 2) {
                month = 6;
            } else if(result[0].type == 3) {
                month = 12;
            }

            if(isPaid == 'PAID') {
                if(result[0].amount == amount) {
                    let confirm = `UPDATE orders SET status = 'paid' WHERE invoice_id = '${invoiceId}'`;
                    db.query(confirm, async (err, result) => {
                        if(err) {
                            throw err;
                        }
                        let check = `SELECT users.end_at, users.id from orders inner join users on orders.userId = users.id WHERE orders.invoice_id = '${invoiceId}'`;
                        db.query(check, async (err, result) => {
                            if(err) {
                                throw err;
                            }
                            let date = new Date(result[0].end_at);
                            let newDate = new Date(date.setMonth(date.getMonth() + month)).toISOString().replace(/T/, ' ').replace(/\..+/, '');

                            let updt = `UPDATE users SET end_at = '${newDate}' WHERE id = ${result[0].id}`;
                            db.query(updt, async (err, result) => {
                                if(err) {
                                    throw err;
                                }
                                res.json({
                                    result: 'success',
                                    message: 'Амжилттай'
                                });
                            });
                        })
                    });
                } else {
                    res.json({
                        result: 'failed',
                        message: 'Дутуу төлөлт'
                    });
                }
            } else {
                res.json({
                    result: 'failed',
                    message: 'Төлөгдөөгүй нэхэмжлэх'
                });
            }
        } else {
            res.json({
                result: 'failed',
                message: 'Нэхэмжлэх олдсонгүй'
            });
        }
    })
    
  }

  exports.isPaidQpayBill = async (req, res) => {
      const { invoiceId } = req.body;
      let check = `SELECT orders.status, users.end_at from orders inner join users on orders.userId = users.id WHERE orders.invoice_id = '${invoiceId}'`;
      db.query(check, async (err, result) => {
          if(err) {
              throw err;
          }
          if(result.length > 0) {
              res.json({
                  result: 'success',
                  data: result[0]
              });
          } else {
              res.json({
                  result: 'fail'
              });
          }
      });
  }

  

  exports.useCoupon = async (req, res) => {
      const { coupon } = req.body;

      let check = `SELECT month from coupons WHERE enable = 1 AND used = 0 AND coupon = '${coupon}'`;
      db.query(check, async (err, result) => {
          if(err) {
              throw err;
          }

          if(result.length > 0) {
              res.json({
                  result: 'success',
                  data: result[0]
              });
          } else {
              res.json({
                  result: 'fail'
              });
          }
      });
  }

  exports.qpayCreateBill = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    
    let amount = 0;
    const invoiceId = 'FF' + Date.now();
    const { level } = req.body;
    if(level == 1) {
        amount = 19900;
    } else if(level == 2) {
        amount = 29900;
    } else if(level == 3) {
        amount = 39900;
    }

    let check = `SELECT payment_id, invoice_id, qpayqr FROM orders WHERE status = 'pending' AND type = ${level} AND userId = ${payload.id}`;
    db.query(check, async (err, result) => {
        if(err) {
            throw err;
        }

        if(result.length > 0) {
            res.json({
                result: 'success',
                invoice_id: result[0].invoice_id,
                payment_id: result[0].payment_id,
                qr: result[0].qpayqr
            });
        } else {
            let dt = await getToken();
            let user = `SELECT name, email, phone, id from users where id = ${payload.id}`;
            db.query(user, async (err, result) => {
                if(err) {
                    throw err;
                }
                if(result[0].phone != '00000000' && result[0].phone != null) {
                    let bill = await createBill(dt.access_token, result[0], amount, invoiceId);
                    let post = {invoice_id: invoiceId, payment_id: bill.payment_id, qpayqr: bill.qPay_QRcode, type: level, status: 'pending', userId: payload.id, amount: amount}
                    let row = `INSERT INTO orders SET ?`;
                    db.query(row, post, err => {
                        if(err) {
                            throw err;
                        }

                        res.json({
                            result: 'success',
                            invoice_id: invoiceId,
                            payment_id: bill.payment_id,
                            qr: bill.qPay_QRcode
                        });
                    });
                } else {
                    res.json({
                        result: 'fail',
                        data: 'Хувийн мэдээлэл хэсэгт утасны дугаараа бүртгүүлнэ үү'
                    });
                }
            });
        }
    });

  }

async function checkQpayBill(invoice) {
    let token = await getToken();
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
}

async function createBill(token, user, amount, invoiceId) {
    
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
}

async function getToken() {
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
}