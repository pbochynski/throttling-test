var request = require('request');
var Generator = require('./generator');
var localUrl = "http://localhost:9090";
/*
 var hcpServiceUrl = "https://throttling-test.cfapps.us10.hana.ondemand.com";
 var bluemixServiceUrl = "https://throttling-test.eu-gb.mybluemix.net";
 var pivotalServiceUrl = "https://throttling-test.cfapps.io/";
 var herokuServiceUrl = "https://arcane-depths-87484.herokuapp.com";
 */

var url = process.argv[2] || localUrl;

function importData() {
    var stream = new Generator(null, 200000);
    var options = {
        headers: {'content-type': 'application/json'}
    };
    if (process.argv[3]) {
        options.headers.host =process.argv[3];
    }
    stream.pipe(request.post(url, options , function (err, response, body) {
            if (err) throw err;
            console.log(response.statusCode);
            console.log(body);
        }
    ));
}

importData();

