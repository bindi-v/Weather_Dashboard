function getInfo(city, weather, timezone){
    var date = dayjs().tz(timezone).format("M/D/YYYY")
    var newName = document.getElementById("cityInput");
    var cityName =document.getElementById("cityName");
    cityName.innerHTML =  newName.value; 

var temp = weather.temp;
var maxTemp;
var weatherIcon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`

document.createElement('img')

fetch("http://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=7e44ab7dc38056f61c9d41fc361df519")
.then((response ) => response.json())
.then((data) => {
    for(var i = 0; i < 5; i++) {
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min:" + number(data.list[i].main.temp_min -292.79).toFixed(1)+"d";
    }
    for(var i = 0; i < 5; i++) {
    document.getElementById("day" +(i+1)+ "Max").innerHTML = "Max:" + number(data.list[i].main.temp_max -292.79).toFixed(1)+"d";
    }

    for(var i = 0; i < 5; i++) {
        document.getElementById("img" +(i+1)).scr="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
    
    }
})
.catch(err => alert("Something Wrong!"))
}

   window.onload = function dafaultScreen() {
    document.getElementById("cityInput").defaultValue = "Atlanta";
    getInfo();
}

var d = new Date();

var weekday = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function checkDay(day){
    if(day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}
for(var i=0; i<5; i++) {
    document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)];
}
