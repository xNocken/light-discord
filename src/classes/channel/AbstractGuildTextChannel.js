const sendRequest = require('../../utils/send-request');
const Message = require('../Message');
const AbstractGuildChannel = require("./AbstractGuildChannel");

class AbstractGuildTextChannel extends AbstractGuildChannel {
  messages = {};
  messageHistory = [];
  lastMessage = null;
  lastMessageID = null;
  pinnedMessages = {};
  hasPendingMessages = false;

  addMessage(message) {
    this.messageHistory.push(message);
    this.messages[message.id] = message;

    this.messageHistory = this.messageHistory.sort((a, b) => { b.date - a.date });

    return this;
  }

  setLastMessageID(messageId) {
    const message = this.getMessage(messageId);

    this.lastMessageID = messageId;

    if (message) {
      this.lastMessage = message;
    } else {
      this.lastMessage = null;
    }

    return this;
  }

  setPinnedMessages(pinnedMessages) {
    this.pinnedMessages = pinnedMessages;

    return this;
  }

  setHasPendingMessages(hasPendingMessages) {
    this.hasPendingMessages = hasPendingMessages;

    return this;
  }

  getMessages() {
    return this.messages;
  }

  getMessage(id) {
    return this.messages[id];
  }

  getLastMessage() {
    return this.lastMessage;
  }

  getLastMessageID() {
    return this.lastMessageID;
  }

  getPinnedMessages() {
    return this.pinnedMessages;
  }

  hasPendingMessages() {
    return this.hasPendingMessages;
  }

  sendMessage(content) {
    sendRequest('/channels/' + this.getId() + '/messages', 'POST', {
      content: content
    });
  }

  async getLastMessages(count = 50) {
    if (this.messageHistory.length < count) {
      const body = {
        limit: 50,
      };

      if (this.messageHistory[0]) {
        body.before = this.messageHistory[0].id
      }

      const { response } = await sendRequest('/channels/' + this.getId() + '/messages', 'GET', body);

      if (response.length) {
        response.forEach((messageJson) => {
          const message = Message.createFromJson(messageJson, this);

          this.addMessage(message);
        });
      }
    }

    return this.messageHistory.slice(-count);
  }

  isTextChannel() {
    return true;
  }
}

module.exports = AbstractGuildTextChannel;
