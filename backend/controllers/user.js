const mysql = require("mysql");
const nodemailer = require("nodemailer");
const fs = require('fs');
const url = require('url'); 

const db = mysql.createConnection({
  host: 'localhost',
  database: 'taptap',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//   host: 'localhost:3306',
//   database: 'fasttype',
//   user: 'otgoo1994',
//   password: 'Password1994@'
// });


const transporter = nodemailer.createTransport({
  host: 'smtp.mail.mn',
  port: 465,
  secure: true,
  auth: {
    user: 'support@itlab.mn',
    pass: 'Itl@b2020'
  }
});

const sha256 = require("js-sha256");
const jwt = require('jwt-then');
const { json } = require("express");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  
  let qry = `SELECT id, email, name, phone, image, active  from users WHERE email = '${email}'`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    if(result.length > 0) {
      return res.status(200).json({
        result: 'fail',
        data: 'Уучлаарай. Бүртгэлтэй и-мэйл хаяг',
        status: 400
      })
    } else {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      let img = req.protocol + '://' + req.get('host') + '/images/user/default.png';
      let post = {name: name, email: email, password: sha256(password + process.env.SALT), image: img, token: '0', refresh_token: '0', created_at: datetime}
      let sql = 'INSERT INTO users SET ?';
      db.query(sql, post, err => {
        if (err) {
          throw err;
        }

        db.query(qry, async (err, result) => {
          if(err) {
            throw err;
          }

          const token  = await  jwt.sign({
            id: result[0].id,
            email: result[0].email
          }, 
          'HS256');

          await SentEmail(token, email);

          return res.json({
            result: 'success',
            data: 'Амжилттай бүртгэгдлээ. Баталгаажуулах и-мэйл илгээлээ.',
            status: 200
          });
        });
      });
    }
    


  });
  
};

exports.upgradeGiftRaceWpm = async (req, res) => {
  const { raceId, wpm } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  

  let rows = `SELECT users.name, users.id, users.image, m.wpm, m.date from main_race_players as m inner join users on m.userId = users.id WHERE m.raceId = '${raceId}' ORDER BY m.wpm DESC LIMIT 10`;
  let check = `SELECT wpm from main_race_players WHERE userId = ${payload.id} AND raceId = '${raceId}'`
  db.query(check, async (err, result) => {
    if(err) {
      throw err;
    }
    if(result.length > 0) {
      if(result[0].wpm < wpm) {
        let current = new Date();
        current = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();

        let updt = `UPDATE main_race_players SET wpm = ${wpm}, date = '${current}' WHERE userId = ${payload.id} AND raceId = '${raceId}'`;
        db.query(updt, async err => {
          if(err) {
            throw err;
          }
          db.query(rows, async (err, result) => {
            if(err) {
              throw err;
            }
            res.json({
              data: result
            });
          });
        })
      } else {
        db.query(rows, async (err, result) => {
          if(err) {
            throw err;
          }
          res.json({
            data: result
          });
        });
      }
    } else {
      let post = {raceId: raceId, userId: payload.id, wpm: wpm}
      let sql = 'INSERT INTO main_race_players SET ?';
      db.query(sql, post, err => {
        if(err) {
          throw err;
        }
        db.query(rows, async (err, result) => {
          if(err) {
            throw err;
          }
          res.json({
            data: result
          });
        });
      });
    }
  });

}

