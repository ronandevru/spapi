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
    return messages.map(({ name, uuid, message, time }: { name: string; uuid: string; message: string; time: string }) => ({
      sender: {
        nickname: name,
        uuid
      },
      text: message,
      time: Math.round(Number(time) / 1000)
    }));
  },
  getOnlinePlayers: async (): Promise<OnlinePlayers> => {
    const { players, count, max } = await get(name, 'online');
    return {
      players: players.map(({ nick, uuid }: { nick: string; uuid: string }) => ({
        nickname: nick,
        uuid
      })),
      count,
      max
    };
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
