export {};

fetch('https://icanhazdadjoke.com/')
    .then(joke => console.log(joke))