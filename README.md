# telegram-web-bot

## Front UI

### Описание

Мобильное Telegram веб-приложение для презентации и тестирования возможности взимодействия пользователя с внутренними сервисами, такими как запись в сервис по календарю свободных дат.

### Внешний вид

Интерфейс должен быть выполнен в свободной манере на усмотрение frontend разработчичка, по общему гайдлайна последнего проекта сайта freshauto.ru

### Сценарии

Пользовательские сценарии

1. Запись в сервис
   1. Пользователь запрашивает у бота запись
   2. Нажимает на кнопку выбора даты
   3. Выбирает дату
   4. Подтверждает дату
   5. Выбирает услугу
   6. Подтверждает услугу
   7. Просматривает подтверждение
   8. Закрывает интерфейс и возвращается в бота
2. _Вероятно может быть сценарий отмены записи_...

### Экраны

1. Первый экран с описанием функционала приложения, приветствием пользователя и кнопкой перехода на запись на приём.
   1. **Заголовок:** Добро пожаловать в Сервис FreshAuto
   2. **Текст под заголовком:** Сервис FreshAuto это современное оборудование для диагностики авто, и специалисты со стажем от 3х лет в авто-слесарных науках.
   3. **Текст перед кнопкой записи:** Выберите свободную дату, и укажите какую услугу вы хотите получить.
   4. **Кнопка записи:** Выбрать дату!
2. Второй экран, это просто календарь и кнопка под ним для подтверждения, где свободные для записи даты доступны для нажатия. Даты, на которые нельзя записаться, неактивны, выделены визуально как disabled кнопка. При выборе свободной даты, кнопка под календарём становится доступной для нажатия.Надпись на кнопке: "**Выбрать эту дату**". До выбора даты, кнопка не активна.
3. Четверный экран выбора услуги. На данный момент доступны три услуги: Подъемник, мойка, замена малса. Услуги должны быть выполнены в виде списка radio-button. Можно выбрать только одну услугу за раз. После выбора услуги снизу становится доступна кнопка "**Подтвердить**" (по умолчанию disabled).
4. Экран подтверждения заказа, где отображается выбранная дата и услуга.
   1. **Заголовок экрана**: Вы записались в Сервис FreshAuto!
   2. **Подзаголовок**: Проверьте вашу запись.
   3. _Текст с данными о записи_

### Взаимодействие с backend (черновик)

#### Методы

##### Получить все даты (GET /dates)

Метод получегния всех доступных для записи дат. Будет в виде массива строк даты, каждая строка означает свободную дату. Дат которых нет в списке по умолчанию недоступны.

Пример:

```JSON
[
 '2023-02-17T00:00:00',
 '2023-02-18T00:00:00',
 '2023-02-19T00:00:00',
]
```

##### Получить список услуг (GET /services)

Метод возвращает массив объектов с данными услуги.

Пример:

```JSON
[
 {
  "id": '3kj1hgh231',
  "name": "Мойка"
 },
 {
  "id": 'jk64h56jhj',
  "name": "Подъемник"
 },
 {
  "id": 'n657gh657gh',
  "name": "Замена масла"
 },
]
```

##### Записать клиента (POST /create)

Создаёт запись для клиента в сервисе и занимает за ним выбранную дату.

Пример запроса:

```JSON
{
 'chatId': '34465234',
 'service': 'Мойка',
 'date': '2023-02-19T00:00:00'
}
```

В ответ только Status `200` или Status `400`

## Project setup

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
yarn serve
```

### Compiles and minifies for production

```bash
yarn build
```

### Lints and fixes files

```bash
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
