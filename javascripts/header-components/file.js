import React from 'react';

let Component = React.createElement;

export default React.createClass({
    displayName: 'fileHeaderTab',
    render() {
        return Component('ul', {},
            Component('li', {}, 'Create'),
            Component('li', {}, 'Update'),
            Component('li', {}, 'Delete'),
            Component('li', {}, 'Complete'),
            Component('li', {}, 'Exit')
        )
    }
})