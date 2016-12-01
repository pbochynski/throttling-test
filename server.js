const http = require('http');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var Throttle = require('throttle');


const server = http.createServer((req, res) => {
    console.log("Request received");
    var jsonStream = req.pipe(new Throttle(100000))
        .pipe(JSONStream.parse('*'))
        .pipe(es.map(function (data, callback) {
            if (data.seq % 100 === 0) {
                console.log(JSON.stringify(data));
            }
            return callback(null, data);
        }));
    jsonStream.on('end', ()=> {
        console.log("Request processed");
        res.end();
    });

});
server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(process.env.PORT || 9090);