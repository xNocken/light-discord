const ChannelType = require('../../structs/ChannelType');
const AbstractGuildChannel = require('./AbstractGuildChannel');

class VoiceChannel extends AbstractGuildChannel {
  getType() {
    return ChannelType.GUILD_VOICE;
  }

  isTextChannel() {
    return false;
  }
}

module.exports = VoiceChannel;
