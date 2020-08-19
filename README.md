## Игра "Укажи страну по ее флагу", сделанная с помощью React и leaflet.js
Приложение написано на React с использованием *Redux* архитектуры (что конечно излишне для такого небольшого приложения, но для примера моего кода сойдет). 
Приложение адаптировано для мобильных устройств. 
Иерархия компонентов:
```
    <App> - приложение, в нем все собрано и обернуто в <Provider>
        <Header>
        <GuessMap> - карта с передвигаемым маркером, на leaflet.js + react-leaflet
            <GuessGame> - fixed контейнер с игровой информацией
```
* Страна, выбранная маркером, находится через GET запрос (параметры: ширина и долгота игрового маркера) к [Nominatim API](https://nominatim.org/release-docs/develop/api/Reverse/) и сверяется с правильным ответом в `src/shared/flags.json`

## "Guess the country by its flag" game made with React and leaflet.js
This React app is mobile-friendly. 
I used *Redux* architecture as part of my learning experience and since the app is here mainly to show how I write code I left it. 
The component hierarchy:
```
    <App> - приложение, where everything is put together and wrapped in Redux <Provider>
        <Header>
        <GuessMap> - the map with a draggable marker, done using leaflet.js + react-leaflet
            <GuessGame> - fixed container with game info
```
* The chosen country is identified a HTTP GET request (the query parameters are the draggable marker's latitude and longitude) to [Nominatim API](https://nominatim.org/release-docs/develop/api/Reverse/) and the answer is then compared to the correct answers in `src/shared/flags.json`
