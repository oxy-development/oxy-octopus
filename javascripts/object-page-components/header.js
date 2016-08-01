import React from 'react';
import File from '../header-components/file.js';

let Component = React.createElement;

export default React.createClass({
    displayName: 'objectPageHeader',
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
        return Component('header', {}, this.getBreadcrumbs())
    }
})