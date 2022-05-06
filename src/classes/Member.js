const { GUILD_FORUM } = require("../structs/ChannelType");

class Member {
  roles = {};
  guild = null;
  user = null;
  serverName = null;
  serverAvatar = null;

  constructor(guild, user) {
    this.guild = guild;
    this.user = user;
  }

  setServerName(name) {
    this.serverName = name;
  }

  setServerAvatar(avatar) {
    this.serverAvatar = avatar;
  }

  addRole(role) {
    this.roles[role.id] = role;
  }

  removeRole(role) {
    delete this.roles[role.id];
  }

  getRoles() {
    return this.roles;
  }

  getGuild() {
    return this.guild;
  }

  getUser() {
    return this.user;
  }

  getServerName() {
    return this.serverName;
  }

  getServerAvatar() {
    return this.serverAvatar;
  }

  static createFromJson(json, guild) {
    let user = global.globalData.getUser(json.user_id);

    if (!user && json.user) {
      user = User.createFromJson(json.user);
    }

    const member = new Member(guild, user);

    member.setServerName(json.nick);
    member.setServerAvatar(json.avatar);

    json.roles.forEach((roleId) => {
      const role = guild.getRole(roleId);

      member.addRole(role);
    });

    return member;
  }
}

module.exports = Member;
