declare module 'spapi' {
   interface SPm {
      getLastChatMessages(limit: number): Promise<ChatMessage[]>;
      getOnlinePlayers(): Promise<{
         players: Player[],
         count: number;
         max: number;
      }>
      getServerTime(): Promise<{
         timeOfDay: 'DAY' | 'NIGHT',
         ticks: number;
         formated: string;
      }>
      getServerWeather(): Promise<'CLEAR' | 'RAIN' | 'THUNDER'>
   }
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