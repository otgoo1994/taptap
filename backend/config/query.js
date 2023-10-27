const sha256 = require("js-sha256");


Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

const query = {
  checkFbLogin: function(id) {
    return `SELECT id, name, phone, email, image, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank  from users WHERE facebook = '${id}'`;
  },
  checkBlackList: function(id) {
    return `SELECT id from blacklist WHERE userId = ${id}`;
  },
  updateUserProfile: function(params, values) {
    if (!values.id) {
      return; 
    }

    let str = 'UPDATE users SET ';
    params.forEach((element, index) => {
      !index ? str += `${element} = '${values[element]}'` : 
        str += `, ${element} = '${values[element]}'`;
    });

    str += ' WHERE id = ' + values.id;

    return str;
  },
  insert: function(table) {
    return 'INSERT INTO ' + table + ' SET ? ';
  },
  updateCurrentLesson: function(params, values) {
    if (!values.id) {
      return; 
    }

    let str = 'UPDATE lesson SET ';
    params.forEach((element, index) => {
      if (!values[element]) {
        return;
      }
      
      !index ? str += `${element} = '${values[element]}'` : 
        str += `, ${element} = '${values[element]}'`;
    });

    str += ' WHERE id = ' + values.id;

    return str;
  },
  checkUserEmail: function(email) {
    return `SELECT id, name, phone, image, active, end_at, point, avg_wpm, record_wpm  from users WHERE email = '${email}'`;
  },
  delete: function(table, id) {
    return `DELETE from ${table} WHERE id = ${id}`;
  },
  getMaxLvl: function() {
    return 'SELECT MAX(lvl) as lvl from lesson';
  },
  getCurrentLvl: function(lvl) {
    return `SELECT id from lesson WHERE lvl = ${lvl}`;
  },
  adminLogin: function(email, password) {
    return `SELECT id, email, name, phone, image  from admin WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;
  },
  getCoupon: function(coupon) {
    if (coupon) {
      return `SELECT * FROM coupons WHERE enable = 1 AND used = 0 AND coupon = '${coupon}'`;
    }

    return 'SELECT * FROM coupons';
  },
  updateCoupon: function(coupon) {
    return `UPDATE coupons SET used = 1, enable = 0 WHERE coupon = '${coupon}'`
  },
  getUserInfo: function(id) {
    return `SELECT id, name, phone, image, email, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank from users WHERE id = ${id}`
  },
  isPaidQpay: function(invoiceId) {
    return `SELECT orders.status, users.end_at, orders.updated_at from orders inner join users on orders.userId = users.id WHERE orders.invoice_id = '${invoiceId}' AND orders.status = 'PAID'`;
  },
  checkQpayRecord: function(status, type, id) {
    return `SELECT payment_id, invoice_id, qpayqr FROM orders WHERE status = '${status}' AND type = ${type} AND userId = ${id}`;
  },
  selectOrder: function(ordernumber, id) {
    return `SELECT qpayqr, payment_id, type, amount, status, created_at, end_at, updated_at FROM orders WHERE invoice_id = '${ordernumber}' AND userId = ${id}`
  },
  confirmVerifyCode: function(email, token) {
    return `SELECT id from t_user_verify WHERE email = '${email}' AND verify_code = '${token}'`;
  },
  activeUserEmail: function(email) {
    return `UPDATE users SET active = 1 WHERE email = '${email}'`;
  },
  userLogin: function(email, password) {
    return `SELECT id, name, phone, email, image, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank FROM users WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;
  },
  resetPassword: function(email, password) {
    return `UPDATE users SET password ='${sha256(password + process.env.SALT)}' WHERE email = '${email}'`;
  },
  getCurrentLesson: function(id) {
    return `SELECT * from lesson WHERE id = ${id}`;
  },
  checkUserInfoWithPassword: function(id, password) {
    return `SELECT id from users WHERE id = ${id} AND password = '${sha256(password + process.env.SALT)}'`;
  },
  changePassword: function(password, id) {
    return `UPDATE users SET password = '${sha256(password + process.env.SALT)}' WHERE id = ${id}`;
  }
};

module.exports = query;