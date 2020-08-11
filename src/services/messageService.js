import { Observable } from 'rxjs';
import CryptoJS from 'crypto-js';

class MessageService {
    static instance = null;
    connectionKey = '';

    static getInstance() {
        if (!this.instance) {
            this.instance = new MessageService();
        }

        return this.instance;
    }

    setUpConnection() {
        return new Observable(subscribe => {
            this.subscribe = subscribe;
            window.WebSocket = window.WebSocket || window.MozWebSocket;

            var HOST = location.origin.replace(/^http/, 'ws');
            this.connection = new WebSocket(HOST);

            this.connection.onopen = function () {
            };

            this.connection.onerror = function (error) {
                console.log(error);
            };

            this.connection.onmessage = (message) => {
                try {
                    var json = JSON.parse(message.data);
                } catch (e) {
                    console.log('This doesn\'t look like a valid JSON: ',
                        message.data);
                    return;
                }

                const data = JSON.parse(message.data);

                if (data.action === 'NEW_MESSAGE') {
                    this.saveMessage(data.sender, data.text, true);
                } else if (data.action === 'CONNECTION_ACCEPTED') {
                    this.connectionKey = data.connectionKey;
                    localStorage.setItem('p2p_messenger_messages', this.encrypt({}, this.connectionKey));
                    subscribe.next(data);
                } else {
                    subscribe.next(data);
                }
            };
        })
    }

    addConnection(connectionKey) {
        this.subscribe.next({ action: 'NEW_CONNECTION', connectionKey });
    }

    sendMessage(targetConnectionKey, messageData) {
        this.connection.send(JSON.stringify({ action: 'SEND_MESSAGE', sender: this.connectionKey, text: messageData, recipient: targetConnectionKey }));
        this.saveMessage(targetConnectionKey, messageData);
    }

    openChatWindow(connectionKey) {
        this.subscribe.next({ action: 'OPEN_CHAT_WINDOW', connectionKey })
    }

    getMessages(targetConnectionKey) {
        const encrypted = localStorage.getItem('p2p_messenger_messages');
        const decrypted = this.decrypt(encrypted, this.connectionKey);

        if (!decrypted[targetConnectionKey]) {
            return [];
        }

        return decrypted[targetConnectionKey];
    }

    saveMessage(targetConnectionKey, message, recieved = false) {
        const encrypted = localStorage.getItem('p2p_messenger_messages');
        const decrypted = this.decrypt(encrypted, this.connectionKey);
        if (!decrypted[targetConnectionKey]) {
            decrypted[targetConnectionKey] = [];
        }
        decrypted[targetConnectionKey].push({ message, recieved });
        localStorage.setItem('p2p_messenger_messages', this.encrypt(decrypted, this.connectionKey));
        this.subscribe.next({ action: 'NEW_MESSAGE', messages: decrypted[targetConnectionKey], sender: targetConnectionKey });
    }

    getLastMessage(targetConnectionKey) {
        const encrypted = localStorage.getItem('p2p_messenger_messages');
        let decrypted = this.decrypt(encrypted, this.connectionKey);

        if (!decrypted[targetConnectionKey]) {
            return null;
        }

        return decrypted[targetConnectionKey].reverse()[0];
    }

    removeConnection() {
        const encrypted = localStorage.getItem('p2p_messenger_messages');
        const decrypted = JSON.parse(atob(CryptoJS.AES.decrypt(encrypted, connectionKey)));
        decrypted[targetConnectionKey].push(message);
        localStorage.setItem('p2p_messenger_messages', this.encrypt(decrypted), connectionKey);
    }

    // Private methods

    encrypt(obj, key) {
        return CryptoJS.AES.encrypt(JSON.stringify(obj), key);
    }

    decrypt(encrypted, key) {
        return JSON.parse(CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8));
    }
}

export default MessageService.getInstance();