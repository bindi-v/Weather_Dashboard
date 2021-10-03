// function getInfo(){
//     //var date = dayjs().tz(timezone).format("M/D/YYYY")
//     var newName = document.getElementById("cityInput");
//     var cityName =document.getElementById("cityName");
//     cityName.innerHTML =  newName.value; 
// var submitBtn = document.querySelector("#btn");

// submitBtn.addEventListener("click", function(event){
//     searchCityInput = newName.value;
//     callWeatherCity(searchCityInput);
//     newName.value = "";
//    // weatherCity(searchCityInput);
// });
    
// //document.querySelector("#cityName").value
// //var temp = weather.temp;
// //var maxTemp;
// //var weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

// //document.createElement('img');
// function callWeatherCity(searchCityInput) {
// fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCityInput + "&units=imperial&appid=7e44ab7dc38056f61c9d41fc361df519")
// .then((response ) => response.json())
// .then(function(data)  {
//     console.lod(data);
//     // (var i = 0; i < 5; i++) {
//     //     document.getElementById("day" + (i+1) + "Min").innerHTML = "Min:" + number(data.list[i].main.temp_min -292.79).toFixed(1)+"d";
//     //     }
//     //         }
//     //         }
//     // for(var i = 0; i < 5; i++) {
//     // dforocument.getElementById("day" +(i+1)+ "Max").innerHTML = "Max:" + number(data.list[i].main.temp_max -292.79).toFixed(1)+"d";
//     // }

//     // for(var i = 0; i < 5; i++) {
//     //     document.getElementById("img" +(i+1)).scr="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
    
//     // }

//     cityName = data.name;
//     tempIcon = data.weather[0].icon;
//     cityminTemp = data.main.temp_min;
// })
// .catch(err => alert("Something Wrong!"))
// }
// }
//    window.onload = function dafaultScreen() {
//     document.getElementById("cityInput").defaultValue = "Atlanta";
//     getInfo();
// }

// var d = new Date();

// var weekday = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// function checkDay(day){
//     if(day + d.getDay() > 6) {
//         return day + d.getDay() - 7;
//     } else {
//         return day + d.getDay();
//     }
// }
// for(var i=0; i<5; i++) {
//     document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)];
// }
let today = moment().format("MMMM Do")
let tomorrow = moment().add(24, 'hours').format('ddd'); 
let dayTwo = moment().add(48, 'hours').format('ddd');
let dayThree = moment().add(72, 'hours').format('ddd');
let dayFour = moment().add(96, 'hours').format('ddd');
let dayFive = moment().add(120, 'hours').format('ddd');

let dateTomorrow = moment().add(24, 'hours').format('MMM DD'); 
let dateTwo = moment().add(48, 'hours').format('MMM DD');
let dateThree = moment().add(72, 'hours').format('MMM DD');
let dateFour = moment().add(96, 'hours').format('MMM DD');
let dateFive = moment().add(120, 'hours').format('MMM DD');

window.onload = function displayLastSearch() {
    if (localStorage.getItem('lastCity') === null) {
        let city = 'Atlanta'
        getCityWeather(city)
    }
    else {
        let city = localStorage.getItem('lastCity') 
        getCityWeather(city)
    }
}

document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        let city = document.getElementById('city').value
        let savedCities = document.getElementById('savedCities')
        getCityWeather(city)
        savedCities.insertAdjacentHTML("afterbegin", `<button type="button" class="button is-fullwidth mb-1" cityName="${city}" onclick="pushCity(this)">${city}</button>`)
        localStorage.setItem('lastCity', city)
        document.getElementById('searchError').textContent = "Something Wrong!"
    })

    // When a saved city button is pressed, display weather for that city.
function pushCity(button) {
    let city = button.getAttribute('cityName')
    getCityWeather(city)
}

