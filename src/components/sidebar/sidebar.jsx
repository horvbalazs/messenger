import React from 'react';
import MessageService from '../../services/messageService';
import * as styles from './sidebar.scss';
import Conversation from '../conversation/conversation';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.connectionKey = '';
    }

    newConnection() {
        MessageService.addConnection(this.connectionKey);
    }

    render() {
        return (
            <div className={styles.Sidebar} >
                <div className={styles.Header}>
                    <small>Your connection string:</small>
                    <h3>{this.props.connectionKey}</h3>
                </div>
                <div className={styles.AddConnection}>
                    <input onChange={(el) => { this.connectionKey = el.target.value }} placeholder="Copy your friend's connection string here" />
                    <button onClick={() => this.newConnection()}>Set up connection</button>
                </div>
                {
                    this.props.connections.length > 0 ?
                        <div className={styles.Divider}></div> : ''
                }
                {
                    this.props.connections.map((connection, index) => {
                        const lastMessage = MessageService.getLastMessage(connection);
                        return <Conversation
                            key={index}
                            connectionKey={connection}
                            message={lastMessage}
                            active={this.props.active === connection}
                            unread={lastMessage && lastMessage.recieved && this.props.active !== connection}
                        ></Conversation>
                    })
                }
            </div>
        );
    }
}

export default Sidebar;