/**
 * Created by ygintsyak on 01.08.16.
 */

'use strict';
const winston = require('winston');
const RpcChannel = require('./rpc-channel');

class ProjectStub {

    constructor(path) {

        this._path = path;
        this._channel = new RpcChannel();

        var self = this;

        this._channel.setupFunction('Test.echo', (message, callback) => {
            
            winston.info('Inbound echo message:', message);
            console.log('Inbound echo message:', message);
            callback().sendResult(message);
        });
        
        
        winston.add(winston.transports.File, { filename: self._path + '/' + 'project-data.log'});
        winston.remove(winston.transports.Console);
    }

    printHello () {
        console.log("Hello from backend", this._path);
        winston.info("Hello from backend", this._path);
    }
}


module.exports = ProjectStub;
