document.addEventListener('DOMContentLoaded', appStart)

// deklaracja kanałów
const kanal1 = []
const kanal2 = []
const kanal3 = []
const kanal4 = []

// domyślnie ustawiam kanał pierwszy jako wybrany
let wybranyKanal = 'ch1'

// lista dostępnych dźwięków
// klucz jest kodem ASCI danego klawisza, wartością są nazwy sampli
const sample = {
    113:     'boom',
    119:    'clap',
    101:    'hihat',
    114:    'kick',
    116:    'openhat',
    121:    'ride',
    117:    'snare',
    105:    'tink',
    111:    'tom',
}


//zmienna przechowująca czy nagrywanie w toku
let isRecording = false

// zmienna przechowująca czas rozpoczęcia nagrywania
let startNagrania = 0

// sprawdzanie zdarzeń 
function appStart() 
{
    window.addEventListener('keypress', play)
    document.querySelector('#rec').addEventListener('click', nagrywanie)
    document.querySelector('#play').addEventListener('click', odtwarzanie)

    document.querySelectorAll('input[name=kanal]').forEach(function(radio){
        radio.addEventListener('click', function(e){
            switch(e.target.value)
            {
                case 'kanal1':
                    wybranyKanal = 'ch1';
                    break;
                case 'kanal2':
                    wybranyKanal = 'ch2';
                    break;
                case 'kanal3':
                    wybranyKanal = 'ch3';
                    break;
                case 'kanal4':
                    wybranyKanal = 'ch4';
                    break;
            }
        })
    })

    document.querySelectorAll('.key').forEach(function(evnt){
        evnt.addEventListener('click', function(e){
            odtworzDzwiek(e.target.value)
        })
    })
}

function play(e)
{
    if(!sample[e.charCode]) {
        return
    }
    const dzwiek = sample[e.charCode]
    odtworzDzwiek(dzwiek)
}

// funkcja odtwarzająca dźwięk przy użyciu znacznika AUDIO w HTML
function odtworzDzwiek(dzwiek) 
{
    const audioDOM = document.querySelector(`#${dzwiek}`)
    audioDOM.currentTime = 0
    audioDOM.play()

    // jeśli nagrywanie trwa to zapisuję dźwięk do kanału
    if(isRecording)
    {
        dodajDzwiek({
            name: dzwiek,
            time: Date.now() - startNagrania
        });
    }
}

// funkcja dodająca obiekt dźwięku do aktywnego kanału
function dodajDzwiek(object){
    switch(wybranyKanal){
        case 'ch1':
            kanal1.push(object)
            break;
        case 'ch2':
            kanal2.push(object)
            break;
        case 'ch3':
            kanal3.push(object)
            break;
        case 'ch4':
            kanal4.push(object)
             break;
    }
}

// funkcja zmieniająca stan nagrywania i treść przcisku
// w momencie rozpoczęcia nagrywania uruchamia nagrane dotąd dźwięki
function nagrywanie(e) {
    startNagrania = Date.now()
    isRecording =!isRecording
    if(isRecording)
    {
        e.target.innerHTML = "Stop<br>Nagrywania "
        odtwarzanie()
    }
    else
    {
        e.target.innerHTML = "Nagrywanie"
    }
}

//  Odtwarza wszystkie nagrane dzwięki
function odtwarzanie(e) 
{
    kanal1.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    kanal2.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    kanal3.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
    kanal4.forEach(function(sound) {
        setTimeout(
            ()=> {
                const audioDOM = document.querySelector(`#${sound.name}`)
                audioDOM.currentTime = 0
                audioDOM.play()
        }, sound.time)
    })
}