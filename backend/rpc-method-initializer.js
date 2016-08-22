/**
 * Created by ygintsyak on 22.08.16.
 */

'use strict';

/**
 * Creates new RPC method initializer
 * @param name RPC method name
 * @param factory {function} which accepts project object and returns handler function
 * @returns {{name: *, factory: *}}
 */
module.exports = (name, factory) => {

    return { name: name, factory: factory };
};