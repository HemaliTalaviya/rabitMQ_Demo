const express = require('express');
const http = require('http');
const amqp = require('amqplib/callback_api')
const app = express();
const server = http.createServer(app);
const port = 4000


app.get('/user', async (req, res) => {
    let data = {
        id: 1,
        name: 'user',
        age: 70
        }   
        amqp.connect('amqp://localhost',function(err,conn){
          conn.createChannel(function(err,ch){
            const queue = 'message_queue_user'
            const msg = JSON.stringify(data);
            ch.assertQueue(queue,{durable:false})
            ch.sendToQueue(queue,Buffer.from(msg));
            console.log(`sent ${msg} to ${queue}`)
          })
        })

        res.send('Message from user Service')

    })

    server.listen(port, () => console.log('user service started on port..', port));

