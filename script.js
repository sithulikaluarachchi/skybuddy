const temper =  [10 , 15 , 30 , 20 , 17 , 40 , 25];
const sunriseTime = '06.30';
const sunsetTime = '05.30';
const humidityVal = 39;
const windVal = 100;
const todayTemperature = 25;
const locationVal = 'New York, America'


const weekyTemperature = document.querySelectorAll('.temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const date = document.querySelector('.date');
const time = document.querySelector('.time')
const temperature = document.querySelector('.temperature');
const city = document.querySelector('.city');



// weekly prediction DOM manipulation
weekyTemperature.forEach((day , index) => {
        day.innerHTML = `<p class="temp">${temper[index]} &#8451;</p>`;
})

//sunrise DOM manipulation
sunrise.textContent = `${sunriseTime} a.m`;

//sunset DOM manipulation
sunset.textContent = `${sunsetTime} p.m`;

//humidity DOM manipulation
humidity.textContent = `${humidityVal}%`;

//wind DOM manipulation
wind.textContent = `${windVal}%`;

//current Temperature DOM manipulation
temperature.innerHTML = `<p class="temperature">${todayTemperature} &#8451;</p>`

//current location DOM manipulation 
city.textContent = `${locationVal}`;

//Date time DOM manipulation
function getCurrentDate (){
    // --------------- Date -------------------------
const dateVal = new Date();

const dateOptions = {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};
const dateFormat = new Intl.DateTimeFormat('en-CA', dateOptions).format(dateVal);

const weekOptions = {
    timeZone: 'America/New_York',
    weekday: 'long'
};

const weekDayFormat = new Intl.DateTimeFormat('en-CA', weekOptions).format(dateVal);

//Date DOM manipulation
date.textContent = `${dateFormat} ${weekDayFormat}`;


 // --------------- Time -------------------------
const timeOptions = {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
};

const timeFormat = new Intl.DateTimeFormat('en-US', timeOptions).format(dateVal);

//Time DOM manipulation
time.textContent = `${timeFormat}`;

}


getCurrentDate();

