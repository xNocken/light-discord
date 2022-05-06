class Role {
  id = null;
  name = null;
  color = null;
  permissions = null;
  position = null;
  guild = null;
  members = {};

  constructor(id, guild) {
    this.id = id;
    this.guild = guild;
  }

  setName(name) {
    this.name = name;
  }

  setColor(color) {
    this.color = color;
  }

  setPermissions(permissions) {
    this.permissions = permissions;
  }

  setPosition(position) {
    this.position = position;
  }

  addMember(member) {
    this.members[member.id] = member;
  }

  removeMember(member) {
    delete this.members[member.id];
  }

  getMembers() {
    return this.members;
  }

  getGuild() {
    return this.guild;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getColor() {
    return this.color;
  }

  getPermissions() {
    return this.permissions;
  }

  getPosition() {
    return this.position;
  }

  getMembersCount() {
    return Object.keys(this.members).length;
  }

  getMembersArray() {
    return Object.values(this.members);
  }

  static createFromJson(json, guild) {
    const role = new Role(json.id, guild);

    role.setName(json.name);
    role.setColor(json.color);
    role.setPermissions(json.permissions);
    role.setPosition(json.position);

    return role;
  }
}

module.exports = Role;
