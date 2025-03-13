
let resultDiv = document.getElementById('result') as HTMLElement;
let button = document.getElementById('button') as HTMLButtonElement;
let report1 = document.getElementById('report1') as HTMLButtonElement;
let report2 = document.getElementById('report2') as HTMLButtonElement;        
let report3 = document.getElementById('report3') as HTMLButtonElement;
let acuditActual: string;
let reportAcudits: { joke: string; score: number; date: string; }[] = []

button.addEventListener('click', generarBroma)
window.addEventListener('DOMContentLoaded', generarBroma);
report1.addEventListener('click', function() {
    report('1', acuditActual)});
report2.addEventListener('click', function() {
    report('2', acuditActual)});
report3.addEventListener('click', function() {
    report('3', acuditActual)});

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
    
    let report = {
        'joke': acuditActual,
        'score': parseInt(rate),        
        'date': date
    }
    /* if(reportAcudits[reportAcudits.length - 1] === ){
        reportAcudits.pop()
    } */
    reportAcudits.push(report)
    console.log(reportAcudits)
}
