const AbstractChannel = require('./AbstractChannel');

class AbstractGuildChannel extends AbstractChannel {
  permissionOverrides = {};
  guild = null;

  constructor(id, guild) {
    super(id);
    this.guild = guild;
  }

  setPermissionOverrides(permissionOverrides) {
    this.permissionOverrides = permissionOverrides;

    return this;
  }

  getPermissionOverrides() {
    return this.permissionOverrides;
  }

  getGuild() {
    return this.guild;
  }
}

module.exports = AbstractGuildChannel;
