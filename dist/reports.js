"use strict";
let report1 = document.getElementById('report1');
let report2 = document.getElementById('report2');
let report3 = document.getElementById('report3');
function report(rate, actualJoke) {
    report1.addEventListener('click', function () {
        report(1, actualJoke);
    });
    report2.addEventListener('click', function () {
        report(2, actualJoke);
    });
    report3.addEventListener('click', function () {
        report(3, actualJoke);
    });
    let reportJokes = [];
    let date = new Date().toISOString();
    let found = reportJokes.find((item) => {
        return item.joke === actualJoke;
    });
    if (found) {
        found.score = rate;
    }
    else {
        reportJokes.push({
            joke: actualJoke,
            score: rate,
            date: date
        });
    }
    return reportJokes;
}
