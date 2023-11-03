const nodemailer = require("nodemailer");
const query = require("../config/query");
const sha256 = require("js-sha256");
const jwt = require('jwt-then');
const exec = require("../config/promise");


const LoggedUserInfo = async (req, res) => {
  const payload = await exec.getPayload(req);

  let string = query.getUserInfo(payload.id);
  const user = await exec.execute(string);

  res.status(200).json({
    user: user.length ? user[0] : {}
  })

  return;
}

const facebookLogin = async (req, res) => {
  const { user } = req.body;
  let string;
  string = query.checkFbLogin(user.id);
  const checkuser = await exec.execute(string);

  if (checkuser.length > 0) {
    string = query.checkBlackList(checkuser[0].id);
    const blacklist = await exec.execute(string);
    
    if (blacklist.length > 0) {
      return res.status(200).json({
        result: 'fail',
        data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
        status: 403
      })
    }

    string = query.updateUserProfile(['image'], {image: user.picture.data.url, id: checkuser[0].id});
    const update = await exec.execute(string);

    if (!update) {
      return res.status(200).json({
        status: 403
      })
    }

    string = query.checkFbLogin(user.id);
    const check = await exec.execute(string);
    const token  = await jwt.sign({ id: check[0].id },  'HS256');

    return res.status(200).json({
      result: 'success',
      data: check[0],
      token,
      status: 200
    })
  } else {
    if (!user.email) {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var password = Math.random().toString(36).slice(-8);
      string = query.insert('users');
      let post = {name: user.name, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id, lesson: 1};
      const record = await exec.execute(string, post);
  
      if (!record) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await exec.execute(string);
      const token  = await  jwt.sign({ id: check[0].id, email: check[0].email }, 'HS256');
      
      return res.status(200).json({
          result: 'success',
          data: check[0],
          token,
          status: 200
      })
    }
  
    string = query.checkUserEmail(user.email);
    const email = await exec.execute(string);
    
    if (email.length > 0) {
      string = query.checkBlackList(email[0].id);
      const blacklist = await exec.execute(string);
      if (blacklist.length > 0) {
        return res.status(200).json({
          result: 'fail',
          data: 'Уучлаарай. Таны бүртгэл хар жагсаалтанд орсон байна.',
          status: 403
        })
      }
  
      string = query.updateUserProfile(['image', 'facebook'], {image: user.picture.data.url, id: email[0].id, facebook: user.id});
      console.log(string, '==udpate');
      const update = await exec.execute(string);
      
      if (!update) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await exec.execute(string);
      const token  = await jwt.sign({ id: check[0].id },  'HS256');
  
      return res.status(200).json({
        result: 'success',
        data: check[0],
        token,
        status: 200
      })
  
    } else {
      const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      var password = Math.random().toString(36).slice(-8);
      string = query.insert('users');
      let post = {name: user.name, email: user.email, password: sha256(password + process.env.SALT), image: user.picture.data.url, token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 1, facebook: user.id, lesson: 1}
      const record = await exec.execute(string, post);
  
      if (!record) {
        return res.status(200).json({
          status: 403
        })
      }
  
      string = query.checkFbLogin(user.id);
      const check = await exec.execute(string);
      const token  = await  jwt.sign({ id: check[0].id, email: check[0].email }, 'HS256');
      
      return res.status(200).json({
          result: 'success',
          data: check[0],
          token,
          status: 200
      })
    }
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  let string = query.userLogin(email, password);
  const user = await exec.execute(string);

  if (!user.length) {
    res.json({
      status: 200, 
      result: 'success',
      user: {}
    });

    return;
  }

  const token  = await jwt.sign({ id: user[0].id },  'HS256');
  res.json({
    status: 200, 
    result: 'success',
    user: user[0],
    token
  });
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  string = query.insert('users'); 
  let post = {name, password: sha256(password + process.env.SALT), token: '0', refresh_token: '0', created_at: datetime, updated_at: datetime, end_at: datetime, active: 0, lesson: 0, email};
  const record = await exec.execute(string, post);

  if (!record) {
    res.status(200).json({
      status: 403
    })

    return;
  }

  

  res.status(200).json({
    status: 200
  })

}

const sendVerifyAgain = async (req, res) => {
  const { email } = req.body;
  const token = Math.random().toString(36).slice(-6).toUpperCase();
  
  const data = await exec.sendEmail(email, token);
  if (!data) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }

  let string = `DELETE FROM t_user_verify WHERE email = '${email}'`;
  const del = await exec.execute(string);

  if (!del) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }

  string = query.insert('t_user_verify');
  const params = {email, verify_code: token};
  const add = await exec.execute(string, params);

  if (!add) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }

  res.json({
    result: 'success',
    status: 200
  });
}

const confirmVerifyCode = async (req, res) => {
  const {email, token} = req.body;

  let string = query.confirmVerifyCode(email, token);
  const tk = await exec.execute(string);

  if (!tk.length) {
    res.json({
      result: 'success',
      find: false
    });
    return;
  }

  string = query.activeUserEmail(email);
  await exec.execute(string);

  res.json({
    result: 'success',
    find: true
  });
}

const checkUserEmail = async (req, res) => {
  const { email } = req.body;
  string = query.checkUserEmail(email);
  const user = await exec.execute(string);
  if (!user.length) {
    res.json({
      result: 'success',
      user: []
    });

    return;
  }

  res.json({
    result: 'success',
    user
  });
}

const changePassword = async (req, res) => {
  const { password } = req.body;
  const payload = await exec.getPayload(req);

  console.log(payload.id, password.old);
  let string = query.checkUserInfoWithPassword(payload.id, password.old);
  const check = await exec.execute(string);

  console.log(check, '====');
  if (!check.length) {
    res.json({
      result: 'Forbidden!',
      status: 401
    });

    return;
  }

  string = query.changePassword(password.new, payload.id);
  const update = await exec.execute(string);
  
  if (!update) {
    res.json({
      result: 'failed',
      status: 403
    });

    return;
  }

  res.json({
    result: 'success',
    status: 200
  });
}

const getOrderList = async (req, res) => {
  const payload = await exec.getPayload(req);

  let string = query.getOrderList(payload.id);
  const order = await exec.execute(string);

  res.json({
    result: 'success',
    status: 200,
    order
  });
}

const updateUserInfo = async (req, res) => {
  const { user } = req.body;
  const payload = await exec.getPayload(req);

  let string = query.updateUserInfo(user, payload.id);
  const update = exec.execute(string);
  if (!update) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }
  
  res.json({
    result: 'success',
    status: 200
  });


}

const resetPassword = async (req, res) => {
  const { email } = req.body;

  let string = query.checkUserEmail(email);
  const user = await exec.execute(string);
  if (!user.length) {
    res.json({
      result: 'failed',
      status: 402
    });
    return;
  }

  var password = Math.random().toString(36).slice(-8);

  string = query.resetPassword(email, password);
  const update = await exec.execute(string);

  if (!update) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }

  const data = await exec.sendEmail(email, password, true);
  if (!data) {
    res.json({
      result: 'failed',
      status: 403
    });
    return;
  }

  res.json({
    result: 'success',
    status: 200
  });
}

module.exports = {
  LoggedUserInfo,
  facebookLogin,
  login,
  checkUserEmail,
  register,
  sendVerifyAgain,
  confirmVerifyCode,
  resetPassword,
  changePassword,
  getOrderList,
  updateUserInfo
}