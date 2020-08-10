import React from 'react';
import * as styles from './conversation.scss';
import MessageService from '../../services/messageService';

export class Conversation extends React.Component {

    constructor(props) {
        super(props);
        this.state = { unread: false };
    }

    clickHandler() {
        MessageService.openChatWindow(this.props.connectionKey);
    }

    render() {
        return (
            <div className={[styles.Conversation, this.props.unread ? styles.Unread : '', this.props.active ? styles.Active : ''].join(' ')} onClick={this.clickHandler.bind(this)}>
                <div className={styles.Sender}>{this.props.connectionKey}</div>
                <span className="text">{this.props?.message ? this.props.message.message : ''}</span>
            </div>
        );
    }
}

export default Conversation;