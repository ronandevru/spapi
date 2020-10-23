export namespace SPm {
    function getLastChatMessages(limit?: number): Promise<ChatMessage[]>;
    function getOnlinePlayers(): Promise<OnlinePlayers>;
    function getServerTime(): Promise<ServerTime>;
    function getServerWeather(): Promise<ServerWeather>;
 }
 
 interface Player {
    nickname: string;
    uuid: string;
 }
 
 interface ChatMessage {
    sender: Player,
    text: string;
    time: Date;
 }
 
 type ServerWeather = 'CLEAR' | 'RAIN' | 'THUNDER';
 
 interface ServerTime {
    timeOfDay: 'DAY' | 'NIGHT',
    ticks: number;
    formated: string;
 }
 
 interface OnlinePlayers {
    players: Player[],
    count: number;
    max: number;
 }