exports.getTopPlayersFromGiftRace = async (req, res) => {
  const { raceId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  let rows = `SELECT users.name, users.id, users.image, m.wpm, m.date, @curRow := @curRow + 1 AS stage from main_race_players as m inner join users on m.userId = users.id JOIN (SELECT @curRow := 0) r WHERE m.raceId = '${raceId}' ORDER BY m.wpm DESC LIMIT 10`;
  db.query(rows, async (err, result) => {
    if(err) {
      throw err;
    }
    // let check = result.some(function(field) {
    //   return field.id == payload.id
    // });
    // if(!check) {
    //   let me = `SELECT users.name, users.id, users.image, m.wpm, m.date from main_race_players as m inner join users on m.userId = users.id WHERE m.raceId = '${raceId}' AND users.id = ${payload.id}`;
    //   db.query(me, async (err, onme) => {
    //     if(err) {
    //       throw err;
    //     }
    //     if(onme.length > 0) {
    //       result.push(onme[0]);
    //     } else {
    //       res.json({
    //         data: result
    //       });
    //     }
    //   });
    // } else {
      
    // }
    res.json({
      data: result
    });
    
  });
}

exports.VerifyEmail = async (req, res) => {
  const token  = req.query.token;
  if(!token) {
    return res.redirect('http://localhost:8080/404');
  }

  try {

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    const payload = await jwt.verify(token, 'HS256');
    
    const update = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const enddate = new Date().addDays(3).toISOString().replace(/T/, ' ').replace(/\..+/, '');

    let sql = `UPDATE users SET active = 1, end_at = '${enddate}', updated_at = '${update}' WHERE id = ${payload.id}`;
    db.query(sql, err => {
      if(err) {
        throw err;
      }
      return res.redirect('http://localhost:8080/login?sms=1');
    });
    
  } catch (err) {
    console.log(err);
    return res.redirect('http://localhost:8080/404');
  }

}


exports.GetFriends = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  // let sql = `SELECT name, email, id, image, online FROM users WHERE id in (select (CASE WHEN user1 = ${payload.id} THEN user2 WHEN user2 = ${payload.id} THEN user1 END) as id from friend_list WHERE user1 = ${payload.id} or user2 = ${payload.id})`;
  let sql = `SELECT name, email, id, image, online from users WHERE id != ${payload.id} AND online = 1`;
  db.query(sql, async (err, result) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success',
      data: result,
      status: 200
    });
  });
}

