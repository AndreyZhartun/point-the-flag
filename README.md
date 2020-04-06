## Игра "Укажи страну по ее флагу", сделанная с помощью React и leaflet.js
Приложение написано на React с использованием *Redux* архитектуры. Компоненты:
    `<App>` - приложение, в нем все собрано и обернуто в `<Provider>`
        `<Header>`
        `<GuessMap>` - карта, маркер двигаемый и при изменении его позиции создается Redux action
            `<GuessGame>` - fixed контейнер, все его изменения через Redux actions с исп. Redux thunk
* Страна, выбранная маркером, находится через HTTP GET запрос (fetch()) к [Nominatim API](https://nominatim.org/release-docs/develop/api/Reverse/)
* Оформление приложения сделано с помощью *reactstrap*-а, для работы с leaflet был использован *react-leaflet*

## "Guess the country by its flag" game made with React and leaflet.js
This React app uses *Redux* architecture. Components:
    `<App>` - приложение, where everything is put together and wrapped in Redux `<Provider>`
        `<Header>`
        `<GuessMap>` - the map, has a draggable marker which dispatches a Redux action when moved
            `<GuessGame>` - fixed container, all its changes are implemented using Redux actions with thunk
* The chosen country is identified by a HTTP GET request (fetch()) to [Nominatim API](https://nominatim.org/release-docs/develop/api/Reverse/)
* The styling stuff is done using *reactstrap*, implementing leaflet using *react-leaflet*