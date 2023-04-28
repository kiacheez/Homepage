const API_KEY ="f853a1379fb487f2ced99b62674560e4"


function onGeoSucess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("You live in ", lat, lng);

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metrix`;
    fetch(url)
    .then((response)=> response.json())
    .then((data) =>{
        const weather = document.querySelector("#weather span:last-child") 
        const city = document.querySelector("#weather span:first-child")
        city.innerText = data.name;
        weather.innerText = data.weather[0].main;
        });
}

function OnGeoError(){
    alert("Can't find you man");
}

navigator.geolocation.getCurrentPosition(onGeoSucess, OnGeoError);