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
button.addEventListener('click', generarBroma);
window.addEventListener('DOMContentLoaded', generarBroma);
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
        }
        catch (error) {
            resultDiv.innerHTML = 'Dad is not joking today:';
        }
    });
}
/* USANDO .THEN()
    fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
    })
        .then(response => response.json())
        .then(json => resultDiv.innerHTML = json.joke)
        .catch(error => (resultDiv.innerHTML ='Dad is not joking today:', error))
}
 */
