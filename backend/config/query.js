const sha256 = require("js-sha256");


Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

const query = {
  checkFbLogin: function(id) {
    return `SELECT id, name, phone, image, active, end_at, point, avg_wpm, record_wpm  from users WHERE facebook = '${id}'`;
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
  }
};

module.exports = query;