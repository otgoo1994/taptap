const db = require("../config/db");
const jwt = require('jwt-then');
const mail = require("../config/mail");

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
  },
  sendInvite: async function(email, token, user) {
    if (!email) { return; }

    try {

      return new Promise((resolve, reject) => {
        const options = {
          from: '\'typing.mn\' ' + process.env.MAIL_USER,
          to: email,
          subject: "Welcome to Typing.mn",
          html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
          <tr>
            <td colspan="3" style="height: 50px; background-color: #f6f6f6; text-align: center;">
              <div style="width: 10%; margin: 30px auto;">
                <img style="width: 100%; height: auto;" src="https://api.typing.mn/images/huruu.png"/>
              </div>
            </td>
          </tr>
          <tr>
          <td width="25%" style="background-color: #f6f6f6;"></td>
          <td width="50%" style="background-color: #ffffff; border-radius: 30px;">

            <div style="margin-bottom: 10px; padding-left: 50px; margin-top: 50px;">
              Сайн байна уу?
            </div>

            <div align="center" style="margin-bottom: 20px; font-weight: 700;">
              <strong>${user.name} </strong> таныг <b>typing.mn</b>-тай нэгдэхийг урьсан байна.
            </div>

            <div style="text-align: center; position: relative; background-color: #FE5262; color: #FFFFFF; cursor: pointer; width: 200px; padding: 20px; margin: 0px auto 50px auto; font-weight: 600;">
              Register now
            </div>
          
          </td>
          <td width="25%" style="background-color: #f6f6f6;"></td>
          </tr>
          <tr><td colspan="3" style="height: 50px; background-color: #f6f6f6;">
          
          
          <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>typing.mn</strong></a> - All rights reserved.</div>
          
          </td></tr>
          </table>`,
        };
    
        mail.sendMail(options,  function(err, info) {
          if(err) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    } catch (e) {
        Logger.error(e);
        throw e;
    }
  },
  sendEmail: async function(email, token, password) {
    if (!email || !token) { return false; }

    try {

      return new Promise((resolve, reject) => {
        const options = {
          from: '\'typing.mn\' ' + process.env.MAIL_USER,
          to: email,
          subject: !password ? "Баталгаажуулах код" : "Нууц үг сэргээх хүсэлт",
          html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
          <tr><td colspan="3" style="height: 50px; background-color: #f6f6f6;"></td></tr>
          <tr>
          <td width="25%" style="background-color: #f6f6f6;"></td>
          <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
            <div align="center" style="margin-bottom: 20px; font-weight: 700; margin-top: 50px;">
              ${!password ? 'Баталгаажуулах код' : 'Нууц үг сэргээх'}
            </div>
          
            <div style="margin-bottom: 10px; padding-left: 50px;">
              Сайн байна уу?
            </div>
          
            <div style="margin-bottom: 50px; padding-left: 50px;">
              ${!password ? 'Таны баталгаажуулах код' : 'Таны шинэчлэгдсэн нууц үг'}: <b>${token}</b>
            </div>
          
          </td>
          <td width="25%" style="background-color: #f6f6f6;"></td>
          </tr>
          <tr><td colspan="3" style="height: 50px; background-color: #f6f6f6;">
          
          
          <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>typing.mn</strong></a> - All rights reserved.</div>
          
          </td></tr>
          </table>`,
        };
    
        mail.sendMail(options,  function(err, info) {
          if(err) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    } catch (e) {
        Logger.error(e);
        throw e;
    }
  }
};

module.exports = method;