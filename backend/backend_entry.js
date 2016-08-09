/**
 * Created by ygintsyak on 01.08.16.
 */

'use strict';
var winston = require('winston');

class ProjectStub {

    constructor(path) {

        this._path = path;
        var self = this;
        winston.add(winston.transports.File, { filename: self._path + '/' + 'project-data.log'});
        winston.remove(winston.transports.Console);
    }

    printHello () {
        console.log("Hello from backend", this._path);
        winston.info("Hello from backend", this._path);
    }
}


module.exports = ProjectStub;
