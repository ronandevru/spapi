const fetch = require('node-fetch');

async function get(route) {
   try {
      const res = await ( await fetch('https://sp-api.ru/spm/'+route) ).json()
      if (res.error) throw 'Request Error';
      return res;
   }catch(err) {
      throw 'Server Error. Request failed '+err.code;
   }
}

module.exports.SPm = {
   async getLastChatMessages(limit = 50) {
      try {
         const { messages } = await get('chat');
         if (messages.length > limit) messages.length = limit;
         for (let i = 0; i < messages.length; i++) {
            messages[i] = {
               sender: {
                  nickname: messages[i].name,
                  uuid: messages[i].uuid
               },
               text: messages[i].message,
               time: Math.round(Number(messages[i].time) / 1000)
            };
         }
         return messages;
      }catch(err) {
         throw err;
      }
   },   
   async getOnlinePlayers() {
      try {
         const { players, count, max } = await get('online');
         for (let i = 0; i < players.length; i++) {
            players[i] = {
               nickname: players[i].nick,
               uuid: players[i].uuid
            };
         }
         return { players, count, max };
      }catch(err) {
         throw err;
      }
   },
   async getServerTime() {
      try {
         const { time, ticks } = await get('time');
         let minutes = Math.round((ticks % 1000)*0.06).toString();
         if (minutes.length == 1) minutes += '0';
         formated = `${Math.floor(ticks / 1000) + 6}:${minutes}`;
         return { timeOfDay: time, ticks, formated };
      }catch(err) {
         throw err;
      }
   },
   async getServerWeather() {
      try {
         const { weather } = await get('weather');
         return weather;
      }catch(err) {
         throw err;
      }
   } 
}