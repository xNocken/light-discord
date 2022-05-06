const ChannelType = require('../structs/ChannelType');
const Channel = require('./channel/AbstractChannel');
const Guild = require('./Guild');
const Me = require('./Me');
const User = require('./User');

class GlobalData {
  /**
   * @type {Object.<string, Channel>} channels
   */
  channels = {};
  /**
   * @type {Object.<string, Guild>} guilds
   */
  guilds = {};
  /**
   * @type {Object.<string, User>} users
   */
  users = {};
  /**
   * @type {string} token
   */
  token = null;
  /**
   * @type {Me} self
   */
  self = null;
  /**
   * @type {Number} sequenceId
   */
  sequenceId = 0;
  /**
   * @param {string} sessionId
   */
  sessionId = null;
  /**
   * @type {Object.<string, Array<Channel>>} pendingChannelParents
   */
  pendingChannelParents = {};
  currentChannel = null;

  getToken() {
    return this.token;
  }

  /**
   * @param {string} token
   */
  setToken(token) {
    this.token = token;

    return this;
  }

  getGuilds() {
    return this.guilds;
  }

  /**
   * @param {Me} self
   */
  setSelf(self) {
    this.self = self;

    return this;
  }

  getSelf() {
    return this.self;
  }

  getSequenceId() {
    return this.sequenceId;
  }

  /**
   * @param {number} sequenceId
   */
  setSequenceId(sequenceId) {
    this.sequenceId = sequenceId;

    return this;
  }

  /**
   * @param {Channel} channel
   */
  addChannel(channel) {
    this.channels[channel.id] = channel;

    return this;
  }

  /**
   * @param {Guild} guild
   */
  addGuild(guild) {
    this.guilds[guild.id] = guild;

    return this;
  }

  /**
   * @param {User} user
   * @returns {GlobalData}
   */
  addUser(user) {
    this.users[user.id] = user;

    return this;
  }

  /**
   * @param {string} id
   */
  getChannel(id) {
    return this.channels[id];
  }

  getDMChannels() {
    return Object.values(this.channels).filter(channel => channel.getType() === ChannelType.DM);
  }

  /**
   * @param {string} id
   */
  getGuild(id) {
    return this.guilds[id];
  }

  /**
   * @param {string} id
   */
  getUser(id) {
    return this.users[id];
  }

  /**
   * @param {string} id
   */
  deleteChannel(id) {
    delete this.channels[id];

    return this;
  }

  /**
   * @param {string} id
   */
  deleteGuild(id) {
    delete this.guilds[id];

    return this;
  }

  /**
   * @param {string} id
   */
  deleteUser(id) {
    delete this.users[id];

    return this;
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId;

    return this;
  }

  getSessionId() {
    return this.sessionId;
  }

  addPendingChannelParent(channel, parent) {
    if (!this.pendingChannelParents[parent]) {
      this.pendingChannelParents[parent] = [];
    }

    this.pendingChannelParents[parent].push(channel);
  }

  getPendingChannelParents(id) {
    return this.pendingChannelParents[id] || [];
  }

  setCurrentChannel(channel) {
    this.currentChannel = channel;

    return this;
  }

  getCurrentChannel() {
    return this.currentChannel;
  }

  removeCurrentChannel() {
    this.currentChannel = null;
  }
}

module.exports = GlobalData;
