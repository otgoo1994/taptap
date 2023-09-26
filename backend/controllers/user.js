const nodemailer = require("nodemailer");
const fs = require('fs');
const url = require('url'); 
const db = require("../config/db");
const query = require("../config/query");
const sha256 = require("js-sha256");
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
  }
};


exports.facebookLogin = async (req, res) => {
  const { user } = req.body;
  let string;
  string = query.checkFbLogin(user.id);
  const checkuser = await method.execute(string);

  if (checkuser.length > 0) {
    string = query.checkBlackList(checkuser[0].id);
    const blacklist = await method.execute(string);
    
    if (blacklist.length > 0) {
      return res.status(200).json({
        result: 'fail',
        data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
        status: 403
      })
    }

    string = query.updateUserProfile(['image'], {image: user.picture.data.url, id: checkuser[0].id});
    const update = await method.execute(string);

    if (!update) {
      return res.status(200).json({
        status: 403
      })
    }

    string = query.checkFbLogin(user.id);
    const check = await method.execute(string);
    const token  = await jwt.sign({ id: check[0].id },  'HS256');

    return res.status(200).json({
      result: 'success',
      data: check[0],
      token,
      status: 200
    })
  } else {
    if (!user.email) {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var password = Math.random().toString(36).slice(-8);
      string = query.insert('users');
      let post = {name: user.name, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id, lesson: 1};
      const record = await method.execute(string, post);
  
      if (!record) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await method.execute(string);
      const token  = await  jwt.sign({ id: check[0].id, email: check[0].email }, 'HS256');
      
      return res.status(200).json({
          result: 'success',
          data: check[0],
          token,
          status: 200
      })
    }
  
    string = query.checkUserEmail(user.email);
    const email = await method.execute(string);
    
    if (email.length > 0) {
      string = query.checkBlackList(email[0].id);
      const blacklist = await method.execute(string);
      if (blacklist.length > 0) {
        return res.status(200).json({
          result: 'fail',
          data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
          status: 403
        })
      }
  
      string = query.updateUserProfile(['image', 'facebook'], {image: user.picture.data.url, id: email[0].id, facebook: user.id});
      console.log(string, '==udpate');
      const update = await method.execute(string);
      
      if (!update) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await method.execute(string);
      const token  = await jwt.sign({ id: check[0].id },  'HS256');
  
      return res.status(200).json({
        result: 'success',
        data: check[0],
        token,
        status: 200
      })
  
    } else {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var password = Math.random().toString(36).slice(-8);
      string = query.insert('users');
      let post = {name: user.name, email: user.email, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id, lesson: 1}
      const record = await method.execute(string, post);
  
      if (!record) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await method.execute(string);
      const token  = await  jwt.sign({ id: check[0].id, email: check[0].email }, 'HS256');
      
      return res.status(200).json({
          result: 'success',
          data: check[0],
          token,
          status: 200
      })
    }
  }
}
