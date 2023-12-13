const fs = require('fs');
const query = require("../config/query");
const exec = require("../config/promise");


const sha256 = require("js-sha256");
const jwt = require('jwt-then');


const method = {
  updateUserExpireDate: async function(user, month) {
      let string = query.getUserInfo(user);
      
      const data = await exec.execute(string);
      if (!data.length) {
          return false;
      }

      const dt = new Date(new Date(data[0].end_at).getTime() > Date.now() ? data[0].end_at : Date.now()); 
      console.log(dt, '=====1111'); 

      let date = new Date(
          ( dt ).setDate( dt.getDate() + parseInt(month) )
      ).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      

      string = `UPDATE users SET end_at = '${date}', updated_at = NOW() WHERE id = ${user}`;
      const upt = await exec.execute(string);

      if (!upt) {
          return false;
      }

      return data;
  },
  addLesson: async function(info) {
    if (info.type === 'pool') {
      info.image = 'pool.png';
    } else if(info.type === 'floppy') {
      info.image = 'floppy.png';
    } else if (info.type === 'ninja') {
      info.image = 'ninja.png';
    } else {
      info.image = info.type === 'boxed' ? 'practice.png' : (info.type === 'review' ? 'review.png': ( info.type === 'intro' ? 'newword.png' : 
        info.holdword === 'ө' ? 'righthand.png' : 'lefthand.png'
      ))
    }
  
    if (info.holdword) {
      info.url = info.holdword === 'ө' ? 'lefthand.png' : 'righthand.png';
    }
  
  
    const string = query.insert('lesson');
    return await exec.execute(string, info);
  }
}

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
  const { date, search } = req.body;
  let string;
  if (!date) {
    string = query.getOrderList(null, null, search);
  } else {
    string = query.getOrderList(null, date, search);
  }

  console.log(string, '===');
  const orders = await exec.execute(string);
  
  return res.status(200).json({
    result: 'success',
    data: orders,
    status: 200
  });
}

const getUsers = async (req, res) => {
  const { search } = req.body;

  let string = query.getUserList(search);
  const data = await exec.execute(string);
  return res.status(200).json({
    result: 'success',
    data,
    status: 200
  });
}

const checkOrder = async (req, res) => {
  const { invoiceId } = req.body;

    let string = query.selectOrder(invoiceId);
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

const updateUserInviteStatus = async (req, res) => {
  const {info} = req.body;

  const string = `UPDATE users SET isCanInvite = ${info.invite} WHERE id = ${info.user.id}`;
  const data = await exec.execute(string);

  if (!data) {
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

const updateUserExpiredDate = async ( req, res) => {
  const { info } = req.body;
  
  const user = await method.updateUserExpireDate(info.user.id, info.date);
  if (!user) {
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
  return;
}

const updateOrder = async (req, res) => {
  const { order } = req.body;

  const date = order.type === 1 ? 30 : 90;
  const user = await method.updateUserExpireDate(order.id, date);
  if (!user) {
      res.status(200).json({
        result: 'something went wrong',
        status: 403
      });
      return;
  }

  console.log('======1111');

  const string = `UPDATE orders SET status = 'PAID' WHERE payment_id = '${order.payment_id}'`;
  const update = await exec.execute(string);
1
  if (!update) {
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
  return;
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
  let string;

  string = query.getCurrentLvl(info.lvl);
  const level = await exec.execute(string);

  if (level.length > 0) {
    string = query.updateLessonLevels(info.lvl);
    const level = await exec.execute(string);
    if (!level) {
      res.status(200).json({
        result: 'something went wrong',
        status: 403
      }); 
      return;
    }
  }

  string = query.updateCurrentLesson(['text', 'type', 'lang', 'lvl', 'holdword', 'url', 'groupId', 'lessonname', 'image'], info);
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

  if (info.type === 'video') {
    console.log(req.file, '====');
    return;
  }

  let string;
  string = query.getCurrentLvl(info.lvl);
  const level = await exec.execute(string);

  if (level.length > 0) {
    string = query.updateLessonLevels(info.lvl);
    const level = await exec.execute(string);
    if (!level) {
      res.status(200).json({
        result: 'something went wrong',
        status: 403
      }); 
      return;
    }
  }

  const add = await method.addLesson(info);
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



const getRaceTextList = async (req, res) => {
  let string = query.getSelectedRace(null, true);
  const data = await exec.execute(string);
  

  res.status(200).json({
    result: 'success',
    status: 200,
    data
  });

  return; 
}

const addRaceText = async (req, res) => {
  const { info } = req.body;
  
  
  const params = {
    race_id: Date.now(),
    race_text: info.text,
    max_wpm: 0,
    created_at: new Date(),
    end_at: new Date(),
    pin: '2023',
    title: info.lessonname,
    is_active: 1
  };

  const string = query.insert('t_race');
  const add = await exec.execute(string, params);

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

const deleteRace = async (req, res) => {
  const { id } = req.body;
  const string = query.deleteRace(id);
  const race = await exec.execute(string);

  
  
  if (!race) {
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

const updateRace = async (req, res) => {
  const { state, race_id } = req.body;
  const string = query.updateRace(state, race_id);
  const race = await exec.execute(string);

  if (!race) {
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


module.exports = {
  addLesson,
  updateRace,
  updateUserInviteStatus,
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
  updateOrder,
  getUsers,
  updateUserExpiredDate,
  getRaceTextList,
  addRaceText,
  deleteRace
};