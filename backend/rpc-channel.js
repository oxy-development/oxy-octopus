/**
 * Created by ygintsyak on 09.08.16.
 */

'use strict';
const electron = require('electron');
const ipcMain = electron.ipcMain;
const winston = require('winston');

class RpcChannel {

    static jsonRpcError(code, message, id) {

        return JSON.stringify({
            error: { code: code, message: message },
            id: id,
            jsonrpc: '2.0'
        });
    }


    static jsonRpcResult(result, id) {

        return JSON.stringify({
            result: result,
            id: id,
            jsonrpc: '2.0'
        });
    }


    static linkToChannel(channel, handlers) {

        channel.on('asynchronous-message', (event, arg) => {

            let result = '';
            try {
                const obj = JSON.parse(arg);
                const f = handlers.get(obj.method);

                if (f) {

                    try {
                        result = RpcChannel.jsonRpcResult(f(obj.params), obj.id);
                    } catch (err) {

                        winston.error(`Internal error on query: ${arg} - with error ${err}`);
                        result = RpcChannel.jsonRpcError(-32603, 'Internal error', obj.id);
                    }

                } else {
                    winston.error(`Invalid inbound query: ${arg} - no method found`);
                    result = RpcChannel.jsonRpcError(-32601, 'Method not found', obj.id)
                }

            } catch (error) {
                result = RpcChannel.jsonRpcError(-32700, 'Parse error');
                winston.error(`Invalid inbound query: ${arg} - error: ${error}`);
            }

            event.sender.send('asynchronous-reply', result)
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


    /**
     * This should be able to deliver asynchronous notification
     * in JSON-RPC v2.0 manner
     * @param name {string}
     * @param data {object}
     */
    publishEvent(name, data) {

        ipcMain.send('asynchronous-message', JSON.stringify({
            name: name, params: data
        }));
    }
}


module.exports = RpcChannel;