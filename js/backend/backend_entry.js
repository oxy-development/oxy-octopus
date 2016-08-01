/**
 * Created by ygintsyak on 01.08.16.
 */

'use strict';
var winston = require('winston');

class ProjectStub {

    constructor(path) {
        this.path = path;
        winston.add(winston.transports.File, { filename: this.path + 'temp/project-data.log' });
        winston.remove(winston.transports.Console);
    }

    printHello () {
        winston.log("Hello from backend", this.path);
    }
}


module.exports = ProjectStub;
