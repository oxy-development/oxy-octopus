/**
 * Created by ygintsyak on 22.08.16.
 */


/**
 * This thing initializes new project/channel  session with method channels
 * @param channel channel instance
 * @param project project instance
 */
module.exports = (channel, project) => {

    const methods = [
        './rpc/project.ls.js',
        './rpc/project.object.new.js',
        './rpc/project.object.remove.js',
        './rpc/project.object.rename.js'
    ];
    
    
    methods.forEach((i) => {

        let initializer = require(i);
        channel.setupFunction(initializer.name, initializer.factory(project));
    });
};
