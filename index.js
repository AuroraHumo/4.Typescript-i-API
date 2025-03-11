"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
fetch('https://icanhazdadjoke.com/')
    .then(joke => console.log(joke));
