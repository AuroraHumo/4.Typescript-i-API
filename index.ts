let resultDiv = document.getElementById('result') as HTMLElement;
let button = document.getElementById('button') as HTMLButtonElement;
let report1 = document.getElementById('report1') as HTMLButtonElement;
let report2 = document.getElementById('report2') as HTMLButtonElement;        
let report3 = document.getElementById('report3') as HTMLButtonElement;

let acuditActual: string;
let reportAcudits: { joke: string; score: number; date: string; }[] = []

let temperature = document.getElementById("temperature") as HTMLElement;
let wind = document.getElementById("wind") as HTMLElement;
let cloud_cover = document.getElementById("cloud_cover") as HTMLElement;

const API_NINJAS_KEY = 'ZD0Du+VPhzXbg3gWaAGo6A==bz9YNUdjll0ezWkZ';

button.addEventListener('click', generarBroma)
window.addEventListener('DOMContentLoaded', () => {
    generarBroma();
    getWeather();
});

report1.addEventListener('click', function() {
    report(1, acuditActual)});
report2.addEventListener('click', function() {
    report(2, acuditActual)});
report3.addEventListener('click', function() {
    report(3, acuditActual)});

const url = 'https://www.meteosource.com/api/v1/free/point?lat=41.38879&lon=2.15899&sections=current&timezone=auto&language=en&units=metric&key=e1pppqt2rqwmkh0usnqcj7rj9d9zy1mt6xy40uob';

    async function getWeather() {
        try {
            const resposta = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });
            
            if (!resposta.ok) {
                if (resposta.status === 404) {
                    throw new Error('⚠️ Weather data not found (404)');
                } else if (resposta.status === 500) {
                    throw new Error('⚠️ Weather API server error (500)');
                } else {
                    throw new Error(`⚠️ Unexpected error: ${resposta.status}`);
                }
            }
    
            const dades = await resposta.json();
    
            temperature.innerText = ` BCN: ${dades.current.temperature}°C `;
            wind.innerText = `-  ${dades.current.wind.speed} km/h (${dades.current.wind.dir}) `;
            cloud_cover.innerText = `-  Cloudyness: ${dades.current.cloud_cover}%`;
        } catch (error) {
            temperature.innerText = "❌ Weather unavailable";
            wind.innerText = "";
            cloud_cover.innerText = "";
            console.error("No s'ha pogut obtenir la informació:", error);
        }
    }

function getRandomJokeAPI(): string {
    const apis = [
        'https://icanhazdadjoke.com/',
        'https://api.api-ninjas.com/v1/jokes'

    ];
    return apis[Math.floor(Math.random() * apis.length)];
}

async function generarBroma() {
    try {
        const apiURL = getRandomJokeAPI();
        const headers: HeadersInit = { 'Accept': 'application/json' };

        if (apiURL.includes('api-ninjas.com')) {
            headers['X-Api-Key'] = API_NINJAS_KEY;
        }

        const resposta = await fetch(apiURL, { headers });

        if (!resposta.ok) {
            if (resposta.status === 404) {
                throw new Error('⚠️ Joke not found (404)');
            } else if (resposta.status === 500) {
                throw new Error('⚠️ Server error (500)');
            } else {
                throw new Error(`⚠️ Unexpected error: ${resposta.status}`);
            }
        }

        const json = await resposta.json();
        
        let joke = '';
        if (apiURL.includes('icanhazdadjoke') && json.joke) {
            joke = json.joke;
        } else if (apiURL.includes('api-ninjas.com') && json[0].joke && json[0].joke.length > 0) {
            joke = json[0].joke;
        } else {
            throw new Error("⚠️ Invalid joke format received from API");
        }

        resultDiv.innerHTML = joke;
        acuditActual = joke;

    } catch (error) {
        resultDiv.innerHTML = '❌ Error fetching joke. Try again!';
        console.error(error);
    }
}

function report(rate: number, acuditActual: string) {
    
    let date = new Date().toISOString()

    let found = reportAcudits.find((item) => {
        return item.joke === acuditActual;
    });

    if (found) {
        found.score = rate;
    } else {
        reportAcudits.push({
            'joke': acuditActual,
            'score': rate,        
            'date': date
        })
    }
    console.log(reportAcudits)
}