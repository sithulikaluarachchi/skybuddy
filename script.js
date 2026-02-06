const input = document.querySelector('#cityInput');
const save = document.querySelector('.button');

const weatherIcon = document.querySelector('.weather-icon')
const temp = document.querySelector('.temperature');
const region = document.querySelector('.region');
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');


const weekday = document.querySelectorAll('.week-date');
const day = document.querySelectorAll('.day')
const img = document.querySelectorAll('.image')
const weeklytemp = document.querySelectorAll('.wtemp')

const API_KEY = "API_KEY";
let clockInterval = null;
let currentDateTime = null;

//input city
function cityInput() {
    if(input.value !== ''){
        localStorage.setItem('city', input.value.trim());
        console.log(localStorage.getItem('city'));
        getWeather();
    }
    else{
        console.log('Enter another city.')
    }

}

//key shortcut
function enterKeyInput(e){
    if(e.key === 'Enter'){
        cityInput();
    }
}

async function getWeather(){
    const city = localStorage.getItem('city'); 
    try {

        // Fetching data for the today forecast
        const currentRes =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=no`);
        const currentData = await currentRes.json();
        console.log(currentData);
        getTodayForecast(currentData);

        //Fetching data for the coming week forecast from tomorrow
        const forecastRes =  await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8&aqi=no&alerts=no`);
        const forecastData = await forecastRes.json();
        console.log(forecastData);
        getWeekForecast(forecastData)


        
    } catch (error) {
        
    }
}

function getTodayForecast(data){

    //Live card values

    //weather icon
    const icon = data.current.condition.icon;
    const imgUrl = `https:${icon}`;
    const altText = data.current.condition.text;
    weatherIcon.src = imgUrl;
    weatherIcon.alt = altText;

    //temperature
    const tempVal = data.current.temp_c;
    console.log(`temperature:- ${tempVal}`);
    temp.innerHTML = `<p id="temp">${tempVal} &#8451;</p>`;

    //region
    const area = `${data.location.name}/${data.location.country}`
    console.log(`region:- ${area}`);
    region.textContent = `${area}`;

    //time and date
    const localLtime = data.location.localtime;
    console.log(`time:- ${localLtime}`);
    clockTime(localLtime);


    // grid values

    //sunrise time
    const sunriseTime = data.forecast.forecastday[0].astro.sunrise;
    console.log(`sunrise time:- ${sunriseTime}`);
    sunrise.textContent = `${sunriseTime}`;

    //sunrset time
    const sunsetTime = data.forecast.forecastday[0].astro.sunset;
    console.log(`sunset time:- ${sunsetTime}`)
    sunset.textContent = `${sunsetTime}`;

    //humidity
    const humidityVal = data.current.humidity;
    console.log(`humidity:- ${humidityVal}`);
     humidity.textContent = `${humidityVal}`;

    //wind
    const windVal = data.current.wind_degree;
    console.log(`wind:- ${windVal}`);
    wind.textContent = `${windVal}`;


           
}

function getWeekForecast(data){
    console.log(data)

    //weekday names of the upcoming week from tomorrow
    weekday.forEach((weekdate , index) => {
        const date = data.forecast.forecastday[index + 1].date;
        const weekDate = new Date(`${date}T12:00:00`);
        console.log(` day ${index} ${weekdate}`);
        const currentWeekDay = weekDate.toLocaleDateString("en-US", {
            weekday: "short"
            });
        console.log(currentWeekDay);
        weekdate.textContent = currentWeekDay;
    });

    //dates of the upcoming week
    day.forEach((date , index) => {
        const predictDate =data.forecast.forecastday[index + 1].date;
        console.log(predictDate);
        date.textContent = predictDate;
    });

    //image icon of the weather of following week 
    img.forEach((img , index) => {
        const image = data.forecast.forecastday[index + 1].day.condition.icon;
        const imgUrl = `https:${image}`;
        const altText = data.forecast.forecastday[index + 1].day.condition.text;
        img.src = imgUrl;
        img.alt = altText;
    });

    //temperature value in ℃ of the following week
    weeklytemp.forEach((temp , index) => {
        const predicttemp = data.forecast.forecastday[index + 1].day.avgtemp_c;
        console.log(predicttemp);
        temp.innerHTML = `<p id="weektemp">${predicttemp} &#8451;</p>`;
    })

    
}

//clock time runs
function clockTime(apiTime){
    if(clockInterval){
        clearInterval(clockInterval);
    }

    currentDateTime = new Date(apiTime.replace(" ","T"));
    updateui();

    clockInterval = setInterval(() => {
        currentDateTime.setSeconds(currentDateTime.getSeconds() +1);
        updateui();
    }, 1000);
}

//updating the ui time
function updateui(){
    const currentTime = currentDateTime.toLocaleTimeString("en-US",{
         hour: "2-digit",
         minute: "2-digit",
         second: "2-digit"
    });

    const currentDate = currentDateTime.toISOString().split("T")[0];

    const currentWeekDay = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long"
    });


    time.textContent = currentTime;
    date.innerHTML = `<p class="date">${currentDate}<span class="weekday"> ${currentWeekDay}</span></p>`;
}

save.addEventListener('click',cityInput);
getWeather();

window.addEventListener('keydown',enterKeyInput);

feather.replace();
