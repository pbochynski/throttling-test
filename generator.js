const Readable = require('stream').Readable;
var SEQ = 0;

function randomDoc() {
    return JSON.stringify({ data: "blahblahblah... not important.... just check seq attribute....", seq: SEQ++});
}

module.exports = class Generator extends Readable {
    constructor(opt, max) {
        super(opt);
        this._max = max;
        this._index = 0;
        this._timestamp = new Date().getTime();
    }

    _read() {
        var i = this._index++;
        if (i >= this._max) {
            this.push("]");
            this.push(null);
            console.log("Generator job is done")

        } else if (i == 0) {
            this.push(Buffer.from("["+randomDoc(), 'ascii'));
        }
        else {
            var buf = Buffer.from(","+randomDoc(), 'ascii');
            if (i%10000 == 0) {
                console.log("generated %s records, speed: %s", i, 10000000/(new Date().getTime()-this._timestamp));
                this._timestamp = new Date().getTime();
            }
            this.push(buf);
        }
    }
}


