require('../less/main.less');

import React from 'react';

let Component = React.createElement;

export default React.createClass({
    displayName: 'objectPage',
    getBreadcrumbs() {
        return Component('ul', {},
            Component('li', {}, 'File'),
            Component('li', {}, 'Edit'),
            Component('li', {}, 'View'),
            Component('li', {}, 'Navigate'),
            Component('li', {}, 'Code'),
            Component('li', {}, 'Refactor'),
            Component('li', {}, 'Help')
        )
    },
    render() {
        return Component('div', {}, 'hello helloaaaaaaw')
    }
})