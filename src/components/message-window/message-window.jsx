import React from 'react';
import MessageService from '../../services/messageService';
import Message from './message/message'
import * as styles from './messageWindow.scss';
import noMessage from '../../assets/no-message.svg';

class MessageWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    keyDownHandler(event) {
        if (event.key === 'Enter') {
            MessageService.sendMessage(this.props.connectionKey, event.target.value);
            event.target.value = '';
        }
    }

    render() {
        if (!this.props.connectionKey) {
            return (
                <div className={styles.NotSelected}>Open a conversation to begin</div>
            )
        }

        return (
            <div className={styles.MessageWindow}>
                <header className={styles.Header}>{this.props.connectionKey}</header>
                {
                    this.props.messages.length > 0 ?
                        <div className={styles.Messages}>
                            {this.props.messages.map((message, index) => <Message key={index} message={message}></Message>)}
                        </div> :
                        <div className={styles.Empty}>
                            <span>No messages</span>
                            <div>
                                <img src={noMessage} />
                            </div>
                        </div>
                }
                <div className={styles.TextInput}>
                    <input onKeyDown={(event) => this.keyDownHandler(event)} />
                </div>
            </div>
        );
    }
}

export default MessageWindow;