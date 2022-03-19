const mysql = require('mysql');
let timer = null;
let time_left = 0;
let time_passed = 0;
let start = false;
let end = false;
let currentRoomId;

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


db.connect(err => {
  if(err) {
    throw err
  }
  console.log('My sql connected');
});

const app = require('./app');
const port = 8001;
const server = app.listen(process.env.PORT || port, () => {
    console.log(`Server listening on port ${port}`);
});


const io = require("socket.io")(server);
const jwt = require("jwt-then");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, 'HS256');
    socket.userId = payload.id;
    next();
  } catch (err) {}
});


var timerstart = function () {
  start = true;
  time_left = 180;
  time_passed = 0;
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

var finishGame = function() {
  clearInterval(timer);
  let sql = `UPDATE room set end = 1 WHERE roomId = '${currentRoomId}'`;
  db.query(sql, (err, result) => {
    if(err) {
      throw err;
    }
    io.to(currentRoomId).emit('endGame', {
      end: true
    });
  });
}

var updateTimer =  function () {
  if(start == false) {
    io.to(currentRoomId).emit('Interval', {
      start: false,
      time_left: time_left,
      time_passed: time_passed
    });
  } else {
    io.to(currentRoomId).emit('Interval', {
      start: true,
      time_left: time_left,
      time_passed: time_passed
    });
  }

  if (time_left > 0) {
      time_left--;
      time_passed++;
  }
  else {
      if(start == false) {
          timerstart();
      } else {
          finishGame();
      }
  }
}

var timerbegin = function() {
    time_left = 5;
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
}

io.on("connection", (socket) => {

  let sql = `UPDATE users SET online = true WHERE id = ${socket.userId}`;
  db.query(sql, err => {
    if(err) {
      throw err;
    }
    console.log(`${socket.userId} user is online now.`);
  });

  let user = `SELECT name, email, id, image, online from users WHERE id = ${socket.userId}`;
  db.query(user, (err, result) => {
    if(err) {
      throw err;
    }
    if(result.length > 0) {
      io.emit("onlineUser", {
        user: result[0]
      });
    } else {
      console.log('is it admin??');
    }
  });
  

  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    socket.disconnect();
    let sql = `UPDATE users SET online = false WHERE id = ${socket.userId}`;
    db.query(sql, err => {
      if(err) {
        throw err;
      }
      console.log(`${socket.userId} user is offline now.`);
    });

    io.emit("offlineUser", {
      id: socket.userId,
    });

    console.log("Disconnected: " + socket.userId);
  });

  socket.on("leaveRoom", ({roomId}) => {
    let delt = `DELETE from room_players WHERE user_id = ${socket.userId}`;
    db.query(delt, (err, result) => {
      if(err) {
        throw err;
      }
      socket.leave(roomId);
      console.log("A user left chatroom: " + roomId);

      io.to(roomId).emit("leavePlayer", {
        user: socket.userId
      });
    });
  });

  socket.on("joinRequest", ({roomId}) => {
    let user = `SELECT name, id from users where id = ${socket.userId}`;
    db.query(user, (err, result) => {
      if(err) {
        throw err;
      }
      io.to(roomId).emit("joinRequestFromUser", {
        roomId: roomId,
        user: result[0].name,
        userId: result[0].id
      });
    })
    
  })



  socket.on("AcceptJoinRequest", ({roomId, user}) => {
    io.emit("acceptedRequest", ({
      user: user,
      roomId: roomId
    }));
  })

  socket.on("startGame", ({roomId, language}) => {
    console.log(language);
    currentRoomId = roomId;
    time_left = 0;
    time_passed = 0;
    start = false;
    timerbegin();
    let word = `SELECT id from race_text WHERE lang = '${language}' ORDER BY RAND() LIMIT 1`;
    db.query(word, (err, result) => {
      if(err) {
        throw err;
      }
      console.log(result);
      let updt = `UPDATE room SET textId = ${result[0].id}, start = 1 WHERE roomId = ${roomId}`;
      db.query(updt, err => {
        if(err) {
          throw err;
        }
        io.to(roomId).emit("start", {
          data: 'success'
        });
      });
    });
  })

  socket.on("deleteRoom", ({roomId}) => {
    let sql = `SELECT id, roomId from room WHERE admin = ${socket.userId} AND start = 0`;
    let room;
    db.query(sql, (err, result) => {
      if(err) {
        throw err;
      }
      if(result.length > 0) {
        room = result[0].roomId;

        let del1 = `DELETE FROM room WHERE roomId = '${room}'`;
        db.query(del1, (err, result) => {
          if(err){
            throw err;
          }
          let del2 = `DELETE FROM room_players WHERE roomId = '${room}'`;
          db.query(del2, (err, result) => {
            if(err) {
              throw err;
            }
            io.to(room).emit('deleteRoom', {
              roomId: room
            });

            io.emit('deletedRoom', {
              roomId: roomId
            });
          });
        });
      }
    });
  });

  socket.on("write", ({roomId, percent}) => {
    let sql = `UPDATE room_players set percent = ${percent} where roomId = '${roomId}' AND user_id = ${socket.userId}`;
    db.query(sql, (err, result) => {
      if(err) {
        throw err;
      }
      io.to(roomId).emit('onWrite', {
        user: socket.userId,
        percent: percent
      });
    });
  });

  socket.on("finishPlayer", ({roomId, wpm, percent}) => {

    let sql = `select MAX(place) as place from room_players where roomId = '${roomId}'`;
    db.query(sql, (err, result) => {
      if(err) {
        throw err;
      }
      let place = result[0].place + 1;
      let updt = `UPDATE room_players SET place = ${place}, wpm = ${wpm} WHERE roomId = '${roomId}' AND user_id = ${socket.userId} AND place = 0`;
      db.query(updt, err => {
        if(err) {
          throw err;
        }

        let check = `SELECT record_wpm, avg_wpm, avg_percent, rank, point from users where id = ${socket.userId}`;
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

          let pt = 0;
          if(place == 1) {
            pt = 5;
          } else if(place == 2) {
            pt = 4;
          } else if(place == 3) {
            pt = 3;
          } else if(place == 4) {
            pt = 2;
          } else if(place == 5) {
            pt = 1;
          }

          let point = parseInt(result[0].point) + parseInt(pt);
          let rank = 1;
          if(point > 999 && point < 3000) {
            rank = 2;
          } else if(point > 2999 && point < 5000) {
            rank = 3;
          } else if(point > 4999 && point < 10000) {
            rank = 4;
          } else if(point > 10000) {
            rank = 5;
          }

          let updt = `UPDATE users SET record_wpm = ${record_wpm}, avg_wpm = ${avg_wpm}, avg_percent = ${avg_p}, rank = ${rank}, point = ${point} WHERE id = ${socket.userId}`;
          db.query(updt, (err, result) => {
            if(err) {
              throw err;
            }
          });

          io.to(roomId).emit("onFinish", {
            user: socket.userId,
            place: place,
            rank: rank,
            point: point
          });

        });

      });
    });
  })

  socket.on("ignoreRoom", ({roomId, userId}) => {
    let sql = `SELECT name from users WHERE id = ${socket.userId}`;
    db.query(sql, (err, result) => {
      if(err) {
        throw err;
      }
      io.to(roomId).emit('ignoredRoom', {
        user: result[0].name,
        from: userId,
        fromId: socket.userId
      });
    });    
  })
  
  socket.on("joinRoom", ({ roomId }) => {

    let check = `SELECT count(id) as count from room_players where roomId = '${roomId}'`;
    db.query(check, (err, result) => {
      if(err) {
        throw err;
      }
      if(result[0].count < 5) {
        let slt = `SELECT id from room_players WHERE user_id = ${socket.userId} AND roomId = '${roomId}'`;
        db.query(slt, (err, result) => {
          if(err) {
            throw err;
          }
          if(result.length === 0) {
            let post = {roomId: roomId, user_id: socket.userId, place: 0};
            let sql = 'INSERT INTO room_players SET ?';
            db.query(sql, post, err => {
              if(err) {
                throw err;
              }
            });
          }
    
          socket.join(roomId);  
    
          let qry = `SELECT COUNT(*) as total, roomId FROM room_players WHERE roomId = '${roomId}'`;
          db.query(qry, (err, result) => {
            if(err) {
              throw err;
            }
            console.log(result);
            io.emit("newRoomPlayers", {
              data: result[0]
            });
    
          });
    
          console.log(socket.userId+" user a joined the room " + roomId);
        });
    
        let user = `SELECT users.image, users.name, users.id, users.avg_wpm, users.avg_percent, rank.image as r_image from users inner join rank on users.rank = rank.id WHERE users.id = ${socket.userId}`;
    
        db.query(user, (err, result) => {
          if(err) {
            throw err;
          }
          io.to(roomId).emit("newPlayer", {
            user: result[0]
          });
        });
      }
    });
    
  });

  socket.on("raceNotify", ({raceId, users}) => {
    console.log("incoming from socket", raceId);
    io.emit("raceNotify", {
      raceId,
      users
    });
  })

  socket.on("inviteTo", ({roomId, to}) => {
    let slt = `SELECT name from users WHERE id = ${socket.userId}`;
    db.query(slt, (err, result) => {
      if(err) {
        throw err;
      }
      io.emit("inviteGame", {
        to: to,
        from: result[0].name,
        fromId: socket.userId,
        roomId: roomId
      });
      console.log("invite player " + to);
    });
    
  });

  socket.on("createdRoom", ({roomId}) => {
    let sql = `SELECT room.roomId, users.name, users.image, users.id, rank.image as r_image from room inner join users on room.admin = users.id inner join rank on users.rank = rank.id WHERE room.roomId = '${roomId}'`;
    db.query(sql, (err, result) => {
      if(err) {
        throw err;
      }
      io.emit("newRoom", {
        data: result[0]
      });
    });
  });

});