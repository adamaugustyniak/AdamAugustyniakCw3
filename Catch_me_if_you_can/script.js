let local, map, marker;
let web_socket;
let players = {};
// losowy nick dla użytkownika
let nick = Math.random() * 1000000;

// losowy kolor ikony użytkownika
function MakerColor() {
    var dictionary = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += dictionary[Math.floor(Math.random() * 16)];
    }
    return color;
}
// inicjalizacja mapy
function initMap() {
    //nadanie domyślnych koordynatów, przybliżenia mapy, wycentrowania mapy na koordynatach
    local = { lat: 50.064651, lng: 19.944981 };
    map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 6,
        center: local,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({
        position: local,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://via.placeholder.com/20/' + MakerColor()
    });
    localization()
    startWebSocket()
    findKeyboardMove()
}

function findKeyboardMove() {
    window.addEventListener('keydown', sterowanie)
}
//funkcja poruszania markerem 
function sterowanie(ruch) {
    let lat = marker.getPosition().lat() 
    let lng = marker.getPosition().lng()  
    let icon = marker.icon;

    switch (ruch.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }
    let position = {
        lat,
        lng
    }
    let wsData = {
        lat: lat,
        lng: lng,
        id: nick,
        icon: icon
    }

    marker.setPosition(position)
    web_socket.send(JSON.stringify(wsData))
}
// połączenie z serwerem 
function startWebSocket() {
    let url = 'web_socket://91.121.6.192:8010';
    web_socket = new WebSocket(url)
    web_socket.addEventListener('open', onWSOpen)
    web_socket.addEventListener('message', onWSMessage)
}

function onWSOpen(data) {
    console.log(data);
}
function onWSMessage(e) {
    if (e.data.substring(0, 20) == 'msg_chat_number') {
        console.log(e.data);
        output.innerHTML += '<div class=\"msgtext\">' + e.data.substring(20) + '</div>';
    } else {
        let data = JSON.parse(e.data)

        if (!players['user' + data.id]) {
            players['user' + data.id] = new google.maps.Marker({
                position: { lat: data.lat, lng: data.lng },
                map: map,
                icon: data.icon
            })
        } else {
            players['user' + data.id].setPosition({
                lat: data.lat,
                lng: data.lng
            })
        }
    }
}
//pobieranie lokalizacji od użytkownika jeśli fail wykonaj `localizationFail`
function localization() {
    navigator.geolocation.getCurrentPosition(localizationOK, localizationFail)
}

function localizationOK(data) {
    //przypisanie lokalizacji
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    //przypisanie koordynatów do centowania mapy i centrowania markera użytkownika
    map.setCenter(coords)
    marker.setPosition(coords)
}
//wyrzut błędu lokalizacji
function localizationFail(err) {
    console.log(err)
}

//chat między użytkownikami
let input = document.querySelector("#chat-input");
let output = document.querySelector("#chat-output");
let sendMessage = document.querySelector("#wyslij-wiadomosc");

// wysyłanie wiadomości z identyfikatorem
sendMessage.addEventListener('click', function () {
    if (!input.value == "") {
        web_socket.send('msg_chat_number' + input.value);
        input.value = '';
    }
})