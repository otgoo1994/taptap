const db = require("../config/db");

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
  }
};

module.exports = method;