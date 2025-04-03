
let report1 = document.getElementById('report1') as HTMLButtonElement;
let report2 = document.getElementById('report2') as HTMLButtonElement;        
let report3 = document.getElementById('report3') as HTMLButtonElement;

function report(rate: number, actualJoke: string) {

    report1.addEventListener('click', function() {
    report(1, actualJoke);
    });
    report2.addEventListener('click', function() {
        report(2, actualJoke);
    });
    report3.addEventListener('click', function() {
        report(3, actualJoke);
    });

    let reportJokes: { joke: string; score: number; date: string }[] = [];

    let date = new Date().toISOString();

    let found = reportJokes.find((item) => {
        return item.joke === actualJoke;
    });

    if (found) {
        found.score = rate;
    } else {
        reportJokes.push({
            joke: actualJoke,
            score: rate,
            date: date
        });
    }

    return reportJokes;
}