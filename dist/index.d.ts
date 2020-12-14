interface Player {
    nickname: string;
    uuid: string;
}
interface ChatMessage {
    sender: Player;
    text: string;
    time: number;
}
declare type ServerWeather = 'CLEAR' | 'RAIN' | 'THUNDER';
interface ServerTime {
    timeOfDay: 'DAY' | 'NIGHT';
    ticks: number;
    formated: string;
}
interface OnlinePlayers {
    players: Player[];
    count: number;
    max: number;
}
declare class Server {
    private name;
    constructor(name: 'spm');
    getLastChatMessages: (limit?: number) => Promise<ChatMessage[]>;
    getOnlinePlayers: () => Promise<OnlinePlayers>;
    getServerTime: () => Promise<ServerTime>;
    getServerWeather: () => Promise<ServerWeather>;
}
declare const SPm: Server;
export { SPm };
