const ChannelType = require("../../structs/ChannelType");
const AbstractTextChannel = require("./AbstractTextChannel");

class DMChannel extends AbstractTextChannel {
  recipient = null;

  constructor(id) {
    super(id);
  }

  getType() {
    return ChannelType.DM;
  }

  setRecipient(recipient) {
    this.recipient = recipient;

    return this;
  }

  getRecipient() {
    return this.recipient;
  }

  getName() {
    return this.getRecipient().username + "#" + this.getRecipient().discriminator;
  }
}

module.exports = DMChannel;
