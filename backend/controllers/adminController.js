const mysql = require("mysql");
const fs = require('fs');

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



const sha256 = require("js-sha256");
const jwt = require('jwt-then');

exports.getAdmins = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    let users = `SELECT id, email, name, phone, image, permission FROM admin WHERE id != ${payload.id}`;
    db.query(users, async (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            users: result
        });
    });
}

exports.changePassword = async (req, res) => {
  const { password, oldPassword } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  
  let qry = `SELECT id FROM admin WHERE email = '${payload.email}' AND password = '${sha256(oldPassword + process.env.SALT)}'`;
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

    let updt = `UPDATE admin   SET password = '${sha256(password + process.env.SALT)}' WHERE email = '${payload.email}'`

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

exports.setEndStateRace = async (req, res) => {
  const { raceId } = req.body;
  let rc = `SELECT u.name, u.id, m.wpm, @curRow := @curRow + 1 AS stage from users as u inner join main_race_players as m on u.id = m.userId JOIN (SELECT @curRow := 0) r WHERE m.raceId = '${raceId}' ORDER BY m.wpm DESC LIMIT 10`;
  db.query(rc, async (err, result) => {
    if(err) {
      throw err;
    }
    result.forEach(el => {
      let ch = `SELECT id from notify WHERE userId = ${el.id} AND ckey = '${raceId}'`;
      db.query(ch, async (err, result) => {
        if (err) {
          throw err;
        }
        if(result.length == 0) {
          let pst = {userId: el.id, type: 'race', value: el.stage, ckey: raceId};
          let sql = 'INSERT INTO notify SET ?';
          db.query(sql, pst, err => {
            if(err) {
              throw err;
            }
          });
        }
      });
    });
    let up = `UPDATE main_race SET active = 0 WHERE raceId = '${raceId}'`;
    db.query(up, async err => {
      if(err) {
        throw err;
      }
    });
    res.json({
      result
    });
  });
}

exports.getRaceText = async (req, res) => {
  let rows = `SELECT text, raceId, start_at, end_at, active, name FROM main_race`;
  db.query(rows, async (err, result) => {
    if(err) {
      throw err;
    }
    res.json({
      data: result
    });
  });
}

exports.addTextImage = async (req, res) => {
  const image = req.files.photo;
  const type = image.mimetype.split("/")[1];
  
  const time = Date.now();
  const image_name = time + "." + type;

  image.mv("./public/images/race/" + image_name, function (err, result) {
      
    if(err) {
      throw err;
    }
    let img = req.protocol + '://' + req.get('host') + '/images/race/' + image_name;
    res.json({
      img: img
    });
  });
}


exports.getBanners = async (req, res) => {
  let banners = `SELECT id, image from banners`;
  db.query(banners, async (err, result) => {
    if(err) {
      throw err;
    }
    res.json({
      banners: result
    });
  });
}

exports.deleteBanner = async (req, res) => {
  const { id } = req.body; 
  let check = `SELECT image from banners WHERE id = ${id}`;
  db.query(check, async (err, result) => {
    if(err) {
      throw err;
    }
    let i = result[0].image.split('banner/')[1];
    if(result.length > 0) {
        if(fs.existsSync("./public/images/banner/" + i)){
          fs.unlinkSync("./public/images/banner/" + i); 
        }
        let dl = `DELETE FROM banners WHERE id=${id}`;
        db.query(dl, async err => {
          if(err) {
            throw err;
          }
          let get = `SELECT id, image from banners`;
          db.query(get, async (err, result) => {
            if(err) {
              throw err;
            }
            res.json({
              banners: result
            });
          });
        });
    } else {
      let get = `SELECT id, image from banners`;
      db.query(get, async (err, result) => {
        if(err) {
          throw err;
        }
        res.json({
          banners: result
        });
      });
    }

  });
}

exports.addBanner = async (req, res) => {

  const image = req.files.photo;
  const type = image.mimetype.split("/")[1];
  
  const time = Date.now();
  const image_name = time + "." + type;

  image.mv("./public/images/banner/" + image_name, function (err, result) {
      
    if(err) {
      throw err;
    }
    let img = req.protocol + '://' + req.get('host') + '/images/banner/' + image_name;
    let post = {image: img}
      let sql = 'INSERT INTO banners SET ?';
      db.query(sql, post, err => {
        if(err) {
          throw err;
        }
        let get = `SELECT id, image from banners`;
        db.query(get, async (err, result) => {
          if(err) {
            throw err;
          }
          res.json({
            banners: result
          });
        });
      });
    
  });
}

exports.allUsers = async (req, res) => {
  const { page, pageGroup, name } = req.body;
  let prev = page - 1;
  prev = prev * pageGroup;
  let last = page * pageGroup;
  let users = `SELECT u.name, u.email, u.id, u.image, u.phone, u.record_wpm, u.point, r.image as rimage, r.name as rname from users as u inner join rank as r on u.rank = r.id WHERE u.name LIKE '${name}%'`;
  db.query(users, async (err, result) => {
    if(err) {
      throw err;
    }
    let ranks = `SELECT r.id, COUNT(r.id) as count from users as u inner join rank as r on u.rank = r.id GROUP BY u.rank`;
    db.query(ranks, async (err, rs) => {
      if(err) {
        throw err;
      }
      let sc = result.length % pageGroup;
      let f = parseInt(result.length / pageGroup);
      if(sc > 0) {
        f += 1;
      }
      
      res.json({
        users: result.slice(prev, last),
        count: rs,
        pagination: f
      });
    });
  });
}

exports.addTexts = async (req, res) => {
  const {type, language, level, text, date, image, name} = req.body;
  let lvl, lang;
  if(type == 'Хичээл') {

    if(level.toUpperCase() == 'АНХАН') {
      lvl = 1;
    } else if(level.toUpperCase() == 'ДУНД') {
      lvl = 2;
    } else if(level.toUpperCase() == 'АХИСАН') {
      lvl = 3;
    }

    if(language.toUpperCase() == 'МОНГОЛ') {
      lang = 'мон'
    } else {
      lang = 'eng'
    }

    let post = {rank: lvl, lan: lang, text}
    let sql = 'INSERT INTO practice SET ?';
    db.query(sql, post, err => {
      if(err) {
        throw err;
      }                
      res.json({
        result: 'success'
      });
    });

  } else {
    let start = new Date(date[0]);
    let end = new Date(date[1]);
    let now = new Date();
    start.setHours(start.getHours());
    end.setHours(end.getHours());
    now.setHours(now.getHours());
    const raceId = `R${Date.now()}`;
    
    let post = {text, created_at: now, start_at: start, end_at: end, raceId, active: 1, image, name}
    let sql = 'INSERT INTO main_race SET ?';
    db.query(sql, post, err => {
      if(err) {
        throw err;
      }                
      res.json({
        result: 'success'
      });
    });
    
  }
}

exports.getText = async (req, res) => {
  let rows = `SELECT * FROM practice`;
  db.query(rows, async (err, result) => {
    if(err) {
      throw err;
    }
    res.json({
      data: result
    });
  });
}

exports.deleteText = async (req, res) => {
  const { id } = req.body;
  let dlt = `DELETE from practice WHERE id = ${id}`;
  db.query(dlt, async (err, result) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.UpdateInfo = async (req, res) => {
    const { phone, address } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
  
    let qry = `UPDATE admin SET phone = '${phone}', address = '${address}' WHERE id = ${payload.id}`;
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

exports.UpdateProfile = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
  
    const image = req.files.photo;
    const type = image.mimetype.split("/")[1];
    
    const time = Date.now();
    const image_name = time + "." + type;
  
    let qry = `SELECT image from admin WHERE id = ${payload.id}`;
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
        let updt = `UPDATE admin SET image = '${img}' WHERE id = ${payload.id}`;
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


exports.LoggedUserInfo = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
  
    const payload = await jwt.verify(token, 'HS256');
    let qry = `SELECT name, email, phone, image, address FROM admin WHERE id = ${payload.id}`;
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

exports.register = async (req, res) => {
    const {email, name, phone, permission, address} = req.body;
    let qry = `SELECT id FROM admin WHERE email = '${email}'`;
    db.query(qry, async (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {
            res.json({
                result: 'fail',
            });
        } else {
            let img = req.protocol + '://' + req.get('host') + '/images/user/default.png';
            let post = {name: name, email: email, password: sha256(phone + process.env.SALT), image: img, address: address, phone: phone, permission: permission }
            let sql = 'INSERT INTO admin SET ?';
            db.query(sql, post, err => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success',
                });
            });
        }
    });
}


exports.login = async (req, res) => {
    const {email, password} = req.body;
    
    // const user = await User.findOne({email, password: sha256(password + process.env.SALT)});
    let qry = `SELECT id, email, name, phone, image  from admin WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;

     db.query(qry, async (err, result) => {

      if(err) {
        throw err;
      }

      if(result.length === 0) {
        return res.status(200).json({
          result: 'fail',
          data: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу',
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
              user: result[0],
              token,
              status: 200
          })
      }
    });
}