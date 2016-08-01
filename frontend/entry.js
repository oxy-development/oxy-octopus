'use strict';


import React from "react";
import ReactDOM from 'react-dom';

import ObjectPage from './object-page.js';

let Component = React.createElement;

//ReactDOM.render(<div className="myDiv">Hello React + Electron</div>, document.querySelector('body'));
ReactDOM.render(Component(ObjectPage), document.querySelector('body'));