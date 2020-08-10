import React from 'react';
import * as styles from './message.scss';

class Message extends React.Component {
    render() {
        return (
            <div className={[styles.Message, this.props.message.recieved ? styles.Recieved : ''].join(' ')}>
                <span>{this.props.message.message}</span>
            </div>
        );
    }
}

export default Message;