const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'localhost',
  database: 'taptap',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//     host: 'localhost:3306',
//     database: 'fasttype',
//     user: 'otgoo1994',
//     password: 'Password1994@'
//   });

  
const sha256 = require("js-sha256");
const jwt = require('jwt-then');

exports.getBeginText = async (req, res) => {
    const { lang } = req.body;

    let sql = `SELECT text from practice WHERE lan = '${lang}' ORDER BY RAND() LIMIT 1`;

    db.query(sql, async (err, result) => {
        if(err) {
            throw err;
        }
        return res.json({
            'result': 200,
            'data': result[0].text
        });
    });
    
};

exports.getRankText = async (req, res) => {
    const { raceId } = req.body;
    let rows = `SELECT text, raceId, start_at, end_at from main_race WHERE active = 1 AND raceId = '${raceId}'`;
    db.query(rows, async (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {
            res.json({
                result: 'success',
                data: result[0]
            });
        } else {
            res.json({
                result: 'failed'
            });
        }
    });
}

exports.getAllRankText = async (req, res) => {
    let date = new Date();
    // date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); 
    date = date.toISOString().replace('T', ' ').replace(/T/, ' ').replace(/\..+/, '');
    
    let rows = `SELECT raceId, start_at, end_at, image, name from main_race WHERE active = 1 AND end_at > '${date}' ORDER BY start_at ASC`;
    db.query(rows, async (err, result) => {
        if(err) {
            throw err;
        }
        let rec = `SELECT m.raceId, MAX(mp.wpm) as wpm from main_race as m inner join main_race_players as mp on m.raceId = mp.raceId where m.active = 1 GROUP BY m.raceId`;
        db.query(rec, async (err, resultt) => {
            if(err) {
                throw err;
            }
            res.json({
                data: result,
                wpm: resultt
            });
        })
    });
}

exports.upgradeWpm = async (req, res) => {
    const { point, wpm, percent} = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    let check = `SELECT record_wpm, avg_wpm, avg_percent, rank, point from users where id = ${payload.id}`;
        db.query(check, (err, result) => {
          if(err) {
            throw err;
          }
          let avg_p, record_wpm, avg_wpm;
          if(wpm > result[0].record_wpm) {
            record_wpm = wpm;
          } else {
            record_wpm = result[0].record_wpm;
          }

          if(result[0].avg_percent == 0) {
            avg_p = parseInt(percent);
          } else {
            avg_p = parseInt((percent + result[0].avg_percent) / 2);
          }

          if(result[0].avg_wpm == 0) {
            avg_wpm = wpm;
          } else {
            avg_wpm = parseInt((wpm + result[0].avg_wpm) / 2);
          }

          let pt = parseInt(result[0].point) + parseInt(point);
          let rank = 1;
          if(pt > 999 && pt < 3000) {
            rank = 2;
          } else if(pt > 2999 && pt < 5000) {
            rank = 3;
          } else if(pt > 4999 && pt < 10000) {
            rank = 4;
          } else if(pt > 10000) {
            rank = 5;
          }

          let updt = `UPDATE users SET record_wpm = ${record_wpm}, avg_wpm = ${avg_wpm}, avg_percent = ${avg_p}, rank = ${rank}, point = ${pt} WHERE id = ${payload.id}`;
          db.query(updt, err => {
            if(err) {
              throw err;
            }
            let r = `SELECT name, image from rank WHERE id = ${rank}`;
            db.query(r, async (err, result) => {
                if(err) {
                    throw err;
                }
                res.json({
                    result: 'success',
                    record: record_wpm,
                    avg_wpm,
                    avg_p,
                    rank: result[0]
                });
            });
          });
        });

}

exports.getSelectecText = async (req, res) => {
    const { roomId } = req.body;
    let sql = `SELECT race_text.text from race_text inner join room on race_text.id = room.textId WHERE room.roomId = '${roomId}'`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            text: result[0].text
        });
    });

}