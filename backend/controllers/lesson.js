const db = require("../config/db");
const fs = require('fs');


const sha256 = require("js-sha256");
const jwt = require('jwt-then');
const { checkRoom } = require("./roomController");

const getAll = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let lessons = `SELECT * from lesson ORDER BY lvl ASC`;
    let userLesson = `SELECT u.id, u.lessonId, u.score, u.wpm, u.accuracy from user_lesson as u inner join lesson as l on l.id = u.lessonId where u.userId = ${payload.id}`;
    let lessonGroup = `SELECT * from lesson_group`;
    let user = `SELECT lesson from users WHERE id = ${payload.id}`;
    let userStar = `SELECT ul.score FROM users as u inner join user_lesson as ul on u.id = ul.userId inner join lesson as l on ul.lessonId = l.id WHERE u.id = ${payload.id}`;
    db.query(lessons, async (err, result) => {
        if(err) {
            throw err;
        }
        db.query(userLesson, async (err, userlesson) => {
            if (err) {
                throw err;
            }
            db.query(lessonGroup, async (err, lessonGroup) => {
                if (err) {
                    throw err;
                }
                db.query(user, async (err, userl) => {
                    if(err) {
                        throw err;
                    }
                    db.query(userStar, async (err, star) => {
                        if(err) {
                            throw err;
                        }
                        res.json({
                            lesson: result,
                            userlesson,
                            lessonGroup,
                            user: userl[0],
                            star: star,
                            result: 200
                        });
                    });
                    
                });
            });

        });
    });
}

const nextLesson = async (req, res) => {
    const { level } = req.body;

    const next_lesson = `SELECT id, type from lesson WHERE lvl = ${level}`;
    db.query(next_lesson, async (err, result) => {
        if(err) {
            throw err;
        }

        if (result.length > 0) {
            res.json({
                result: 200,
                data: result[0]
            });
        } else {
            res.json({
                result: 'fail'
            });
        }
    });
}

const selectedLesson = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');

    const { id } = req.body;
    
    let lesson = `SELECT text, lvl, type, groupId, holdword, url, lessonname from lesson WHERE id = ${id}`;
    db.query(lesson, async (err, result) => {
        if(err) {
            throw err;
        }
        
        if(result.length > 0) {
            let user = `SELECT lesson from users WHERE id = ${payload.id}`;
            db.query(user, async (err, userless) => {
                if(err) {
                    throw err;
                }
                // console.log("===========",userless);
                if(result[0].lvl > userless[0].lesson + 1) {
                    res.json({
                        result: 'fail'
                    });
                } else {
                    let group = `SELECT wpm, groupName from lesson_group WHERE id = ${result[0].groupId}`;
                    db.query(group, async(err, gr) => {
                        if (err) {
                            throw err;
                        }

                        if(result[0].lvl > 51) {
                            // let dt = new Date().toISOString();
                            let qry = `SELECT id from users WHERE id = ${payload.id} AND end_at >= NOW()`;
                            db.query(qry, async (err, checkD) => {
                            if(err) {
                                throw err;
                            }
                            console.log(checkD);
                            if(checkD.length > 0) {
                                res.json({
                                    result: 200,
                                    data: result[0],
                                    group: gr[0]
                                });
                            } else {
                                res.status(402).json({
                                    message: "Payment required"
                                });
                            }
                            });
                        } else {
                            res.json({
                                result: 200,
                                data: result[0],
                                group: gr[0]
                            });
                        }
                    });
                }
            });
        } else {
            res.json({
                result: 'fail'
            });
        }
    });
}

