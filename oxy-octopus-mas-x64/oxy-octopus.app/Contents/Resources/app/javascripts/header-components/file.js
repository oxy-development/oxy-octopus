import React from 'react';

let Component = React.createElement;

let fileHeaderStrings = ['Create', 'Update', 'Delete', 'Complete', 'Exit'];
let listItems = fileHeaderStrings.map(function(fileHeaderString){
    return <li>{fileHeaderString}</li>;
});

export default React.createClass({
    displayName: 'fileHeaderTab',
    render() {
        return Component('ul', {}, listItems)
    }
})