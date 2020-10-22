const { getLastChatMessages, getOnlinePlayers, getServerTime, getServerWeather } = require('./index.js').SPm;

getLastChatMessages(10).then(console.log).catch(err => console.error('Error in getLastChatMessages() '+err));
getOnlinePlayers().then(console.log).catch(err => console.error('Error in getOnlinePlayers() '+err));
getServerTime().then(console.log).catch(err => console.error('Error in getServerTime() '+err));
getServerWeather().then(console.log).catch(err => console.error('Error in getServerWeather() '+err));