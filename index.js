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
let resultDiv = document.getElementById('result');
let button = document.getElementById('button');
let report1 = document.getElementById('report1');
let report2 = document.getElementById('report2');
let report3 = document.getElementById('report3');
let actualJoke;
let reportJokes = [];
let temperature = document.getElementById("temperature");
let wind = document.getElementById("wind");
let cloud_cover = document.getElementById("cloud_cover");
const API_NINJAS_KEY = 'ZD0Du+VPhzXbg3gWaAGo6A==bz9YNUdjll0ezWkZ';
button.addEventListener('click', jokeGenerator);
window.addEventListener('DOMContentLoaded', () => {
    jokeGenerator();
    getWeather();
});
report1.addEventListener('click', function () {
    report(1, actualJoke);
});
report2.addEventListener('click', function () {
    report(2, actualJoke);
});
report3.addEventListener('click', function () {
    report(3, actualJoke);
});
const url = 'https://www.meteosource.com/api/v1/free/point?lat=41.38879&lon=2.15899&sections=current&timezone=auto&language=en&units=metric&key=e1pppqt2rqwmkh0usnqcj7rj9d9zy1mt6xy40uob';
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const answer = yield fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!answer.ok) {
                if (answer.status === 404) {
                    throw new Error('⚠️ Weather data not found (404)');
                }
                else if (answer.status === 500) {
                    throw new Error('⚠️ Weather API server error (500)');
                }
                else {
                    throw new Error(`⚠️ Unexpected error: ${answer.status}`);
                }
            }
            const dades = yield answer.json();
            const resultat = {
                temperature: dades.current.temperature,
                windSpeed: dades.current.wind.speed,
                windDir: dades.current.wind.dir,
                cloudCover: dades.current.cloud_cover
            };
            temperature.innerText = ` BCN: ${dades.current.temperature}°C `;
            wind.innerText = `-  ${dades.current.wind.speed} km/h (${dades.current.wind.dir}) `;
            cloud_cover.innerText = `-  Cloudyness: ${dades.current.cloud_cover}%`;
            return resultat;
        }
        catch (error) {
            temperature.innerText = "❌ Weather unavailable";
            wind.innerText = "";
            cloud_cover.innerText = "";
            return { error: error instanceof Error ? error.message : String(error) };
        }
    });
}
function getRandomJokeAPI() {
    const apis = [
        'https://icanhazdadjoke.com/',
        'https://api.api-ninjas.com/v1/jokes'
    ];
    return apis[Math.floor(Math.random() * apis.length)];
}
function jokeGenerator() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiURL = getRandomJokeAPI();
            const headers = { 'Accept': 'application/json' };
            if (apiURL.includes('api-ninjas.com')) {
                headers['X-Api-Key'] = API_NINJAS_KEY;
            }
            const answer = yield fetch(apiURL, { headers });
            if (!answer.ok) {
                if (answer.status === 404) {
                    throw new Error('⚠️ Joke not found (404)');
                }
                else if (answer.status === 500) {
                    throw new Error('⚠️ Server error (500)');
                }
                else {
                    throw new Error(`⚠️ Unexpected error: ${answer.status}`);
                }
            }
            const json = yield answer.json();
            let joke = '';
            if (apiURL.includes('icanhazdadjoke') && json.joke) {
                joke = json.joke;
            }
            else if (apiURL.includes('api-ninjas.com') && json[0].joke && json[0].joke.length > 0) {
                joke = json[0].joke;
            }
            else {
                throw new Error("⚠️ Invalid joke format received from API");
            }
            resultDiv.innerHTML = joke;
            actualJoke = joke;
            return joke;
        }
        catch (error) {
            resultDiv.innerHTML = '❌ Error fetching joke. Try again!';
            console.error(error);
            return error;
        }
    });
}
function report(rate, actualJoke) {
    let date = new Date().toISOString();
    let found = reportJokes.find((item) => {
        return item.joke === actualJoke;
    });
    if (found) {
        found.score = rate;
    }
    else {
        reportJokes.push({
            'joke': actualJoke,
            'score': rate,
            'date': date
        });
    }
    return reportJokes;
}
