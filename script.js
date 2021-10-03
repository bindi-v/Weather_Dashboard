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
        getWeather(city)
    }
    else {
        let city = localStorage.getItem('lastCity') 
        getWeather(city)
    }
}

document
    .getElementById('search')
    .addEventListener('click', function (event) {
        event.preventDefault()
        let city = document.getElementById('city').value
        let savedCities = document.getElementById('savedCities')
        getWeather(city)
        savedCities.insertAdjacentHTML("afterbegin", `<button type="button" class="button is-fullwidth mb-1" cityName="${city}" onclick="pushCity(this)">${city}</button>`)
        localStorage.setItem('lastCity', city)
        document.getElementById('searchError').textContent = ""
    })