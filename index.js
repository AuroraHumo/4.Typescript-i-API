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
button.addEventListener('click', generarBroma);
window.addEventListener('DOMContentLoaded', generarBroma);
report1.addEventListener('click', function () {
    report('1', acuditActual);
});
report2.addEventListener('click', function () {
    report('2', acuditActual);
});
report3.addEventListener('click', function () {
    report('3', acuditActual);
});
function generarBroma() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const respuesta = yield fetch('https://icanhazdadjoke.com/', {
                headers: { 'Accept': 'application/json' }
            });
            if (!respuesta.ok) {
                throw new Error(`Something went wrong:' ${respuesta.status}`);
            }
            const json = yield respuesta.json();
            resultDiv.innerHTML = json.joke;
            acuditActual = json.joke;
            return acuditActual;
        }
        catch (error) {
            resultDiv.innerHTML = 'Dad is not joking today:';
        }
    });
}
function report(rate, acuditActual) {
    let date = new Date().toISOString();
    let score = parseInt(rate);
    let found = reportAcudits.find((item) => {
        return item.joke === acuditActual;
    });
    if (found) {
        found.score = score;
    }
    else {
        reportAcudits.push({
            'joke': acuditActual,
            'score': score,
            'date': date
        });
    }
    console.log(reportAcudits);
}
