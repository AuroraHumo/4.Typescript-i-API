let resultDiv = document.getElementById('result') as HTMLElement;
let button = document.getElementById('button') as HTMLButtonElement;
let report1 = document.getElementById('report1') as HTMLButtonElement;
let report2 = document.getElementById('report2') as HTMLButtonElement;        
let report3 = document.getElementById('report3') as HTMLButtonElement;

let acuditActual: string;
let reportAcudits: { joke: string; score: number; date: string; }[] = []

let summary = document.getElementById("summary") as HTMLElement;
let temperature = document.getElementById("temperature") as HTMLElement;
let wind = document.getElementById("wind") as HTMLElement;
let cloud_cover = document.getElementById("cloud_cover") as HTMLElement;

button.addEventListener('click', generarBroma)
window.addEventListener('DOMContentLoaded', generarBroma);
window.addEventListener('DOMContentLoaded', getWeather);

report1.addEventListener('click', function() {
    report('1', acuditActual)});
report2.addEventListener('click', function() {
    report('2', acuditActual)});
report3.addEventListener('click', function() {
    report('3', acuditActual)});

const url = 'https://www.meteosource.com/api/v1/free/point?lat=41.38879&lon=2.15899&sections=current&timezone=auto&language=en&units=metric&key=e1pppqt2rqwmkh0usnqcj7rj9d9zy1mt6xy40uob';

async function getWeather() {
    try {
        const resposta = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!resposta.ok) {
            throw new Error(`Error: ${resposta.status}`);
        }

        const dades = await resposta.json();

        summary.innerText = dades.current.summary;
        temperature.innerText = `${dades.current.temperature}°C`;
        wind.innerText = `🌬️ ${dades.current.wind.speed} km/h (${dades.current.wind.dir})`;
        cloud_cover.innerText = `☁️ Cloudyness: ${dades.current.cloud_cover}%`;

    } catch (error) {
        console.error("No s'ha pogut obtenir la informació:", error);
    }
}

async function generarBroma() {
    try {
        const respuesta = await fetch ('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' }
        })
        if (!respuesta.ok) {
            throw new Error (`Something went wrong:' ${respuesta.status}`)
        }
        const json = await respuesta.json()
        resultDiv.innerHTML = json.joke
        acuditActual = json.joke
        return acuditActual

    } catch (error) {
        resultDiv.innerHTML ='Dad is not joking today:'
    }
}

function report(rate: string, acuditActual: string) {
    
    let date = new Date().toISOString()
    let score = parseInt(rate)

    let found = reportAcudits.find((item) => {
        return item.joke === acuditActual;
    });

    if (found) {
        found.score = score;
    } else {
        reportAcudits.push({
            'joke': acuditActual,
            'score': score,        
            'date': date
        })
    }
    console.log(reportAcudits)
}