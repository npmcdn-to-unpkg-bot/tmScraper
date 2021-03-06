var fs = require('fs');
var http = require('http');

// Serve client side statically
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/'));
var request = require('request')
var rp = require('request-promise')

var server = http.createServer(app);

// Start Binary.js server
// var BinaryServer = require('binaryjs').BinaryServer;

// link it to express
// var bs = BinaryServer({server: server});

// Wait for new user connections
// bs.on('connection', function(client){

  // Incoming stream from browsers
  // client.on('stream', function(stream, meta){

//     // broadcast to all other clients
//     for(var id in bs.clients){
//       if(bs.clients.hasOwnProperty(id)){
//         var otherClient = bs.clients[id];
//         if(otherClient != client){
//           var send = otherClient.createStream(meta);
//           stream.pipe(send);
//         }
//       }
//     }
//   });
// });

server.listen(9000);
console.log('HTTP on port 9000');

// var url = 'http://concerts.livenation.com/microsite/settlement'
// rp.get(url)
// .then(function(response) {
//   var fileName = './data.html';
//   var stream = fs.createWriteStream(fileName);
//   stream.once('open', function(fd) {
//     stream.end(response);
//   });
// })

var createHtml = function(data) {
  var fileName = './data.html';
  var stream = fs.createWriteStream(fileName);
  stream.once('open', function(fd) {
    stream.end(data);
  });
}
rp.get('http://concerts.livenation.com/json/search/microsite/event/national?site_tmpl=STYLE_C&page_id=721')
.then(function(tmResponse) {
  var data = JSON.parse(tmResponse);
  var docs = data.response.docs;
  var events = docs.map(function(event) {
    var soldOut = {eventName: event.EventName, onSale: event.EventInternetRelease, Venue: event.VenueCityState};
    return soldOut;

  })
  console.log(events);
  // createHtml(names)

})

