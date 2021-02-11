import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { MainView } from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// commands that we bundle ./index.scss
import './index.scss';

// only ever 1 store
const store = createStore(moviesApp);

// main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// tells React to render app in root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
