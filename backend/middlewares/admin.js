const jwt = require("jwt-then");
const db = require("../config/db");


module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    req.payload = payload;
    let dt = new Date().toISOString();
    let qry = `SELECT id from admin WHERE id = ${payload.id}`;
    db.query(qry, async (err, result) => {
      if(err) {
        throw err;
      }
      if(result.length > 0) {
        next();
      } else {
        return res.status(401).json({
          message: "admin not found"
        });
      }
    });
  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};