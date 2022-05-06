const WebSocket = require('ws');
const AbstractChannel = require('./src/classes/channel/AbstractChannel');
const GlobalData = require('./src/classes/GlobalData');
const Guild = require('./src/classes/Guild');
const Me = require('./src/classes/Me');
const Member = require('./src/classes/Member');
const Message = require('./src/classes/Message');
const User = require('./src/classes/User');
const Navigation = require('./src/classes/Navigation');
const token = require('./config.json').token;

const ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');

ws.onopen = () => {
  global.globalData = new GlobalData();

  globalData.setToken(token);

  ws.send(JSON.stringify({ "op": 2, "d": { token, "capabilities": 509, "properties": { "os": "Windows", "browser": "Chrome", "device": "", "browser_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36", "browser_version": "100.0.4896.127", "os_version": "10", "referrer": "", "referring_domain": "", "referrer_current": "", "referring_domain_current": "", "release_channel": "stable", "client_build_number": 126739, "client_event_source": null }, "presence": { "status": "online", "since": 0, "activities": [], "afk": false }, "compress": false, "client_state": { "guild_hashes": {}, "highest_last_message_id": "0", "read_state_version": 0, "user_guild_settings_version": -1, "user_settings_version": -1 } } }));

  setInterval(() => {
    ws.send(JSON.stringify({ "op": 1, "d": 18 }));
  }, 30000)
}

ws.on('message', (data) => {
  const response = JSON.parse(data);

  if (response.t === 'READY') {
    global.globalData.setSessionId(response.d.session_id);

    const me = Me.createFromJson(response.d.user);

    global.globalData.addUser(me);
    global.globalData.setSelf(me);

    response.d.users.forEach((userJson) => {
      const user = User.createFromJson(userJson);

      global.globalData.addUser(user);
    })

    response.d.guilds.forEach((guild) => {
      const theGuild = Guild.createFromJson(guild);

      global.globalData.addGuild(theGuild);
    });

    response.d.private_channels.forEach((channelJson) => {
      const channel = AbstractChannel.createFromJson(channelJson);

      if (channel) {
        global.globalData.addChannel(channel);
      }
    });
  }

  if (response.t === 'READY_SUPPLEMENTAL') {
    response.d.merged_members.forEach((userList, index) => {
      const server = response.d.guilds[index];
      const theServer = global.globalData.getGuild(server.id);

      userList.forEach((memberJson) => {
        const member = Member.createFromJson(memberJson, theServer);

        theServer.addMember(member);
      });
    });

    const nav = new Navigation();

    global.nav = nav;
  }

  if (response.t === 'MESSAGE_CREATE') {
    const channel = globalData.getChannel(response.d.channel_id);

    if (!channel) {
      console.log('message un unkown channel');

      return;
    }

    const message = Message.createFromJson(response.d, channel);

    channel.addMessage(message);

    if (channel.getId() === globalData.getCurrentChannel()) {
      console.log(message.toString());
    }
  }

  if (response.t === 'MESSAGE_UPDATE') {
    const channel = globalData.getChannel(response.d.channel_id);

    if (!channel) {
      console.log('message un unkown channel');

      return;
    }

    const message = channel.getMessage(response.d.id);

    if (!message) {
      console.log('message un unkown message');
    }

    message.updateFromJson(response.d);
  }
});

