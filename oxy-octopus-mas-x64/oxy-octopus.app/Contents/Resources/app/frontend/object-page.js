require('../less/main.less');

import React from 'react';
import Header from '../javascripts/object-page-components/header.js';

let Component = React.createElement;

export default React.createClass({
    displayName: 'objectPage',
    render() {
        return Component('div', {},
            Component(Header)
        )
    }
})