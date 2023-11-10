const sha256 = require("js-sha256");


Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

const query = {
  checkFbLogin: function(id) {
    return `SELECT id, name, phone, email, image, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank, isCanInvite, cost, invited  from users WHERE facebook = '${id}'`;
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
    return `SELECT id, name, phone, image, email, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank, isCanInvite, cost, invited from users WHERE id = ${id}`
  },
  isPaidQpay: function(invoiceId) {
    return `SELECT orders.status, users.end_at, orders.updated_at from orders inner join users on orders.userId = users.id WHERE orders.invoice_id = '${invoiceId}' AND orders.status = 'PAID'`;
  },
  checkQpayRecord: function(status, type, id) {
    return `SELECT payment_id, invoice_id, qpayqr FROM orders WHERE status = '${status}' AND type = ${type} AND userId = ${id}`;
  },
  selectOrder: function(ordernumber, id) {
    if (!id) {
      return `SELECT qpayqr, payment_id, users.name, type, amount, users.id, status, orders.created_at, orders.end_at, orders.updated_at FROM orders inner join users on orders.userId = users.id WHERE invoice_id = '${ordernumber}'`  
    }
    return `SELECT qpayqr, payment_id, type, amount, status, created_at, end_at, updated_at FROM orders WHERE invoice_id = '${ordernumber}' AND userId = ${id}`
  },
  confirmVerifyCode: function(email, token) {
    return `SELECT id from t_user_verify WHERE email = '${email}' AND verify_code = '${token}'`;
  },
  activeUserEmail: function(email) {
    return `UPDATE users SET active = 1 WHERE email = '${email}'`;
  },
  userLogin: function(email, password) {
    return `SELECT id, name, phone, email, image, active, end_at, point, avg_wpm, record_wpm, lesson, avg_percent, rank, isCanInvite, cost, invited FROM users WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;
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
  },
  getOrderList: function (user, date, search) {
    if (!user) {
      if (!date) {
        return `SElECT o.id, o.status, o.invoice_id, u.name, u.phone, u.image, o.amount, o.created_at, o.updated_at 
        FROM orders AS o INNER JOIN users AS u 
        ON o.userId = u.id 
        WHERE MONTH(o.created_at) = MONTH(now())
        AND YEAR(o.created_at) = YEAR(NOW())
        AND o.invoice_id LIKE '${search}%'`;
      } else {
        return `SElECT o.id, o.status, o.invoice_id, u.name, u.phone, u.image, o.amount, o.created_at, o.updated_at 
        FROM orders AS o INNER JOIN users AS u 
        ON o.userId = u.id 
        WHERE DATE(o.created_at) between DATE('${date[0]}') and DATE('${date[1]}')
        AND o.invoice_id LIKE '${search}%'`;
      }
    } else {
      return `SELECT invoice_id, type, status, amount, created_at, updated_at from orders WHERE userId = ${user}`;
    }
  },
  getOrders: function() {
    return `SELE`
  },
  updateUserInfo: function (user, id) {
    return `UPDATE users SET name = '${user.name}', phone = '${user.phone}', updated_at = NOW() WHERE id = ${id}`;
  },
  getUserList: function(name) {
    return `SELECT id, name, email, phone, image, end_at, 
    active, point, lesson, isCanInvite, cost, invited FROM users 
    WHERE name LIKE '${name}%' 
    OR email LIKE '${name}%'`
  },
  getMinLevel: function(id) {
    return `SELECT MIN(lvl) 
    FROM lesson WHERE groupId = 
    ( SELECT id FROM lesson_group WHERE groupId = 
      (SELECT groupId FROM lesson_group WHERE id = ${id}) 
    + 1)`
  },
  updateLessonLevels: function(level) {
    return `UPDATE lesson SET lvl = lvl + 1 WHERE lvl >= ${level}`;
  }
};

module.exports = query;