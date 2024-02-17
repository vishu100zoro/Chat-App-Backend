const express = require('express');
const app=express();
const userRoutes= require('./routes/userRoutes');
require('dotenv').config();
const rooms=['general','tech','finance','crypto'];
const cors= require('cors');
// const { Socket } = require('socket.io');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
const {connectDB} =require('./connection.js');
// const { socket } = require('../chat-frontend/src/context/appContext.jsx');
const Message = require('./models/Message.js');
const User = require('./models/user.js');
connectDB();



const server=require('http').createServer(app);
const PORT=5001;
const io = require('socket.io')(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }
  });
  



app.get('/rooms',(req,res)=>{
    res.json(rooms);
})


app.get('/',(req,res)=>{
    res.json("working server");
})

async function getLastMessagesFromRoom (room){
    let roomMessages = await Message.aggregate([
        {$match:{to:room}},
        {$group:{_id:'$date',messageByDate:{$push:'$$ROOT'}}}
    ])
    return roomMessages;
}

function sortRoomMessageByDate(Message){
    return Message.sort(function(a, b){
        let date1=a._id.split('/');
        let date2=b._id.split('/');
        date1=date1[2]+date1[0]+date1[0];
        date2=date2[2]+date2[0]+date2[0];
        return date1<date2 ? -1:1
    })
}

io.on('connection',(socket)=>{

    socket.on('new-user',async()=>{
        const members=await User.find();
        io.emit('new-user',members);
    })

    socket.on('join-room',async(newRoom,previousRoom)=>{
        socket.join(newRoom);
        socket.leave(previousRoom);
        let roomMessages=await getLastMessagesFromRoom(newRoom);
        roomMessages=sortRoomMessageByDate(roomMessages);
        socket.emit('room-messages', roomMessages);
    });

    socket.on('message-room',async(room,content,sender, time, date)=>{
        console.log('new-message', content);
        const newMessages=await Message.create({content,from:sender,time,date,to:room});
       
        let roomMessages=await getLastMessagesFromRoom(room);
        roomMessages=sortRoomMessageByDate(roomMessages);

        io.to(room).emit('room-messages',roomMessages);
        socket.broadcast.emit('notifications',room);
    })

    app.delete('/logout', async(req, res)=>{
        try {
    
            // console.log("runuiii");
            const {_id, newMessages}= req.body;
            // console.log(req.body);
            const user= await User.findById(_id);
            user.status="offline";
            user.newMessage=newMessages;
            await user.save();
            const member=await User.find();
            socket.broadcast.emit('new-user', member);
            res.status(200).send();
    
        } catch (e) {
           console.log(e); 
           res.status(500).send();
        }
    })
})


server.listen(PORT,()=>{
    console.log('listining to port',PORT);
})