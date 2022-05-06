const getInput = require('../utils/get-input');

const commands = {
  'done': () => {
    nav.up();
  },
};

const sendMessage = async ({ selectChannel, selectGuild }, dontPrint = false) => {
  const channel = globalData.getChannel(selectChannel);

  globalData.setCurrentChannel(selectChannel);

  if (!channel) {
    console.log('channel not found');

    nav.up();

    return;
  }

  if (!dontPrint) {
    const messages = await channel.getLastMessages(50);

    messages.reverse().forEach((message) => {
      console.log(message.toString());
    });
  }

  getInput().then((input) => {
    if (input.startsWith('/')) {
      const command = input.split(' ')[0].substring(1);

      if (commands[command]) {
        commands[command](input.split(' ').slice(1));

        return;
      }
    };

    sendMessage({ selectChannel, selectGuild }, true);

    channel.sendMessage(input);
  });
}

module.exports = sendMessage;
