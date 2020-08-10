import React from 'react';
import * as styles from './App.scss';
import Sidebar from './sidebar/sidebar';
import MessageWindow from './message-window/message-window';
import MessageService from '../services/messageService';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    MessageService.setUpConnection().subscribe(observer => {
      let state;
      switch (observer.action) {
        case 'CONNECTION_ACCEPTED':
          this.setState({ connectionKey: observer.connectionKey, connections: [], messages: [] });
          break;
        case 'NEW_CONNECTION':
          if (this.state.connections.indexOf(observer.connectionKey) === -1) {
            const connections = this.state.connections.concat([observer.connectionKey]);
            this.setState({ connectionKey: this.state.connectionKey, connections, messages: [] });
          } else {
            // TODO: Handle duplicates
          }
          break;
        case 'OPEN_CHAT_WINDOW':
          state = this.state;
          state.activeConnection = observer.connectionKey;
          state.messages = MessageService.getMessages(this.state.activeConnection);
          this.setState(state);
          break;
        case 'NEW_MESSAGE':
          state = this.state;
          if (this.state.activeConnection) {
            state.messages = MessageService.getMessages(this.state.activeConnection);
          }
          if (this.state.connections.indexOf(observer.sender) === -1) {
            this.state.connections = this.state.connections.concat([observer.sender]);
          }
          this.setState(state);
      }
    });
  }

  render() {
    if (this.state.connectionKey) {
      return (
        <div className={styles.App} >
          <Sidebar connectionKey={this.state.connectionKey} connections={this.state.connections} active={this.state.activeConnection}></Sidebar>
          <MessageWindow connectionKey={this.state.activeConnection} messages={this.state.messages}></MessageWindow>
        </div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

export default App;
