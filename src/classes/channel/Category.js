const ChannelType = require('../../structs/ChannelType');
const AbstractGuildChannel = require('./AbstractGuildChannel');

class Category extends AbstractGuildChannel {
  channels = {};

  constructor(id, guild) {
    super(id, guild);
  }

  addChannel(channel) {
    this.channels[channel.id] = channel;

    return this;
  }

  getChannels() {
    return this.channels;
  }

  getChannel(id) {
    return this.channels[id];
  }

  deleteChannel(id) {
    delete this.channels[id];
  }

  getType() {
    return ChannelType.GUILD_CATEGORY;
  }

  isTextChannel() {
    return false;
  }
}

module.exports = Category;
