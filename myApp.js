var http = require('http');
var url = require('url');
var fs = require('fs');
var uc = require('upper-case');
var formidable = require('formidable');
var events = require('events');
var EventEmitter = require('events');
var nodemailer = require('nodemailer');
var myCalc = require('./modules/myfirstmodule');
http.createServer(function (req, res) {
  // sending 200
  res.writeHead(200, {'Content-Type': 'text/html'});
  // writing in response
  res.write('<h3>Hello World!</div>');
  // Using a Module
  res.write('<p>'+String(myCalc.square(5))+'</p>');
  // http module create server req
  res.write('<p>'+req.url+'</p>');
  // working with url module
  var q = url.parse(req.url,true).query;
  res.write('<p>'+JSON.stringify(q)+'</p>');
  // working with file module
  fs.readFile('./myfile.txt',function(err,data){
    //console.log(data);
    if(err) throw err;
  });
  fs.appendFile('./myfile.txt','hello\n',function(err){
    if(err) throw err;
    console.log('saved');
  })
  // using npm to install a module (cli)
  res.write('<p>'+uc.upperCase('Hello World!')+'</p>');
  // working with event module
  var eventEmitter = new EventEmitter();
  var myEventHandler = function(v1,v2){
    console.log('Shut up!');
    console.log(v1);
    console.log(v2);
  }
  eventEmitter.on('scream',myEventHandler);
  eventEmitter.emit('scream','heeeeeee','sooooo');
  // File uploading
  if(req.url=='/fileupload'){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
      if(err) throw err;
      var oldpath = files.filetoupload.filepath;
      var newpath = './files/'+files.filetoupload.originalFilename;
      fs.rename(oldpath,newpath,function(err){
        if(err) throw err;
        res.write('<p>'+'file uploaded and moved!'+'</p>')
      })
    });
  }else{
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
  }
  // sending Email
  if(req.url=='/Email'){
    var transport = nodemailer.createTransport({
      service: 'yahoo',
      secure: true,
      aut: {
        user: 'habib.8888@yahoo.com',
        pass: 'yahoo4412'
      }
    });
    var opt = {
      from: 'habib.8888@yahoo.com',
      to: 'hzare1990@gamil.com',
      subject: 'تست نود',
      text: 'درود!'
    };
    transport.sendMail(opt,function(err,info){
      if(err) throw err;
      console.log(info.response);
    });
  }
  res.end();
}).listen(8080);