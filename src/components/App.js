import React from 'react';
import * as styles from './App.scss';
import Sidebar from './sidebar/sidebar';
import MessageWindow from './message-window/message-window';
import MessageService from '../services/messageService';


function App() {
  const connectionKey = MessageService.getConnectionKey();

  return (
    <div className={styles.App}>
      <Sidebar connectionKey={connectionKey}></Sidebar>
      <MessageWindow></MessageWindow>
    </div>
  );
}

export default App;
