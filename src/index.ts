import fetch from 'node-fetch';

export interface Player {
  nickname: string;
  uuid: string;
}

export interface ChatMessage {
  sender: Player;
  text: string;
  time: number;
}

export type ServerWeather = 'CLEAR' | 'RAIN' | 'THUNDER';

export interface ServerTime {
  timeOfDay: 'DAY' | 'NIGHT';
  ticks: number;
  formatted: string;
}

export interface OnlinePlayers {
  players: Player[];
  count: number;
  max: number;
}

const get = async (server: string, route: string) => {
  const res = await (await fetch(`https://sp-api.ru/${server}/${route}`, {})).json();
  if (!res.ok) throw new Error('Request Error');
  return res;
};

const createServer = (name: 'spm') => ({
  getLastChatMessages: async (limit = 50): Promise<ChatMessage[]> => {
    const { messages } = await get(name, 'chat');
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
  },
  getOnlinePlayers: async (): Promise<OnlinePlayers> => {
    const { players, count, max } = await get(name, 'online');
    for (let i = 0; i < players.length; i++) {
      players[i] = {
        nickname: players[i].nick,
        uuid: players[i].uuid
      };
    }
    return { players, count, max };
  },
  getServerTime: async (): Promise<ServerTime> => {
    const { time, ticks } = await get(name, 'time');
    let minutes = Math.round((ticks % 1000) * 0.06).toString();
    if (minutes.length === 1) minutes += '0';
    return { timeOfDay: time, ticks, formatted: `${Math.floor(ticks / 1000) + 6}:${minutes}` };
  },
  getServerWeather: async (): Promise<ServerWeather> => {
    const { weather } = await get(name, 'weather');
    return weather;
  }
});
export const SPm = createServer('spm');
