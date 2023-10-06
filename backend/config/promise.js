const db = require("../config/db");
const jwt = require('jwt-then');

const method = {
  execute: async function(string, data) {
    if (!data) {
      return new Promise((resolve, reject) =>{
        db.query(string,  (error, elements) =>{
            if(error){
              return reject(false);
            }
            return resolve(elements);
        });
      });
    } else {
      return new Promise((resolve, reject) =>{
        db.query(string, data, (error, elements) =>{
            if(error){
              return reject(false);
            }
            return resolve(elements);
        });
      });
    }
  },
  getPayload: async function(req) {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    return payload;
  }
};

module.exports = method;