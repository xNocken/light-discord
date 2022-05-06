const AbstractChannel = require("./channel/AbstractChannel");
const Member = require("./Member");
const Role = require("./Role");

class Guild {
  members = {};
  channels = {};
  roles = {};
  id = null;
  name = null;

  constructor(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  addChannel(channel) {
    this.channels[channel.id] = channel;
  }

  addMember(member) {
    this.members[member.user.id] = member;
  }

  addRole(role) {
    this.roles[role.id] = role;
  }

  getChannel(id) {
    return this.channels[id];
  }

  getChannels() {
    return this.channels;
  }

  getMember(id) {
    return this.members[id];
  }

  getRole(id) {
    return this.roles[id];
  }

  deleteChannel(id) {
    delete this.channels[id];
  }

  deleteMember(id) {
    delete this.members[id];
  }

  deleteRole(id) {
    delete this.roles[id];
  }

  setName(name) {
    this.name = name;

    return this;
  }

  getName() {
    return this.name;
  }

  static createFromJson(json) {
    const guild = new Guild(json.id);

    guild.setName(json.name);

    json.roles.forEach((roleJson) => {
      const role = Role.createFromJson(roleJson, guild);

      guild.addRole(role);
    });


    if (json.members) {
      json.members.forEach((memberJson) => {
        const member = Member.createFromJson(memberJson);

        guild.addMember(member);
      });
    }

    json.channels.forEach((channelJson) => {
      const channel = AbstractChannel.createFromJson(channelJson, guild);

      if (channel) {
        guild.addChannel(channel);
        global.globalData.addChannel(channel);
      }
    });

    return guild;
  }
}

module.exports = Guild;