function SentNewPassword(email, password) {
  let mailOptions = {
    from: '\'Хурдан хуруу\' support@itlab.mn',
    to: `${email}`,
    subject: 'Нууц үг сэргээх хүсэлт',
    html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
    <tr><td colspan="3" style="height: 50px; background-color: #f1f0f6;"></td></tr>
    <tr>
    <td width="25%" style="background-color: #f1f0f6;"></td>
    <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
    
      <div style="margin-bottom: 20px; margin-top: 50px;" align="center">
        <img src="https://itlab.mn/img/logo/huruu.png" style="width: 150px; height: auto;">
      </div>
    
      <div align="center" style="margin-bottom: 20px; font-weight: 700;">
        Нууц үг сэргээх
      </div>
    
      <div style="margin-bottom: 10px; padding-left: 50px;">
        Сайн байна уу?
      </div>
    
      <div style="margin-bottom: 10px; padding-left: 50px;">
        Манай сайтыг ашигласан танд баярлалаа. 
      </div>
    
      <div style="margin-bottom: 50px; padding-left: 50px;">
        Таны шинэчлэгдсэн нууц үг: <b>${[password]}</b>
      </div>
    
    </td>
    <td width="25%" style="background-color: #f1f0f6;"></td>
    </tr>
    <tr><td colspan="3" style="height: 50px; background-color: #f1f0f6;">
    
    
    <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>ITLAB</strong></a> - Бүх эрх хуулиар хамгаалагдсан</div>
    
    </td></tr>
    </table>`
  }

  transporter.sendMail(mailOptions,  function(err, info) {
    if(err) {
      console.log(err);
    } else {
      console.log('email sent', info);
    }
  });
}

async function SentEmail(token, email) {

  let mailOptions = {
    from: '\'Хурдан хуруу\' support@itlab.mn',
    to: `${email}`,
    subject: 'Бүртгэл баталгаажуулалт',
    html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
    <tr>
      <td colspan="3" style="height: 50px; background-color: #f1f0f6;"></td>
    </tr>
    <tr>
      <td width="25%" style="background-color: #f1f0f6;"></td>
      <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
        <div style="margin-bottom: 20px; margin-top: 50px;" align="center">
          <img src="https://itlab.mn/img/logo/huruu.png" style="width: 150px; height: auto;">
        </div>
        <div align="center" style="margin-bottom: 20px; font-weight: 700;">Бүртгэл баталгаажуулах</div>
        <div style="margin-bottom: 10px; padding-left: 50px;">Сайн байна уу?</div>
        <div style="margin-bottom: 10px; padding-left: 50px;">Манай сайтад бүртгүүлсэн танд баярлалаа. </div>
        <div style="margin-bottom: 50px; padding-left: 50px;">Хэрвээ та бүртгэлээ баталгаажуулахыг хүсвэл доорх товч дээр дарна уу.</div>
        <div align="center" style="margin-bottom: 50px;">
          <a href="http://localhost:8002/api/user/verify-mail?token=${token}" style="border-radius: 8px; color:#fff; display:inline-block; font-family:sans-serif;font-size:16px; line-height:44px; text-align:center; text-decoration:none; -webkit-text-size-adjust:none; mso-hide:all; padding-left: 20px; padding-right: 20px; font-weight: 700; background-image: linear-gradient(to right, #410441 0%, #740d74  30%,  #ac0dac  60%, #ff00ff  100%)"> Баталгаажуулах </a>
        </div>
      </td>
      <td width="25%" style="background-color: #f1f0f6;"></td>
    </tr>
    <tr>
      <td colspan="3" style="height: 50px; background-color: #f1f0f6;">
        <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>ITLAB</strong></a> - Бүх эрх хуулиар хамгаалагдсан</div>
      </td>
    </tr>
    </table>`
  }
  

  transporter.sendMail(mailOptions,  function(err, info) {
    if(err) {
      console.log(err);
    } else {
      console.log('email sent', info);
    }
  });

}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    // const user = await User.findOne({email, password: sha256(password + process.env.SALT)});
    let qry = `SELECT id, email, name, phone, image, active, end_at, point  from users WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;

     db.query(qry, async (err, result) => {

      if(err) {
        throw err;
      }

      if(result.length === 0) {
        return res.json({
          result: 401,
          data: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу',
        })
      }

      if(result[0].active === 0) {

        const token  = await  jwt.sign({
          id: result[0].id,
          email: result[0].email
        }, 
        'HS256');

        await SentEmail(token, email);

        return res.json({
          result: 401,
          data: 'Баталгаажуулаагүй хаяг байна. И-Мэйл хаягаа шалгана уу!',
          status: 400
        })
      } 

      const token  = await  jwt.sign({
        id: result[0].id,
        email: result[0].email
      }, 
        'HS256');
      
      return res.json({
          result: 200,
          data: result[0],
          token
      })
    });
}

exports.forgotPassword = async (req, res) => {
  const { email } =  req.body;
  
  let qry = `SELECT id from users WHERE email = '${email}'`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    if(result.length === 0) {
      return res.json({
        result: 'failed',
        data: 'Уучлаарай. Энэ и-мэйл хаяг нь бүртгэлгүй байна',
      });
    } 

    var password = Math.random().toString(36).slice(-8);

    let updt = `UPDATE users set password = '${sha256(password + process.env.SALT)}' WHERE email = '${email}'`;
    db.query(updt, async (err, result) => {
      if(err) {
        throw err;
      }
      await SentNewPassword(email, password);
      res.json({
        result: 'success',
        data: 'Нууц үг амжилттай шинэчлэгдлээ. И-мэйл хаягаа шалгана уу'
      });
    });
  });
}

exports.changePassword = async (req, res) => {
  const { password, oldPassword } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  
  let qry = `SELECT id FROM users WHERE email = '${payload.email}' AND password = '${sha256(oldPassword + process.env.SALT)}'`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    
    if(result.length === 0) {
      return res.json({
        result: 'failed',
        data: 'Хуучин нууц үг буруу'
      });
    }

    let updt = `UPDATE users SET password = '${sha256(password + process.env.SALT)}' WHERE email = '${payload.email}'`

    db.query(updt, async (err, result) => {
      if(err) {
        throw err;
      }
      return res.json({
        result: 'success',
        data: 'Нууц үг амжилттай шинэчлэгдлээ'
      });
    });

  });
  
}

exports.LoggedUserInfo = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const payload = await jwt.verify(token, 'HS256');
  let qry = `SELECT record_wpm, avg_percent, avg_wpm, rank.name as rank_name, users.id, users.point, rank.image as rank_image, users.image, users.name, users.email, users.phone from users inner join rank on users.rank = rank.id where users.email = '${payload.email}'`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    return res.json({
      'result': 'success',
      'data': {'info': result[0]},
      'status': 200
    });
  });

}

exports.getLastRaces = async (req, res) => {  
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  let qry = `SELECT room_players.roomId, room_players.place, room_players.percent, room_players.wpm from room inner join room_players on room.roomId = room_players.roomId WHERE room_players.user_id = ${payload.id} LIMIT 5`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    return res.json({
      data: result
    });
  });
}

exports.Tops = async (req, res) => {
  let topRace = `SELECT u.name, u.image, m.wpm, m.date, u.id from users as u inner join main_race_players as m on m.userId = u.id GROUP BY u.id ORDER BY m.wpm DESC LIMIT 10`;
  db.query(topRace, async (err, result) => {
    if(err) {
      throw err;
    }
    let topRoom = `SELECT u.name, u.image, u.name, u.id, rp.wpm, r.date from users as u inner join room_players as rp on u.id = rp.user_id inner join room as r on rp.roomId = r.roomId GROUP BY u.id ORDER BY rp.wpm DESC LIMIT 10`;
    db.query(topRoom, async (err, resultRoom) => {
      if(err) {
        throw err;
      }
      resultRoom.forEach((element, index) => {
        let check = result.some(function(field) {
          return field.id == element.id
        });
        if(check) {
          result.forEach(el => {
            if(element.id == el.id) {
              if(el.wpm < element.wpm) {
                el.wpm = element.wpm
                el.date = element.date;
              }
            }
          });
        } else {
          result.push(element);
        }
      });
      result.sort(SortWpm("wpm"));
      res.json({
        result: 'success',
        data: result,
        status: 200
      });
    });
  });
}

exports.topsThisMonth = async (req, res) => {
  let dt = new Date();
  
  let date = dt.getFullYear() + '-' + (dt.getMonth() + 1);
  
  let topRace = `SELECT u.name, u.image, m.wpm, m.date, u.id from users as u inner join main_race_players as m on m.userId = u.id WHERE m.date LIKE '${date}%' GROUP BY u.id ORDER BY m.wpm DESC LIMIT 10`;
  db.query(topRace, async (err, result) => {
    if(err) {
      throw err;
    }
    let topRoom = `SELECT u.name, u.image, u.name, u.id, rp.wpm, r.date from users as u inner join room_players as rp on u.id = rp.user_id inner join room as r on rp.roomId = r.roomId WHERE r.date LIKE '${date}%' GROUP BY u.id ORDER BY rp.wpm DESC LIMIT 10`;
    db.query(topRoom, async (err, resultRoom) => {
      if(err) {
        throw err;
      }
      resultRoom.forEach((element, index) => {
        let check = result.some(function(field) {
          return field.id == element.id
        });
        if(check) {
          result.forEach(el => {
            if(element.id == el.id) {
              if(el.wpm < element.wpm) {
                el.wpm = element.wpm
                el.date = element.date;
              }
            }
          });
        } else {
          result.push(element);
        }
      });
      result.sort(SortWpm("wpm"));
      res.json({
        data: result
      });
    });
  });
}

function SortWpm(prop) {
  return function(a, b) {    
    if (a[prop] < b[prop]) {    
        return 1;    
    } else if (a[prop] > b[prop]) {    
        return -1;    
    }    
    return 0;    
  } 
}

exports.getNotify = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  let notify = `SELECT type, value, ckey, seen from notify WHERE userId = ${payload.id} AND seen = 0`;
  db.query(notify, async (err, result) => {
    if (err) {
      throw err;
    }
    res.json({
      data: result
    });
  });
}

exports.UpdateProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');

  const image = req.files.photo;
  const type = image.mimetype.split("/")[1];
  
  const time = Date.now();
  const image_name = time + "." + type;

  let qry = `SELECT image from users WHERE id = ${payload.id}`;
  db.query(qry, async (err, result) => {
    if(err) {
      throw err;
    }
    let checkImg = result[0].image.split('user/')[1];
    
    if(checkImg != 'default.png'){
      if(fs.existsSync("./public/images/user/" + checkImg)){
        fs.unlinkSync("./public/images/user/" + checkImg); 
      }
    }
    image.mv("./public/images/user/" + image_name, function (err, result) {
      
      if(err) {
        throw err;
      }
      let img = req.protocol + '://' + req.get('host') + '/images/user/' + image_name;
      let updt = `UPDATE users SET image = '${img}' WHERE id = ${payload.id}`;
      db.query(updt, async (err, result) => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success',
          image: img
        });
      });
      
    });

  });
  
}

exports.facebookLogin = async (req, res) => {
  // const { userId, email, name, picture } = req.body;
  const { user } = req.body;
  let check = `SELECT id, name, phone, image, active, end_at, point, avg_wpm, record_wpm  from users WHERE facebook = '${user.id}'`;
  db.query(check, async (err, result) => {
    if(err) {
      throw err;
    }
    if(result.length > 0) {
      // Фэйсбүүк ээр нэвтэрч байсан үед
      db.query(`SELECT id from blacklist WHERE userId = ${result[0].id}`, async (err, blist) => {
        if(err) {
          throw err;
        }
        
         if(blist.length > 0) {
          return res.status(200).json({
            result: 'fail',
            data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
            status: 400
          })
         } else {
          const token  = await  jwt.sign({
            id: result[0].id
          }, 
            'HS256');
    
          let up = `UPDATE users SET image = '${user.picture.data.url}' WHERE id = ${result[0].id}`
          db.query(up, async err => {
            if(err) {
              throw err;
            }
            db.query(check, async (err, u) => {
              if(err) {
                throw err;
              }
              return res.status(200).json({
                  result: 'success',
                  data: u[0],
                  token,
                  status: 200
              })
            })
          });
         }
      });
    } else {
      if(user.email != undefined) {
        let checkEmail = `SELECT id, name, phone, image, active, end_at, point, avg_wpm, record_wpm  from users WHERE email = '${user.email}'`;
        db.query(checkEmail, async (err, result) => {
          if(err) {
            throw err;
          }
          if(result.length > 0) {
            
            db.query(`SELECT id from blacklist WHERE userId = ${result[0].id}`, async (err, blist) => {
              if(err) {
                throw err;
              }
              
               if(blist.length > 0) {
                return res.status(200).json({
                  result: 'fail',
                  data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
                  status: 400
                })
               } else {
                // Фэйсбүүк айди олдохгүй боловч бүртгэлтэй мэйл нь ашиглагдаж байгаа үед 
                let updateUser = `UPDATE users SET facebook = '${user.id}' WHERE email = '${user.email}'`;
                db.query(updateUser, async err => {
                  if(err) {
                    throw err;
                  }

                  const token  = await  jwt.sign({
                    id: result[0].id
                  }, 
                    'HS256');
                  
                  return res.status(200).json({
                      result: 'success',
                      data: result[0],
                      token,
                      status: 200
                  })
                  
                })
               }
            });
            
          } else {
            // Фэйсбүүк айди олдохгүй мөн бүртгэлтэй мэйл нь олдохгүй үед шинээр үүсгээд явуулж байгаа хэсэг
            const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
            var password = Math.random().toString(36).slice(-8);
            let post = {name: user.name, email: user.email, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id}
            let sql = 'INSERT INTO users SET ?';
            db.query(sql, post, err => {
              if (err) {
                throw err;
              }
                db.query(check, async (err, result) => {
                  if(err) {
                    throw err;
                  }
                  if(result.length > 0) {

                    db.query(`SELECT id from blacklist WHERE userId = ${result[0].id}`, async (err, blist) => {
                      if(err) {
                        throw err;
                      }
                      
                       if(blist.length > 0) {
                        return res.status(200).json({
                          result: 'fail',
                          data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
                          status: 400
                        })
                       } else {
                        const token  = await  jwt.sign({
                          id: result[0].id
                        }, 
                          'HS256');
                        
                        return res.status(200).json({
                            result: 'success',
                            data: result[0],
                            token,
                            status: 200
                        })
                       }
                    });
                  }
                });
            });
          }
        });
      } else {
        const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var password = Math.random().toString(36).slice(-8);
        let post = {name: user.name, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id}
        let sql = 'INSERT INTO users SET ?';
        db.query(sql, post, err => {
          if (err) {
            throw err;
          }
            db.query(check, async (err, result) => {
              if(err) {
                throw err;
              }
              if(result.length > 0) {

                db.query(`SELECT id from blacklist WHERE userId = ${result[0].id}`, async (err, blist) => {
                  if(err) {
                    throw err;
                  }
                  
                   if(blist.length > 0) {
                    return res.status(200).json({
                      result: 'fail',
                      data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
                      status: 400
                    })
                   } else {
                    const token  = await  jwt.sign({
                      id: result[0].id,
                      email: result[0].email
                    }, 
                      'HS256');
                    
                    return res.status(200).json({
                        result: 'success',
                        data: result[0],
                        token,
                        status: 200
                    })
                   }
                });
              }
            });
        });
      }
      
    }
  });
}

exports.UpdateInfo = async (req, res) => {
  const { phone } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');

  let qry = `UPDATE users SET phone = '${phone}' WHERE id = ${payload.id}`;
  db.query(qry, err => {
    if(err) {
      throw err;
    }
    res.json({
      result : 'success',
      data: phone,
      status: 200
    });
  });
  
}
