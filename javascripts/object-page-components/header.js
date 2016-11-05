import React from 'react';
import File from '../header-components/file.js';

let Component = React.createElement;
let objectPageStrings = ['File0', 'Edit', 'View', 'Navigate', 'Code', 'Refactor', 'Help'];
let listItems = objectPageStrings.map(function(objectPageString){
    return <li>{objectPageString}</li>;
});

export default React.createClass({
    displayName: 'objectPageHeader',
    getBreadcrumbs() {
        return Component('ul', {}, listItems)
    },
    render() {
        return Component('header', {}, this.getBreadcrumbs())
    }
})