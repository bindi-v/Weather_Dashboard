function getInfo(){
    var newName = document.getElementById("cityInput");
    var cityName =document.getElementById("cityName");
    cityName.innerHTML =  newName.value; 


fetch("http://api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=7e44ab7dc38056f61c9d41fc361df519")
.then((response ) => response.json())
.then((data) => {
    for(i = 0; i < 5; i++) {
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min:" + number(data.list[i].main.temp_min -292.79).toFixed(1)+"d";
    }
    for(i = 0; i < 5; i++) {
    document.getElementById("day" +(i+1)+ "Max").innerHTML = "Max:" + number(data.list[i].main.temp_max -292.79).toFixed(1)+"d";
    }

    for(i = 0; i < 5; i++) {
        document.getElementById("img" +(i+1)).scr="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
    
    }
})
.catch(err => alert("Something Wrong!"))
}

window.onload = function dafaultScreen() {
    document.getElementById("cityInput").defaultValue = "Atlanta";
    getInfo();
}

var date = newDate();
{
    var today = moment().format("MMMM Do");
}
var weekday = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function checkDay(day){
    if(day + date.getDay() > 6) {
        return day + date.getDay() - 7;
    } else {
        return day + date.getDay();
    }
}
for(i=0; i<5; i++) {
    document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)];
}
