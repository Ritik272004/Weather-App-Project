// For API go to openweathermap.org site
const apiKey = "3e2893ec706b0faf0dcd5f26a17904ee";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

const btn = document.querySelector(".search button");
const inp = document.querySelector(".search input");
const img = document.querySelector(".weather-icon");

btn.addEventListener("click", async ()=>{
    let data = await checkWeather(inp.value);
    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if(data.weather[0].main == "Clouds"){
        img.setAttribute("src","images/clouds.png");
    }
    else if(data.weather[0].main == "Clear"){
        img.setAttribute("src","images/clear.png");
    }
    else if(data.weather[0].main == "Rain"){
        img.setAttribute("src","images/rain.png");
    }
    else if(data.weather[0].main == "Drizzle"){
        img.setAttribute("src","images/drizzle.png");
    }
    else if(data.weather[0].main == "Mist"){
        img.setAttribute("src","images/mist.png");
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
})



async function checkWeather(city){
    try{
        const response = await fetch(apiUrl+city+`&appid=${apiKey}`);
        if(response.status == 404){
            document.querySelector(".error").style.display= "block";
            document.querySelector(".weather").style.display="none";
        }
        else{
            return response.json();
        }
    }
    catch(e){
        console.log("Error: ",e);
    }
}
