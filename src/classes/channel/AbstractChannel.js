const ChannelType = require("../../structs/ChannelType");
let Category;
let GuildTextChannel;
let VoiceChannel;
let DMChannel;

class AbstractChannel {
  /**
   * @type {string} name
   */
  id = null;
  /**
   * @type {string} name
   */
  name = null;

  constructor(id,) {
    this.id = id;
  }

  /**
   * @param {string} name
   * @returns
   */
  setName(name) {
    this.name = name;

    return this;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getType() {
    throw new Error('getType needs to be overridden');
  }

  isTextChannel() {
    throw new Error('isTextChannel needs to be overridden');
  }

  static createFromJson(json, guild) {
    let channel = null;

    if (!Category) {
      Category = require("./Category");
      GuildTextChannel = require("./GuildTextChannel");
      VoiceChannel = require("./VoiceChannel");
      DMChannel = require("./DMChannel");
    }

    switch (json.type) {
      case ChannelType.GUILD_TEXT:
        channel = new GuildTextChannel(json.id, guild);

        channel.setLastMessageID(json.last_message_id);
        channel.setPermissionOverrides(json.permission_overwrites);
        channel.setHasPendingMessages(true);

        break;

      case ChannelType.GUILD_CATEGORY:
        channel = new Category(json.id, guild);
        const channels = global.globalData.getPendingChannelParents(channel, json.parent_id);

        channels.forEach((ok) => {
          channel.addChannel(ok);
        });

        break;

      case ChannelType.GUILD_VOICE:
        channel = new VoiceChannel(json.id, guild);
        break;

      case ChannelType.DM:
        channel = new DMChannel(json.id);

        json.recipient_ids.forEach((id) => {
          channel.setRecipient(global.globalData.getUser(id));
        });

        break;

      default:
        console.log(`Unhandled channel type: ${json.type}`);

        return;
    }

    channel.setName(json.name);

    if (json.parent_id && guild) {
      const parentCategory = guild.getChannel(json.parent_id);

      if (parentCategory) {
        parentCategory.addChannel(channel);
      } else {
        global.globalData.addPendingChannelParent(channel, json.parent_id);
      }
    }

    return channel;
  }
}

module.exports = AbstractChannel;
