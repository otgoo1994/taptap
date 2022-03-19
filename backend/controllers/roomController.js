const mysql = require("mysql");
const nodemailer = require("nodemailer");
const fs = require('fs');

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
const { Socket } = require("dgram");


exports.createRoom = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let qry = `SELECT * FROM room WHERE start = 0 AND end = 0 AND admin = ${payload.id}`;

    db.query(qry, (err ,result) => {
        if(err) {
            throw err;
        }
        if(result.length === 0) {
            const roomId = Date.now();
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            dt = yyyy + '-' + mm + '-' + dd;

            let post = {admin: payload.id, roomId: roomId, end: 0, date: dt, start: 0};
            let sql = 'INSERT INTO room SET ?';
            db.query(sql, post, err => {
                
                if(err) {
                    throw err;
                }

                return res.json({
                    roomId: roomId,
                    admin: payload.id
                });                
            });
        } else {
            return res.json({
                roomId: result[0].roomId,
                admin: payload.id
            });   
        }
    });
}

exports.getRoom = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let qry = `SELECT room.roomId from room inner join room_players on room.roomId = room_players.roomId WHERE room_players.user_id = ${payload.id} AND room.start = 0 AND room.admin != ${payload.id}`;
    db.query(qry, (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {
            return res.json({
                data: result[0]
            });
        } else {
            return res.json({
                data: 0
            });
        }
    });
}


exports.getPlayers = async (req, res) => {
    const { roomId } =  req.body;
    let sql = `SELECT room_players.id as p_id, users.id, users.name, room_players.place, room_players.percent, users.image, avg_wpm, avg_percent, rank.image as r_image from room_players inner join users on room_players.user_id = users.id inner join rank on users.rank = rank.id WHERE room_players.roomId = '${roomId}'`;
    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        res.json({
            data: result
        });
    });
}

exports.getAllRooms = async (req, res) => {
    let sql = `SELECT room.roomId, users.name, users.image, users.id, rank.image as r_image from room inner join users on room.admin = users.id inner join rank on users.rank = rank.id WHERE room.start = 0`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        res.json({
            data: result
        });
    });
}

exports.checkRoom = async (req, res) => {
    const { roomId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    let sql = `SELECT room.id from room inner join room_players on room.roomId = room_players.roomId WHERE room_players.user_id = ${payload.id} AND room.end = 0 AND room.start = 1`;
    db.query(sql, (err, result) => {
        if(err) {
            throw err;
        }
        console.log(result);
        res.json({
            data: result.length
        });
    });

}

exports.getAllPlayers = async (req, res) => {
    let sql = `SELECT COUNT(*) as total, roomId FROM room_players GROUP BY roomId`;
    db.query(sql, (err, result) => {
        if(err){ 
            throw err;
        }
        res.json({
            data: result
        });
    });
}