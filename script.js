
var today = moment().format("MMMM Do")
var tomorrow = moment().add(24, 'hours').format('ddd'); 
let dayTwo = moment().add(48, 'hours').format('ddd');
let dayThree = moment().add(72, 'hours').format('ddd');
let dayFour = moment().add(96, 'hours').format('ddd');
let dayFive = moment().add(120, 'hours').format('ddd');

var dateTomorrow = moment().add(24, 'hours').format('MMM DD'); 
let dateTwo = moment().add(48, 'hours').format('MMM DD');
let dateThree = moment().add(72, 'hours').format('MMM DD');
let dateFour = moment().add(96, 'hours').format('MMM DD');
let dateFive = moment().add(120, 'hours').format('MMM DD');

window.onload = function displayLastSearch() {
    if (localStorage.getItem('lastCity') === null) {
        var city = 'Atlanta'
        getCityWeather(city)
    }
    else {
        var city = localStorage.getItem('lastCity') 
        getCityWeather(city)
    }
}

document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        var city = document.getElementById('city').value
        var savedCities = document.getElementById('savedCities')
        getCityWeather(city)
        savedCities.insertAdjacentHTML("afterbegin", `<button type="button" class="button" cityName="${city}" onclick="pushCity(this)">${city}</button>`)
        localStorage.setItem('lastCity', city)
        document.getElementById('searchError').textContent = "Something Wrong!"
    })

    // When a saved city button is pressed, display weather for that city.
function pushCity(button) {
    var city = button.getAttribute('cityName')
    getCityWeather(city)
}

function getCityWeather (city) {
    var longlatURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=7af56b114fd40ebbd23046d4e0430be8`

    return fetch(longlatURL)
        .then(function (response) {
return response.json()
        })
        .then(function (longlatResults) {
            console.log(longlatResults)
            var lon = longlatResults.city.coord.lon
            var lat = longlatResults.city.coord.lat

            var weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=7af56b114fd40ebbd23046d4e0430be8`

            return fetch(weatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

        
        
            // Today's weather.
            document.getElementById('cityName').innerHTML = `
            ${city} <img src=""  alt=" weather icon.">`

            document.getElementById('date').innerHTML = `${today}`

            document.getElementById('currentTemp').innerHTML = `
            <text class="title">${Math.round(data.current.temp)} F</text>`

            document.getElementById('currentHumidity').innerHTML = `
            <text class="title">${data.current.humidity}%</text>`

            document.getElementById('currentWind').innerHTML = `
            <text class="title">${data.current.wind_speed}</text><text class="title">mph</text>`

            

            // 5 Day Forecast Cards
            //Tomorrow's weather
           document.getElementById('imgOne').innerHTML = `<img src="images" style=""  alt="weather icon">`

            document.getElementById('tomorrow').innerHTML = `<strong>${tomorrow}</strong>`

            document.getElementById('dateTomorrow').innerHTML = `<p>${dateTomorrow}</p>`

            document.getElementById('tomorrowTemp').innerHTML = ` MaxTemp : ${Math.round(data.daily[0].temp.max)} F  MinTemp :  ${Math.round(data.daily[0].temp.min)} F`

            document.getElementById('tomorrowHumidity').innerHTML = `H: ${data.daily[0].humidity}%`

            // Day 2's weather
           document.getElementById('imgTwo').innerHTML = `<img src="" alt=" weather icon">`

            document.getElementById('dayTwo').innerHTML = `<strong>${dayTwo}</strong>`

            document.getElementById('dateTwo').innerHTML = `<p>${dateTwo}</p>`

            document.getElementById('dayTwoTemp').innerHTML = `MaxTemp ${Math.round(data.daily[1].temp.max)} F  MinTemp ${Math.round(data.daily[1].temp.min)} F`

            document.getElementById('dayTwoHumidity').innerHTML = ` H: ${data.daily[1].humidity}%`

            // Day 3's weather
            document.getElementById('imgThree').innerHTML = `
            <img src=""  alt=" weather icon">`
            
            document.getElementById('dayThree').innerHTML = `<strong>${dayThree}</strong>`

            document.getElementById('dateThree').innerHTML = `<p>${dateThree}</p>`

            document.getElementById('dayThreeTemp').innerHTML = `MaxTemp ${Math.round(data.daily[2].temp.max)} F  MinTemp${Math.round(data.daily[2].temp.min)} F`

            document.getElementById('dayThreeHumidity').innerHTML = `H: ${data.daily[2].humidity}%`

            // Day 4's weather
            document.getElementById('imgFour').innerHTML = `
            <img src=""  alt=" weather icon">`

            document.getElementById('dayFour').innerHTML = `<strong>${dayFour}</strong>`

            document.getElementById('dateFour').innerHTML = `<p>${dateFour}</p>`

            document.getElementById('dayFourTemp').innerHTML = `MaxTemp ${Math.round(data.daily[3].temp.max)} F  MinTemp ${Math.round(data.daily[3].temp.min)} F`

            document.getElementById('dayFourHumidity').innerHTML = ` H: ${data.daily[3].humidity}%`

            // Day 5's weather
            document.getElementById('imgFive').innerHTML = `
            <img src="" alt=" weather icon.">`

            document.getElementById('dayFive').innerHTML = `<strong>${dayFive}</strong>`

            document.getElementById('dateFive').innerHTML = `<p>${dateFive}</p>`

            document.getElementById('dayFiveTemp').innerHTML = `MaxTemp ${Math.round(data.daily[4].temp.max)} F    MinTemp${Math.round(data.daily[4].temp.day)} F`

            document.getElementById('dayFiveHumidity').innerHTML = ` H: ${data.daily[4].humidity}%`
        })

    })
    
    
}