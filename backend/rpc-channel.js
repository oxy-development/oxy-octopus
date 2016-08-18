/**
 * Created by ygintsyak on 09.08.16.
 */

'use strict';
const electron = require('electron');
const ipcMain = electron.ipcMain;
const winston = require('winston');


/**
 * RPC reply callback object
 */
class RpcReplyCallback {

    constructor(event, id) {
        this._id = id;
        this._event = event;
    }


    __send_reply(obj) {
        this._event.sender.send('asynchronous-reply', JSON.stringify(obj));
    }


    /**
     * Respond with something
     * @param object {object}
     */
    sendResult(object) {

        this.__send_reply({
            result: object,
            id: this._id,
            jsonrpc: '2.0'
        });
    }
    
    
    /**
     * Respond with error
     * @param code {number} error code
     * @param message {string} error message
     */
    sendError(code, message) {

        this.__send_reply({
            error: { code: code, message: message },
            id: this._id,
            jsonrpc: '2.0'
        });
    }
}


class RpcChannel {
    
    static linkToChannel(channel, handlers) {

        channel.on('asynchronous-message', (event, arg) => {

            let result = '';
            try {
                const obj = JSON.parse(arg);
                const f = handlers.get(obj.method);


                if (f) {

                    try {
                        f(obj.params, () => new RpcReplyCallback(event, obj.id));
                    } catch (err) {

                        winston.error(`Internal error on query: ${arg} - with error ${err}`);
                        new RpcReplyCallback(event, obj.id).sendError(-32603, 'Internal error');
                    }

                } else {
                    winston.error(`Invalid inbound query: ${arg} - no method found`);
                    new RpcReplyCallback(event, obj.id).sendError(-32601, 'Method not found');
                }

            } catch (error) {

                new RpcReplyCallback(event, event).sendError(-32700, 'Parse error');
                winston.error(`Invalid inbound query: ${arg} - error: ${error}`);
            }
        });
    }


    constructor() {
        this._channelHandlers = new Map();
        RpcChannel.linkToChannel(ipcMain, this._channelHandlers);
    }


    /**
     * This should setup new JSON-RPC Message handler.
     * @param name {string}
     * @param f {function}
     */
    setupFunction(name, f) {
        this._channelHandlers.set(name, f);
    }
}


module.exports = RpcChannel;