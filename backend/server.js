const db = require("./config/db");
const query = require("./config/query");
const exec = require("./config/promise");

const params = {
  timer: null
}

const method = {
  updateTime: async function() {
    const string = `UPDATE orders SET status = 'CANCELED' WHERE end_at < NOW() AND status = 'PENDING'`;
    await exec.execute(string);
  }
}

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

params.timer = setInterval(method.updateTime, 3600000);