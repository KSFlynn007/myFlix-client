import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';

// commands that we bundle ./index.scss
import './index.scss';

// main component
class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);