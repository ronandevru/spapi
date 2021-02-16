import axios, { AxiosInstance } from 'axios';

import {
	ChatMessage,
	OnlinePlayers,
	ServerTime, ServerWeather,
} from '../types';

export class Server {
	private client: AxiosInstance;

	constructor(private name: string = 'spm') {
		this.client = axios.create({
			baseURL: `https://sp-api.ru/${name}/`
		});
	}

	getLastChatMessages = async (limit = 50): Promise<ChatMessage[]> => {
		return this.client.get('chat').then(({ data: { messages } }) => {
			if (messages.length > limit) {
				messages.length = limit;
			}
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
		});
	};

	getOnlinePlayers = async (): Promise<OnlinePlayers> => {
		return this.client.get('online').then(({ data: { players, count, max } }) => {
			for (let i = 0; i < players.length; i++) {
				players[i] = {
					nickname: players[i].nick,
					uuid: players[i].uuid
				};
			}
			return { players, count, max };
		});
	};

	getServerTime = async (): Promise<ServerTime> => {
		return this.client.get('time').then(({ data: { time, ticks } }) => {
			let minutes = Math.round((ticks % 1000) * 0.06).toString();
			if (minutes.length == 1) {
				minutes += '0';
			}
			return { timeOfDay: time, ticks, formatted: `${Math.floor(ticks / 1000) + 6}:${minutes}` };
		});
	};

	getServerWeather = async (): Promise<ServerWeather> => {
		return this.client.get('weather').then(({ data: { weather } }) => {
			return weather;
		});
	};
}
