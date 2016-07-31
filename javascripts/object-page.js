import React from 'react';

let Component = React.createElement;

export default React.createClass({
    displayName: 'objectPage',
    render() {
        return Component('div', {}, 'hello helloaaaaaaw')
    }
})