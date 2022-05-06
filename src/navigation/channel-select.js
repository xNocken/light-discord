const getOptions = ({ selectGuild }) => {
  const options = [];

  if (selectGuild === 'dms') {
    globalData.getDMChannels().forEach((channel) => {
      options.push({
        name: channel.getName(),
        value: channel.getId(),
      });
    });

    return options;
  }

  const guild = globalData.getGuild(selectGuild);

  Object.values(guild.getChannels()).filter((a) => a.isTextChannel()).forEach((channel) => {
    options.push({
      name: channel.getName(),
      value: channel.getId(),
    });
  });

  return options;
}

module.exports = {
  getOptions,
};
