import { jokeGenerator } from './apiRequests.js';
import { getWeather } from './apiRequests.js';
let button = document.getElementById('button');
button.addEventListener('click', jokeGenerator);
window.addEventListener('DOMContentLoaded', () => {
    jokeGenerator();
    getWeather();
});
