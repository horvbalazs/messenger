import React from 'react';

export class Conversation extends React.Component {
    render() { 
        return (
        <div className="Conversation">
            <span className="date">{this.props.message.date}</span>
            <span className="text">{this.props.message.text}</span>
        </div>
    );}
}

export default Conversation;