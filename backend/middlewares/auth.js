const jwt = require("jwt-then");
const db = require("../config/db");
const query = require("../config/query");
const exec = require("../config/promise");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    req.payload = payload;
    let dt = new Date().toISOString();
    
    const paymentsUrl = ['/get-lesson'];
    let query; 
    if (paymentsUrl.includes(req.path)) {

      const level = await exec.execute('SELECT lvl from lesson WHERE id = ' + req.body.id);
      if (!level.length) {
        return res.status(403).json({
          message: "Forbidden"
        });
      }


      if (level[0].lvl > 60) {
        query = `SELECT id from users WHERE id = ${payload.id} AND end_at >= '${dt}'`;
      } else {
        query = `SELECT id from users WHERE id = ${payload.id}`;
      }
    } else {
      query = `SELECT id from users WHERE id = ${payload.id}`;
    }
    
    const data = await exec.execute(query);
    if (!data) {
      res.status(403).json({
        message: "Forbidden"
      });
      return;
    }

    
    if (!data.length) {
      res.status(402).json({
        message: "Payment required"
      });
      return
    }

    next();

  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};