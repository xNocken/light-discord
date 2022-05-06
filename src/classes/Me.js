const User = require('./User');

class Me extends User {
  flags = null;

  constructor(id, bot) {
    super(id, bot);
  }

  setFlags(flags) {
    this.flags = flags;
  }

  getFlags() {
    return this.flags;
  }

  static createFromJson(json) {
    const me = new Me(json.id, json.bot);

    me.setUsername(json.username);
    me.setDiscriminator(json.discriminator);
    me.setAvatar(json.avatar);
    me.setPublicFlags(json.public_flags);
    me.setFlags(json.flags);

    return me;
  }
}

module.exports = Me;
