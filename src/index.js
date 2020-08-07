import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as styles from './scss/common.scss';

const wrapper = document.getElementById("container");
wrapper ?
  ReactDOM.render(
    <React.StrictMode>
      <div className={styles.Main}>
        <App />
      </div>
    </React.StrictMode>, wrapper) : false;