function getCityWeather (city) {
    let longlatURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&cnt=1&appid=7e44ab7dc38056f61c9d41fc361df519`

    return fetch(longlatURL)
        .then(function (response) {
return response.json()
        })
        .then(function (longlatResults) {
            console.log(longlatResults)
            let lon = longlatResults.city.coord.lon
            let lat = longlatResults.city.coord.lat

            let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=7e44ab7dc38056f61c9d41fc361df519`

            return fetch(weatherURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

        //cityName = data.name;
        //cityMinTemp = data.main.temp_min;
       // cityMaxTemp = data.main.temp_max;
       // tempIcon = data.weather[0].icon;
        //cityWind = data.wind.speed;
        //cityHumidity = data.main.humidity;
        
            // Today's weather.
            document.getElementById('cityName').innerHTML = `
            ${city} <img src="images/${data.current.weather[0].icon}.svg" style="width:50px;height50px;" class="has-image-centered" alt="${data.current.weather[0].description} weather icon.">`

            document.getElementById('date').innerHTML = `${today}`

            document.getElementById('currentTemp').innerHTML = `
            <text class="title is-0">${Math.round(data.current.temp)} F</text>`

            document.getElementById('currentHumidity').innerHTML = `
            <text class="title is-0">${data.current.humidity}%</text>`

            document.getElementById('currentWind').innerHTML = `
            <text class="title is-0">${data.current.wind_speed}</text><text class="title is-3">mph</text>`

            

            // 5 Day Forecast Cards
            //Tomorrow's weather
            document.getElementById('imgOne').innerHTML = `
            <img src="images/${data.daily[0].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${data.daily[0].weather[0].description} weather icon.">`

            document.getElementById('tomorrow').innerHTML = `<strong>${tomorrow}</strong>`

            document.getElementById('dateTomorrow').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateTomorrow}</p>`

            document.getElementById('tomorrowTemp').innerHTML = `Max Temp :
            ${Math.round(data.daily[0].temp.max)}  Min Temp : ${Math.round(data.daily[0].temp.min)} F`

            document.getElementById('tomorrowHumidity').innerHTML = `
            H: ${data.daily[0].humidity}%`

            // Day 2's weather
            document.getElementById('imgTwo').innerHTML = `
            <img src="images/${weatherResults.daily[1].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[1].weather[0].description} weather icon.">`

            document.getElementById('dayTwo').innerHTML = `<strong>${dayTwo}</strong>`

            document.getElementById('dateTwo').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateTwo}</p>`

            document.getElementById('dayTwoTemp').innerHTML = `
            ${Math.round(weatherResults.daily[1].temp.max)} / ${Math.round(weatherResults.daily[1].temp.min)} F`

            document.getElementById('dayTwoHumidity').innerHTML = `
            H: ${weatherResults.daily[1].humidity}%`

            // Day 3's weather
            document.getElementById('imgThree').innerHTML = `
            <img src="images/${weatherResults.daily[2].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[2].weather[0].description} weather icon.">`
            
            document.getElementById('dayThree').innerHTML = `<strong>${dayThree}</strong>`

            document.getElementById('dateThree').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateThree}</p>`

            document.getElementById('dayThreeTemp').innerHTML = `
            ${Math.round(weatherResults.daily[2].temp.max)} / ${Math.round(weatherResults.daily[2].temp.min)} F`

            document.getElementById('dayThreeHumidity').innerHTML = `
            H: ${weatherResults.daily[2].humidity}%`

            // Day 4's weather
            document.getElementById('imgFour').innerHTML = `
            <img src="images/${weatherResults.daily[3].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[3].weather[0].description} weather icon.">`

            document.getElementById('dayFour').innerHTML = `<strong>${dayFour}</strong>`

            document.getElementById('dateFour').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateFour}</p>`

            document.getElementById('dayFourTemp').innerHTML = `
            ${Math.round(weatherResults.daily[3].temp.max)} / ${Math.round(weatherResults.daily[3].temp.min)} F`

            document.getElementById('dayFourHumidity').innerHTML = `
            H: ${weatherResults.daily[3].humidity}%`

            // Day 5's weather
            document.getElementById('imgFive').innerHTML = `
            <img src="images/${weatherResults.daily[4].weather[0].icon}.svg" style="width:50px;height50px;" class="pt-2 pb-2" alt="${weatherResults.daily[4].weather[0].description} weather icon.">`

            document.getElementById('dayFive').innerHTML = `<strong>${dayFive}</strong>`

            document.getElementById('dateFive').innerHTML = `<p class="has-text-grey has-text-centered mb-1">${dateFive}</p>`

            document.getElementById('dayFiveTemp').innerHTML = `
            ${Math.round(weatherResults.daily[4].temp.max)} / ${Math.round(weatherResults.daily[4].temp.day)} F`

            document.getElementById('dayFiveHumidity').innerHTML = `
            H: ${weatherResults.daily[4].humidity}%`
        })

    })
    
    
}