
let resultDiv = document.getElementById('result') as HTMLElement;
let button = document.getElementById('button') as HTMLButtonElement;

button.addEventListener('click', generarBroma)
window.addEventListener('DOMContentLoaded', generarBroma);

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
    } catch (error) {
        resultDiv.innerHTML ='Dad is not joking today:'
    }
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
