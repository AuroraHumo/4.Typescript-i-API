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
let acuditActual;
let reportAcudits = [];
let temperature = document.getElementById("temperature");
let wind = document.getElementById("wind");
let cloud_cover = document.getElementById("cloud_cover");
const API_NINJAS_KEY = 'ZD0Du+VPhzXbg3gWaAGo6A==bz9YNUdjll0ezWkZ';
button.addEventListener('click', generarBroma);
window.addEventListener('DOMContentLoaded', () => {
    generarBroma();
    getWeather();
});
report1.addEventListener('click', function () {
    report(1, acuditActual);
});
report2.addEventListener('click', function () {
    report(2, acuditActual);
});
report3.addEventListener('click', function () {
    report(3, acuditActual);
});
const url = 'https://www.meteosource.com/api/v1/free/point?lat=41.38879&lon=2.15899&sections=current&timezone=auto&language=en&units=metric&key=e1pppqt2rqwmkh0usnqcj7rj9d9zy1mt6xy40uob';
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resposta = yield fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            if (!resposta.ok)
                throw new Error(`Error: ${resposta.status}`);
            const dades = yield resposta.json();
            temperature.innerText = ` BCN: ${dades.current.temperature}°C `;
            wind.innerText = `-  ${dades.current.wind.speed} km/h (${dades.current.wind.dir}) `;
            cloud_cover.innerText = `-  Cloudyness: ${dades.current.cloud_cover}%`;
        }
        catch (error) {
            console.error("No s'ha pogut obtenir la informació:", error);
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
function generarBroma() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiURL = getRandomJokeAPI();
            const headers = { 'Accept': 'application/json' };
            if (apiURL.includes('api-ninjas.com')) {
                headers['X-Api-Key'] = API_NINJAS_KEY;
            }
            const resposta = yield fetch(apiURL, { headers });
            if (!resposta.ok) {
                throw new Error(`Something went wrong: ${resposta.status}`);
            }
            const json = yield resposta.json();
            let joke = '';
            if (apiURL.includes('icanhazdadjoke')) {
                joke = json.joke;
            }
            else if (apiURL.includes('api-ninjas.com')) {
                joke = json[0].joke;
            }
            resultDiv.innerHTML = joke;
            acuditActual = joke;
        }
        catch (error) {
            resultDiv.innerHTML = 'Error. Dad is not joking today...';
            console.error(error);
        }
    });
}
function report(rate, acuditActual) {
    let date = new Date().toISOString();
    let found = reportAcudits.find((item) => {
        return item.joke === acuditActual;
    });
    if (found) {
        found.score = rate;
    }
    else {
        reportAcudits.push({
            'joke': acuditActual,
            'score': rate,
            'date': date
        });
    }
    console.log(reportAcudits);
}
