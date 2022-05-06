class User {
  id = null;
  username = null;
  discriminator = null;
  avatar = null;
  bot = null;
  pulicFlags = null;

  constructor(id, bot) {
    this.id = id;
    this.bot = bot;
  }

  setUsername(username) {
    this.username = username;

    return this;
  }

  setDiscriminator(discriminator) {
    this.discriminator = discriminator;

    return this;
  }

  setAvatar(avatar) {
    this.avatar = avatar;

    return this;
  }

  setPublicFlags(flags) {
    this.publicFlags = flags;

    return this;
  }

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getDiscriminator() {
    return this.discriminator;
  }

  getAvatar() {
    return this.avatar;
  }

  getPublicFlags() {
    return this.publicFlags;
  }

  isBot() {
    return this.bot;
  }

  static createFromJson(json) {
    const user = new User(json.id, json.bot);

    user.setUsername(json.username);
    user.setDiscriminator(json.discriminator);
    user.setAvatar(json.avatar);
    user.setPublicFlags(json.public_flags);

    return user;
  }
}

module.exports = User;
