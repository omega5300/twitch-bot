/* modules */
require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: process.env.TWITCH_USER,
    password: process.env.TWITCH_PASS
  },
  channels: [process.env.TWITCH_CHANNEL]
})

/* conection */
client
  .connect()
  .then(() => client.say('twitch', 'Hello everyone.'))
  .catch((err) => console.error(err.message))

// followers
client.on('followersonly', (channel, enabled, minutes) => {
  if(enabled) {
    console.info('Followers-only mode was enabled without throwing an error')
  }
})

/* connect */
client.on('connected', (address, port) => {
  client.action(
    process.env.TWITCH_CHANNEL_0,
    `the bot has connected ${address}:${port}`
  )
})

/* subs */
client.on('subcription', (channel, username, methods) => client.say(channel, `${username} Has subcribed PogChamp`))

client.on('resub', (
  channel,
  username,
  months,
  message,
  userstate,
  methods
) => client.say(channel, `${$username} Has subcribed for ${months} months in row PogChamp`))

// send
client.on('chat', async (channel, tags, message, self) => {
  // ignore and use own stream commands
  if (self) return

  const commandName = message.trim()

  if (commandName === '!hello') {
    client.say(channel, `@${tags.username}, bienvenido a el stream`)
  }

  //test comand
  if (commandName === '!ping') {
    client.say(channel, `!pong, @${tags.username}`)
  }

})
