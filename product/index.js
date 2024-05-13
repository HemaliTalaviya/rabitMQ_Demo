const express = require('express');
const http = require('http');
const amqp = require('amqplib/callback_api');
const app = express();
const server = http.createServer(app);
const port = 5000

app.get('/products',(req,res)=>{

    amqp.connect('amqp://localhost',function(err,conn){
        if(err) throw err;
        conn.createChannel(function(err,ch){
        if(err) throw err;
            const queue = 'message_queue_user'
            // ch.assertQueue(queue,{durable:false})
            // console.log('waiting from the msg from queue')
            ch.consume(queue, async(msg)=>{
                console.log('Msg',msg.content.toString())
                // ch.ack(msg)
                await res.send(msg.content.toString())
            })
        })
    })

})
server.listen(port,()=>console.log('product service started on port..',port));

