var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);


var port = process.env.port || 3000;
var actual = ''

//configuracion de la base de datos
// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'dbtest'
// });
//conexion a la base de datos
// connection.connect(function(err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
 
//   console.log('Conectado a la base de datos :D');
// });

let sql = "INSERT INTO imagen(b64,temperatura,humedad) VALUES ('sdfsdf','asdasd','asdasfgg')"

app.use(express.static(__dirname + "/public" ));

app.get('/',function(req,res){
res.redirect('index.html');
});

io.on('connection',function(socket){

    console.log('Usuario conectado')
    socket.on('stream',function(image){
        actual=image
        socket.broadcast.emit('stream',image);  
    });

    socket.on('test',function(imagen){
        console.log('Guardando foto')
        console.log('La temperatura es: '+imagen)
        var fecha = new Date().toISOString().slice(0,10)        
        sql="INSERT INTO imagens(b64,temperatura,humedad,fecha) VALUES ('"+actual+"','"+imagen.toString()+"','50','"+fecha+"')"
        connection.query(sql);
    })

});

http.listen(port,function(){
console.log("Server running at port "+ port);
});