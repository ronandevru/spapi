export interface Player {
	nickname: string;
	uuid: string;
}

export interface ChatMessage {
	sender: Player,
	text: string;
	time: number;
}

export interface ServerTime {
	timeOfDay: 'DAY' | 'NIGHT',
	ticks: number;
	formatted: string;
}

export interface OnlinePlayers {
	players: Player[],
	count: number;
	max: number;
}

export type ServerWeather = 'CLEAR' | 'RAIN' | 'THUNDER';
