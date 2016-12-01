var request = require('request');
var Generator = require('./generator');
var serviceUrl = "https://throttling-test.eu-central.cf.yaas.io";
var hcpServiceUrl = "https://throttling-test.cfapps.us10.hana.ondemand.com";
var bluemixServiceUrl = "https://throttling-test.eu-gb.mybluemix.net";
var pivotalServiceUrl = "https://throttling-test.cfapps.io/";
var herokuServiceUrl = "https://arcane-depths-87484.herokuapp.com";

function importData() {
    var stream = new Generator(null, 200000);
    stream.pipe(request.post(herokuServiceUrl, {
            headers: {'content-type': 'application/json'}
        }, function (err, response, body) {
            if (err) throw err;
            console.log(response.statusCode);
            console.log(body);
        }
    ));
}


importData();

