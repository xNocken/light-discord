class Message {
  content = null;
  date = null;
  editedDate = null;
  id = null;
  author = null;
  channel = null;
  deleted = false;
  attachments = [];

  constructor(id, date, author, channel) {
    this.date = date;
    this.author = author;
    this.channel = channel;
    this.id = id;
  }

  addAttachment(attachment) {
    this.attachments.push(attachment);
  }

  setContent(content) {
    this.content = content;

    return this;
  }

  setEditedDate(date) {
    this.editedDate = date;

    return this;
  }

  setId(id) {
    this.id = id;

    return this;
  }

  getContent() {
    return this.content;
  }

  getEditedDate() {
    return new Date(this.editedDate);
  }

  getId() {
    return this.id;
  }

  getAuthor() {
    return this.author;
  }

  getChannel() {
    return this.channel;
  }

  getDate() {
    return this.date;
  }

  isEdited() {
    return this.editedDate !== null;
  }

  isDeleted() {
    return this.deleted;
  }

  setDeleted() {
    this.deleted = true;
  }

  updateFromJson(json) {
    if (json.content) {
      this.setContent(json.content);
    }

    this.setEditedDate(json.edited_timestamp);
  }

  static createFromJson(json, channel) {
    const author = global.globalData.getUser(json.author.id);
    const message = new Message(json.id, new Date(json.timestamp), author, channel);

    message.setContent(json.content);
    message.setEditedDate(json.edited_timestamp);

    json.attachments.forEach((attachmentJson) => {
      // TODO: add class for attachment
      message.addAttachment(attachmentJson);
    });

    return message;
  }

  toString() {
    let result = `${this.author.getUsername()} -> ${this.channel.getName()}: ${this.content}`;

    if (this.attachments.length) {
      this.attachments.forEach((attachment) => {
        result += `\n↳ ${attachment.url}`;
      });
    }

    return result;
  }
}

module.exports = Message;
