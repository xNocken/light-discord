const ChannelType = require('../../structs/ChannelType');
const AbstractGuildTextChannel = require('./AbstractGuildTextChannel');

class GuildTextChannel extends AbstractGuildTextChannel {
  constructor(id, guild) {
    super(id, guild);
  }

  getType() {
    return ChannelType.GUILD_TEXT;
  }
}

module.exports = GuildTextChannel;
