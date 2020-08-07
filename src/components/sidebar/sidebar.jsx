import React from 'react';
import MessageService from '../../services/messageService';
import * as styles from './sidebar.scss';

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.connections = [];
        this.messageService = MessageService;
        this.messageService.listenToNewConnections().subscribe(connections => {
            this.connections = connections;
        });
    }

    newConnection(connectionKey) {
        this.messageService.setUpConnection(connectionKey);
    }

    openMessageWindow() {

    }

    render() {
        let connection = '';
        return (
            <div className={styles.Sidebar} >
                <div className={styles.Header}>
                    <small>Your connection string:</small>
                    <h3>{this.props.connectionKey}</h3>
                </div>
                <div className={styles.AddConnection}>
                    <input placeholder="Copy your friend's connection string here" />
                    <button click={this.newConnection(connection)}>Set up connection</button>
                </div>
                {
                    this.connections.map(connection =>
                        <button click={this.openMessageWindow(connection.connectionKey)}></button>)
                }
            </div>
        );
    }
}

export default Sidebar;