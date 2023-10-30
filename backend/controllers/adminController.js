const fs = require('fs');
const query = require("../config/query");
const exec = require("../config/promise");


const sha256 = require("js-sha256");
const jwt = require('jwt-then');

const createCoupon = async (req, res) => {
  const { count, type } = req.body;

  let index = 0, insert = '';
  const coupons = await exec.execute('SELECT coupon from coupons');
  const arr = [];

  coupons.forEach(element => {
    arr.push(element.coupon);
  });

  while (index < count) {
    let coupon = Math.random().toString(36).slice(-6).toUpperCase() + Math.random().toString(36).slice(-6).toUpperCase();
    let ch = arr.includes(coupon);
    if(!ch) {
      if(insert == '') {
        insert += `('','${coupon}',1,0,${type})`;
      } else {
        insert += `, ('','${coupon}',1,0,${type})`;
      }
      index++;
    }
  }

  const add = await exec.execute(`INSERT INTO coupons VALUES ` + insert);

  if (!add) { 
    res.status(200).json({
      result: 'something went wrong',
      status: 403
    });
    return; 
  }

  res.json({
    result: 'success'
  });

}

const deleteCoupon = async (req, res) => {
  const { id } = req.body;
  let string;
  string = query.delete('coupons', id);

  const coupon = await exec.execute(string);

  if (!coupon) {
    res.status(403).json({
      result: 'something went wrong',
      status: 403
    });
    return; 
  }

  res.status(200).json({
    status: 200
  });
}

const coupons = async (req, res) => {
  let string;
  string = query.getCoupon();
  const coupon = await exec.execute(string);
  
  return res.status(200).json({
    result: 200,
    coupon,
    status: 200
})
}

const register = async (req, res) => {
    // const {email, name, phone, permission, address} = req.body;
    // let qry = `SELECT id FROM admin WHERE email = '${email}'`;
    // db.query(qry, async (err, result) => {
    //     if(err) {
    //         throw err;
    //     }
    //     if(result.length > 0) {
    //         res.json({
    //             result: 'fail',
    //         });
    //     } else {
    //         let img = req.protocol + '://' + req.get('host') + '/images/user/default.png';
    //         let post = {name: name, email: email, password: sha256(phone + process.env.SALT), image: img, address: address, phone: phone, permission: permission }
    //         let sql = 'INSERT INTO admin SET ?';
    //         db.query(sql, post, err => {
    //             if(err) {
    //                 throw err;
    //             }
    //             res.json({
    //                 result: 'success',
    //             });
    //         });
    //     }
    // });
}
const getOrders = async (req, res) => {
  const { date } = req.body;
  let string;
  if (!date) {
    string = query.getOrderList();
  } else {
    string = query.getOrderList(null, date);
  }

  console.log(string, '===');
  const orders = await exec.execute(string);
  
  return res.status(200).json({
    result: 'success',
    data: orders,
    status: 200
  });
}

const checkOrder = async (req, res) => {
  const { invoiceId } = req.body;

    let string = query.selectOrder(invoiceId);
    console.log(string, '======');
    const data = await exec.execute(string);

    if (!data.length) {
        res.json({
            result: 'fail',
            status: 402
        });

        return;
    }

    res.json({
        result: 'success',
        data: data[0],
        status: 200
    });
}

const updateOrder = async (req, res) => {
  const { order } = req.body;
  console.log(order, '====');
}

const login = async (req, res) => {
    const {email, password} = req.body;

    let string;
    string = query.adminLogin(email, password);
    const user = await exec.execute(string);

    if (user.length > 0) {
          const token  = await  jwt.sign({
            id: user[0].id,
            email: user[0].email
          }, 
            'HS256');
          
          return res.status(200).json({
              result: 200,
              user: user[0],
              token,
              status: 200
          })
    }

    return res.status(200).json({
      result: 'fail',
      data: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу',
      status: 400
    });
}

const updateLesson = async (req, res) => {
  const { info, id } = req.body;
  const string = query.updateCurrentLesson(['text', 'type', 'lang', 'lvl', 'holdword', 'url', 'groupId', 'lessonname', 'image'], info);

  const update = await exec.execute(string);

  if (!update) {
    return res.status(200).json({
      status: 403
    })
  }

  return res.status(200).json({
    status: 200
  })

}

const addLesson = async (req, res) => {
  const { info } = req.body;

  let string;
  string = query.getCurrentLvl(info.lvl);
  const level = await exec.execute(string);

  if (level.length > 0) {
    res.status(200).json({
      result: 'duplicated level',
      status: 409
    });

    return;
  }

  console.log(info.type);

  if (info.type === 'pool') {
    info.image = 'pool.png';
  } else {
    info.image = info.type === 'boxed' ? 'practice.png' : (info.type === 'review' ? 'review.png': ( info.type === 'intro' ? 'newword.png' : 
      info.holdword === 'ө' ? 'righthand.png' : 'lefthand.png'
    ))
  }

  if (info.holdword) {
    info.url = info.holdword === 'ө' ? 'lefthand.png' : 'righthand.png';
  }


  string = query.insert('lesson');
  const add = await exec.execute(string, info);

  if (!add) { 
    res.status(200).json({
      result: 'something went wrong',
      status: 403
    });
    return; 
  }

  res.status(200).json({
    result: 'success',
    status: 200
  });
}

const getMaxLvl = async (req, res) => {
  string = query.getMaxLvl();
  const max = await exec.execute(string);

  if (!max) { return; }

  return res.status(200).json({
    result: max,
    status: 200
  })
}

const getCurrentLesson = async (req, res) => {
  const { id } = req.body;
  string = query.getCurrentLesson(id);
  const curr = await exec.execute(string);
  if(!curr.length) {
    return res.status(200).json({
      status: 403
    })
  }

  return res.status(200).json({
    status: 200,
    lesson: curr[0]
  })
}

const deleteLesson = async (req, res) => {
  const { id } = req.body;

  let string;
  string = query.delete('lesson', id);
  const del = await exec.execute(string);

  if (!del) {
    return res.status(200).json({
      status: 403
    })
  }

  return res.status(200).json({
    status: 200
  })
}

module.exports = {
  addLesson,
  login,
  register,
  getMaxLvl,
  deleteLesson,
  coupons,
  createCoupon,
  deleteCoupon,
  getCurrentLesson,
  updateLesson,
  getOrders,
  checkOrder,
  updateOrder
};