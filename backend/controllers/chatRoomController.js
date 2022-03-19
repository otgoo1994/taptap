const mongoose = require("mongoose");
const auth = require("../middlewares/auth");
const Chatroom = mongoose.model("Chatroom");
const Message = mongoose.model('Message');
const User  = mongoose.model('User');


exports.createChatroom = async (req, res) => {
  const { name, user, operator } = req.body;

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) {
    const roomMessages = await Message.find({ chatroom: name}).populate('user');

  //   const newMessage = new Message({
  //     chatroom: name,
  //     user: user,
  //     message: 'this is dashka sms!!',
  //     operator: operator,
  //   });
  //  newMessage.save();
  //  return 'asdfasdf'; 

    return res.json({roomMessages});
  }

  const chatroom = new Chatroom({
    name,
    operator,
    user
  });

  await chatroom.save();

  return res.json({
    message: "Chatroom created!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({}).populate('user');
  const messages = await Message.aggregate([
    {
      $group: {
        _id:"$chatroom",
        message: {
          $last: '$message'
        },
        seen: {
          $last: '$seen'
        },
        chatroom: {
          $last: '$chatroom'
        },
        operator: {
          $last: '$operator'
        }
      }
    }
  ]);
  
  res.json({
    status: 200,
    chatrooms: chatrooms,
    messages: messages
  });
};

exports.roomChats = async (req, res) => {
  const {roomId} = req.params;
  const roomMessages = await Message.find({ chatroom: roomId}).populate('user').populate('operator');
  // roomMessages.map(message => {
  //   res.json({message})
  // })
  res.json({roomMessages})
};