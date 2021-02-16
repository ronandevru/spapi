import { Server } from './classes';
import {
	ChatMessage,
	OnlinePlayers,
	ServerTime,
	ServerWeather,
	Player
} from './types';

const SPm = new Server('spm');

export {
	SPm, Server,
	// types
	ChatMessage,
	OnlinePlayers,
	ServerTime,
	ServerWeather,
	Player
};
