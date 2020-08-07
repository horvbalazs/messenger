import React from 'react';
import Message from '../conversation/conversation';
import MessageService from '../../services/messageService';

class MessageWindow extends React.Component {

    constructor(props) {
        super(props);
        this.messages = [];
        const messageService = MessageService;
        messageService.listenToMessages(this.props.connectionKey).subscribe((messages) => {
            this.messages = messages;
        });
    }
    render() {
        return (
            <div className="Message">
                <header>{this.props.userName}</header>
                {this.messages.map((message) => <Message message={message}></Message>)}
            </div>
        );
    }
}

export default MessageWindow;