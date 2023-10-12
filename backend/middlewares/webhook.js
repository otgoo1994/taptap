module.exports = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};