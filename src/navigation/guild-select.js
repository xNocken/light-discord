const getOptions = () => {
  const options = [{
    name: 'DMs',
    value: 'dms',
  }];

  const guilds = globalData.getGuilds();

  Object.values(guilds).forEach((guild) => {
    options.push({
      name: guild.getName(),
      value: guild.getId(),
    });
  });

  return options;
}

module.exports = {
  getOptions,

};
