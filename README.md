# Проект SPApi временно преостановлен



## SPApi.js - JS библиотека для простого доступа к api серверов #СП

Поддерживаемые сервера:

- #СПм

### Установка

`npm i spapi.js` или `yarn add spapi.js`

### Использование

```javascript
const spapi = require('spapi.js').SPm; //SPm - сервер #СПм.
```

Или ES6 import

```typescript
import { SPm as spapi } from 'spapi.js';
```

#### Получение сообщений в чате

```javascript
spapi
  .getLastChatMessages(1 /*Максимальное кол-во сообщений 1-50 (не обязательно)*/)
  .then(messages => {
    //messages - Массив последних сообщений
    console.log(messages);
  })
  .catch(err => console.error(err));
```

Пример вывода:

```json
[
  {
    "sender": {
      "nickname": "Steve",
      "uuid": "8667ba71-b85a-4004-af54-457a9734eed7"
    },
    "text": "HelloWorld",
    "time": 1600000000
  }
]
```

#### Получение игроков онлайн

```javascript
spapi.getOnlinePlayers().then({ players, count, max } => {
	//players - Массив игроков онлайн
	//count - Кол-во игроков (= players.length)
	//max - Максимальное кол-во игроков
	console.log({ players, count, max });
}).catch(err => console.error(err));
```

Пример вывода:

```json
{
  "players": [
    {
      "nickname": "Steve",
      "uuid": "8667ba71-b85a-4004-af54-457a9734eed7"
    }
  ],
  "count": 1,
  "max": 69
}
```

#### Получение времени на сервере

```javascript
spapi.getServerTime().then({ timeOfDay, ticks, formatted } => {
	//timeOfDay - 'DAY' или 'NIGHT'
	//ticks - Время в тиках
	//formatted - Время в 24 часовом формате
	//Подробнее про тики и т.д. - https://minecraft.gamepedia.com/Daylight_cycle#24-hour_Minecraft_day
	console.log({ timeOfDay, ticks, formatted });
}).catch(err => console.error(err));
```

Пример вывода:

```json
{
  "timeOfDay": "DAY",
  "ticks": 6000,
  "formatted": "12:00"
}
```

#### Получение погоды на сервере

```javascript
spapi
  .getServerWeather()
  .then(weather => {
    //weather - 'CLEAR', 'RAIN' или 'THUNDER'
    console.log(weather);
  })
  .catch(err => console.error(err));
```

Тут и так все понятно, примеры не нужны