const updateUserLesson = async (req, res) => {
    const { wpm, accuracy, score, lessonId, level } = req.body;
    console.log(wpm);
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    let user = `SELECT score from user_lesson WHERE lessonId = ${lessonId} AND userId = ${payload.id}`;
    db.query(user, async (err, result) => {
        if(err) {
            throw err;
        }
        if(result.length > 0) {
            let checkLesson = `SELECT lesson from users WHERE id = ${payload.id}`;
            db.query(checkLesson, async (err, userles) => {
                if(err) {
                    throw err;
                }
                // console.log(userles[0].lesson < level);
                if(userles[0].lesson < level) {
                    let user = `UPDATE users SET lesson = ${level} WHERE id = ${payload.id}`;
                    db.query(user, async err => {
                        if(err) {
                            throw err;
                        }
                        if( score > result[0].score) {
                            var diff_score = score - result[0].score;
                            let updt = `UPDATE user_lesson SET score = ${score}, wpm = ${wpm}, accuracy = ${accuracy} WHERE userId = ${payload.id} AND lessonId = ${lessonId}`;
                            db.query(updt, async err => {
                                if(err) {
                                    throw err;
                                }
                                let point = `SELECT point from users where id = ${payload.id}`;
                                db.query(point, async (err, result) => {
                                    if(err) {
                                        throw err;
                                    }
                                    let rank = 1;
                                    let pt = parseInt(result[0].point) + diff_score;
            
                                    if(pt > 7999 && pt < 15000) {
                                        rank = 2;
                                    } else if(pt > 14999 && pt < 30000) {
                                        rank = 3;
                                    } else if(pt > 29999 && pt < 50000) {
                                        rank = 4;
                                    } else if(pt > 50000) {
                                        rank = 5;
                                    }
                                    
                                    let upScore = `UPDATE users SET rank = ${rank}, point = ${pt} WHERE id = ${payload.id}`;
                                    db.query(upScore, async err => {
                                        if(err) {
                                            throw err;
                                        }
                                        res.json({
                                            result: 'success',
                                            point: pt
                                        });
                                    });
            
                                })
                            });
                        } else {
                            res.json({
                                result: 'success',
                                point: 0
                            });
                        }
                    });
                } else {
                    if( score > result[0].score) {
                        var diff_score = score - result[0].score;
                        let updt = `UPDATE user_lesson SET score = ${score}, wpm = ${wpm}, accuracy = ${accuracy} WHERE userId = ${payload.id} AND lessonId = ${lessonId}`;
                        db.query(updt, async err => {
                            if(err) {
                                throw err;
                            }
                            let point = `SELECT point from users where id = ${payload.id}`;
                            db.query(point, async (err, result) => {
                                if(err) {
                                    throw err;
                                }
                                let rank = 1;
                                let pt = parseInt(result[0].point) + diff_score;
        
                                if(pt > 7999 && pt < 15000) {
                                    rank = 2;
                                } else if(pt > 14999 && pt < 30000) {
                                    rank = 3;
                                } else if(pt > 29999 && pt < 50000) {
                                    rank = 4;
                                } else if(pt > 50000) {
                                    rank = 5;
                                }
                                
                                let upScore = `UPDATE users SET rank = ${rank}, point = ${pt} WHERE id = ${payload.id}`;
                                db.query(upScore, async err => {
                                    if(err) {
                                        throw err;
                                    }
                                    res.json({
                                        result: 'success',
                                        point: pt
                                    });
                                });
        
                            })
                        });
                    } else {
                        res.json({
                            result: 'success',
                            point: 0
                        });
                    }
                }
            });
            
        } else {
            let post = {userId: payload.id, score, wpm, accuracy, lessonId}
            let sql = 'INSERT INTO user_lesson SET ?';
            db.query(sql, post, err => {
                if(err) {
                    throw err;
                }
                let checkLesson = `SELECT lesson from users WHERE id = ${payload.id}`;
                db.query(checkLesson, async (err, userles) => {
                    if(err) {
                        throw err;
                    }
                    if(userles[0].lesson < level) {
                        let user = `UPDATE users SET lesson = ${level} WHERE id = ${payload.id}`;
                        db.query(user, async (err, result) => {
                            if(err) {
                                throw err;
                            }
                            let point = `SELECT point from users where id = ${payload.id}`;
                            db.query(point, async (err, result) => {
                                if(err) {
                                    throw err;
                                }
                                let rank = 1;
                                let pt = parseInt(result[0].point) + score;
        
                                if(pt > 7999 && pt < 15000) {
                                    rank = 2;
                                } else if(pt > 14999 && pt < 30000) {
                                    rank = 3;
                                } else if(pt > 29999 && pt < 50000) {
                                    rank = 4;
                                } else if(pt > 50000) {
                                    rank = 5;
                                }
                                
                                let upScore = `UPDATE users SET rank = ${rank}, point = ${pt} WHERE id = ${payload.id}`;
                                db.query(upScore, async err => {
                                    if(err) {
                                        throw err;
                                    }
                                    res.json({
                                        result: 'success',
                                        point: pt
                                    });
                                });
        
                            })
                        });
                    } else {
                        let point = `SELECT point from users where id = ${payload.id}`;
                            db.query(point, async (err, result) => {
                                if(err) {
                                    throw err;
                                }
                                let rank = 1;
                                let pt = parseInt(result[0].point) + score;

                                if(pt > 7999 && pt < 15000) {
                                    rank = 2;
                                } else if(pt > 14999 && pt < 30000) {
                                    rank = 3;
                                } else if(pt > 29999 && pt < 50000) {
                                    rank = 4;
                                } else if(pt > 50000) {
                                    rank = 5;
                                }
                                
                                let upScore = `UPDATE users SET rank = ${rank}, point = ${pt} WHERE id = ${payload.id}`;
                                db.query(upScore, async err => {
                                    if(err) {
                                        throw err;
                                    }
                                    res.json({
                                        result: 'success',
                                        point: pt
                                    });
                                });

                            })
                    }
                });
                
            });
        }
    });

}


module.exports = {
    updateUserLesson,
    selectedLesson,
    nextLesson, 
    getAll,
}