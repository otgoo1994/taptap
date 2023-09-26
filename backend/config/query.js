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
  }
};

module.exports = query;