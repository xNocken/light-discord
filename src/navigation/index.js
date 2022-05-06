const guildSelect = require('./guild-select');
const channelSelect = require('./channel-select');
const sendMessage = require('./send-message');

module.exports = {
  title: 'Select Guild',
  type: 'select',
  key: 'selectGuild',
  options: guildSelect.getOptions,
  action: {
    title: 'Select Channel',
    type: 'select',
    key: 'selectChannel',
    options: channelSelect.getOptions,
    action: {
      title: 'Channel options',
      type: 'select',
      key: 'channelAction',
      options: [
        {
          name: 'Send message',
          value: 'sendMessage',
        },
      ],
      action: {
        sendMessage: sendMessage,
      },
    },
  },
}
