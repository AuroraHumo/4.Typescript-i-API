import { jokeGenerator } from "./apiRequests";
import { getWeather } from "./apiRequests";


(async () => {
	const joke = await jokeGenerator();
    let resultDiv = document.getElementById('result') as HTMLElement;

	if (joke.error) {
        resultDiv.innerHTML = '❌ Error fetching joke. Try again!';
        return;
    }
    resultDiv.innerHTML = joke.joke ?? 'No joke available.';

})();

(async () => {
    const weathertoday = await getWeather();
    let temperature = document.getElementById("temperature") as HTMLElement;
    let wind = document.getElementById("wind") as HTMLElement;
    let cloud_cover = document.getElementById("cloud_cover") as HTMLElement;

    if ('error' in weathertoday) {
        temperature.innerText = '❌ Error fetching weather data.';
        wind.innerText = '';
        cloud_cover.innerText = '';
        return;
    }

    temperature.innerText = ` BCN: ${weathertoday.temperature}°C `;
    wind.innerText = `-  ${weathertoday.windSpeed} km/h (${weathertoday.windDir}) `;
    cloud_cover.innerText = `-  Cloudyness: ${weathertoday.cloudCover}%`;
})();