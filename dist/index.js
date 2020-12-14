"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPm = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const get = (server, route) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (yield node_fetch_1.default(`https://sp-api.ru/${server}/${route}`, {})).json();
    if (res.error)
        throw new Error('Request Error');
    return res;
});
class Server {
    constructor(name) {
        this.getLastChatMessages = (limit = 50) => __awaiter(this, void 0, void 0, function* () {
            const { messages } = yield get(this.name, 'chat');
            if (messages.length > limit)
                messages.length = limit;
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
        this.getOnlinePlayers = () => __awaiter(this, void 0, void 0, function* () {
            const { players, count, max } = yield get(this.name, 'online');
            for (let i = 0; i < players.length; i++) {
                players[i] = {
                    nickname: players[i].nick,
                    uuid: players[i].uuid
                };
            }
            return { players, count, max };
        });
        this.getServerTime = () => __awaiter(this, void 0, void 0, function* () {
            const { time, ticks } = yield get(this.name, 'time');
            let minutes = Math.round((ticks % 1000) * 0.06).toString();
            if (minutes.length == 1)
                minutes += '0';
            return { timeOfDay: time, ticks, formated: `${Math.floor(ticks / 1000) + 6}:${minutes}` };
        });
        this.getServerWeather = () => __awaiter(this, void 0, void 0, function* () {
            const { weather } = yield get(this.name, 'weather');
            return weather;
        });
        this.name = name;
    }
}
const SPm = new Server('spm');
exports.SPm = SPm;
