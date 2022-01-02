var cityCardsData=undefined;
var cityData=undefined;

class Fetch{

    static async fetchCities(){
        const res = await fetch("https://countriesnow.space/api/v0.1/countries");
        if(res.status===200){
            const data = await res.json();
            return data;
        }else{
            console.log("Something went wrong! try again!");
            return false;
        }
    }

    static async fetchCityWeather(cityName){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=hr&APPID=d2c6f5a97dda2b6031a37bc036d96bc1`);
        if(res.status===200){
            const data = await res.json();
            return data;
        }else{
            console.log("Something went wrong! try again!");
            return false;
        }
    }

    static fetchCoordiantes() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(UI.showCurrentPosition);
        } else {
          let x = "Geolocation is not supported by this browser.";
          console.log(x);
        }
    }

    static async fetchLocationWithCoordiantes(lat,lon){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=d2c6f5a97dda2b6031a37bc036d96bc1`);
        if(res.status===200){
            const data = await res.json();
            return data;
        }else{
            console.log("Something went wrong! try again!");
            return false;
        }
    }
    
    static async fetchCityWeatherCards(lat,lon){
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=d2c6f5a97dda2b6031a37bc036d96bc1`);
        if(res.status===200){
            const data = await res.json();
            return data;
        }else{
            console.log("Something went wrong! try again!");
            return false;
        }
    }
      
}

class UI{

    static async displayCity(city){
        cityData=city;
        document.querySelector("#location-name").innerText=city.name + ", " + city.sys.country;
        
        let date = (new Date(city.dt*1000));
        document.querySelector("#location-date").innerText="Last update: " + date;
        

        let picture = document.querySelector("#location-icon");
        picture.setAttribute("src",`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`);
        
        let termometer = "<i class='fas fa-thermometer-full'></i>";
        if(city.main.temp>30){

        }else if(city.main.temp<30 && city.main.temp>=20){
            termometer = "<i class='fas fa-thermometer-three-quarters'></i>";
        }else if(city.main.temp<20 && city.main.temp>=10){
            termometer = "<i class='fas fa-thermometer-half'></i>";
        }else if(city.main.temp<10 && city.main.temp>=0){
            termometer = "<i class='fas fa-thermometer-quarter'></i>";
        }else{
            termometer = "<i class='fas fa-thermometer-empty'></i>";
        }

        document.querySelector("#location-temp").innerHTML=city.main.temp + "°C " + termometer;
        document.querySelector("#location-info").innerText="Feels like " + city.main.feels_like + "°C, " + city.weather[0].description + ".";

        document.querySelector("#location-wind").innerHTML="<i class='fas fa-wind'></i> " + city.wind.speed + " m/s";
        document.querySelector("#location-pressure").innerHTML="<i class='fab fa-cloudscale'></i> " + city.main.pressure + " hPa";
        document.querySelector("#location-clouds").innerHTML="<i class='fas fa-cloud'></i> " + city.clouds.all + " %";
        document.querySelector("#location-humidity").innerHTML="<i class='fas fa-tint'></i><i class='fas fa-thermometer'></i> " + city.main.humidity + " %";

        let cityCards = await Fetch.fetchCityWeatherCards(city.coord.lat,city.coord.lon);
        cityCardsData = cityCards;

        UI.displayCityCardsDaily(cityCards);
        UI.displayCityCarousel(cityCards);
    }

    static displayCityCardsDaily(cityCards){
        const daysForecast = 6
        let cards = document.querySelector("#location-cards-info");
        cards.innerHTML="";
            for(let i = 0;i<daysForecast;i++){
                let card = document.createElement("div");
                card.classList="card mt-2 mb-2 col-lg-2 col-md-4 col-sm-6 col-12 location-card-info card-border";
                card.setAttribute("id","location-card-info");

                let cardHeader = document.createElement("div");
                cardHeader.classList="card-header";
                cardHeader.setAttribute("id","location-card-head-info");

                let date = (new Date(cityCards.daily[i].dt*1000));
                var options = {month:'short', weekday: 'short',day:"numeric"};
                let dateTxt = (new Intl.DateTimeFormat('en-US', options).format(date));
                cardHeader.innerHTML="<h6 class='lead'>"+dateTxt+"</h6>";

                let cardBody = document.createElement("div");
                cardBody.classList="card-body";
                cardBody.setAttribute("id","location-card-body-info");


                let img = document.createElement("img");
                img.setAttribute("src",`http://openweathermap.org/img/wn/${cityCards.daily[i].weather[0].icon}@2x.png`);
                img.setAttribute("id","location-card-img-info");
                if(document.querySelector("#color-mode").classList.contains("btn-outline-primary")){
                    img.classList="weather-icon-teal-light";
                }else{
                    img.classList="img-outline";
                    card.classList="card mt-2 mb-2 col-lg-2 col-md-4 location-card-info card-border color-mode-text-background"
                }
                cardBody.appendChild(img);

                let  temperature = document.createElement("p");
                temperature.innerText=cityCards.daily[i].temp.max + " / " + cityCards.daily[i].temp.min + " °C";
                temperature.classList="font-weight-bold";
                let lineBreak = document.createElement("hr");
                cardBody.appendChild(lineBreak);
                cardBody.appendChild(temperature);

                let description = document.createElement("p");
                description.innerText = cityCards.daily[i].weather[0].description;
                description.classList="lead location-card-description";
                cardBody.appendChild(description);

                let button = document.createElement("button");
                button.innerHTML="<i class='fas fa-caret-left'> Info</i>";
                button.classList = "btn btn-outline-info weather-card-button";
                button.setAttribute("data-toggle","modal");
                button.setAttribute("data-target","#all-cities-modal");
                button.setAttribute("id","card-info");
                cardBody.appendChild(button);

                card.appendChild(cardHeader);
                card.appendChild(cardBody);
                cards.appendChild(card);
            }
        
    }

    static displayCityCarousel(cityDays){
        
        var options = {hour: 'numeric', minute: 'numeric'};

        let dateSunrise = (new Date(cityDays.current.sunrise*1000));
        let dateTxtSunrise = (new Intl.DateTimeFormat('en-US', options).format(dateSunrise));

        let dateSunset = (new Date(cityDays.current.sunset*1000));
        let dateTxtSunset = (new Intl.DateTimeFormat('en-US', options).format(dateSunset));
        
        console.log(cityDays)
        document.querySelector("#location-timezone").textContent="Timezone - " + cityDays.timezone;
        document.querySelector("#location-sunrise-sunset").textContent="Sunrise/Sunset (from your timezone) - " + dateTxtSunrise + "/" + dateTxtSunset;
        document.querySelector("#location-UV").textContent="UV - " + cityDays.current.uvi
    }

    static changeCardView(){
        /*THIS COULD BE A FUNCTION TOO - NEDA MI SE*/
        let change = document.querySelector("#location-switch-daily-hourly");
        if(change.checked){
            document.querySelector("#location-switch-daily-hourly-text").innerText="Change to daily mode";
            let container = document.querySelector("#location-cards-info");
            container.innerHTML="";
            for(let i = 0;i<3;i++){
                let accordionCont = document.createElement("div");
                accordionCont.setAttribute("id","location-accordion-hourly");
                accordionCont.classList="accordion col-md-4 pt-2 pb-2";

                for(let j = 0; j <8; j++){
                    let accordionItem = document.createElement("div");
                    accordionItem.classList="accordion-item";

                    let accordionHeader = document.createElement("h2");
                    accordionHeader.classList="accordion-header";
                    accordionHeader.setAttribute("id",`heading${i*8+j}`);

                    let accordionButton = document.createElement("button");
                    accordionButton.classList="accordion-button collapsed";
                    accordionButton.setAttribute("type","button");
                    accordionButton.setAttribute("data-bs-toggle","collapse");
                    accordionButton.setAttribute("data-bs-target",`#collapse${i*8+j}`);
                    accordionButton.setAttribute("aria-expanded","true");
                    accordionButton.setAttribute("aria-controls",`collapse${i*8+j}`);

                    let accordionImg = document.createElement("img");
                    accordionImg.setAttribute("src",`http://openweathermap.org/img/wn/${cityCardsData.hourly[i*8+j].weather[0].icon}@2x.png`);
                    accordionImg.classList="location-img-accordion small-img-size-accordion weather-icon-teal-light";

                    accordionButton.appendChild(accordionImg);

                    var options = {hour: 'numeric', minute: 'numeric',month:'short', weekday: 'short',day:"numeric"};

                    let hour = (new Date(cityCardsData.hourly[i*8+j].dt*1000));
                    let hourtxt = (new Intl.DateTimeFormat('en-US', options).format(hour));

                    accordionButton.innerHTML += " " + hourtxt;
                    
                    let accordionCollapse = document.createElement("div");
                    accordionCollapse.setAttribute("id",`collapse${i*8+j}`);
                    accordionCollapse.classList="accordion-collapse collapse";
                    accordionCollapse.setAttribute("aria-labelledby",`heading${i*8+j}`);
                    accordionCollapse.setAttribute("data-bs-parent","#location-accordion-hourly");

                    let accordionBody = document.createElement("div");
                    accordionBody.classList="accordion-body row";
                    
                    let temp = document.createElement("p");
                    temp.classList="col-12 lead text-start text-color-black";
                    temp.innerText="Temperature - "+ cityCardsData.hourly[i*8+j].temp + "°C";

                    let description = document.createElement("p");
                    description.classList="col-12 text-start text-dark";
                    description.innerHTML=cityCardsData.hourly[i*8+j].weather[0].description + " - <i class='fas fa-cloud'></i> " + cityCardsData.hourly[i*8+j].clouds + "%";

                    let uv = document.createElement("small");
                    uv.classList="col-3 text-start text-dark";
                    uv.innerText="UV " + cityCardsData.hourly[i*8+j].uvi;

                    let wind = document.createElement("small");
                    wind.classList="col-4 text-start text-dark";
                    wind.innerHTML="<i class='fas fa-wind'></i> " + cityCardsData.hourly[i*8+j].wind_speed + "m/s";

                    let filler = document.createElement("small");
                    filler.classList="col-5";

                    let pressure = document.createElement("small");
                    pressure.classList="col-3 text-start text-dark";
                    pressure.innerHTML="<i class='fab fa-cloudscale'></i> " + cityCardsData.hourly[i*8+j].pressure + "hPa";

                    let humidity = document.createElement("small");
                    humidity.classList="col-8 text-start text-dark";
                    humidity.innerHTML="<i class='fas fa-tint'></i><i class='fas fa-thermometer'></i> " + cityCardsData.hourly[i*8+j].humidity + "%";

                    accordionBody.appendChild(temp);
                    accordionBody.appendChild(description);
                    accordionBody.appendChild(uv);
                    accordionBody.appendChild(wind);
                    accordionBody.appendChild(filler);
                    accordionBody.appendChild(pressure);
                    accordionBody.appendChild(humidity)

                    accordionCollapse.appendChild(accordionBody);
                    accordionHeader.appendChild(accordionButton);
                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionCollapse);
                    accordionCont.appendChild(accordionItem);
                }
                container.appendChild(accordionCont);
            }

        }else{
            document.querySelector("#location-switch-daily-hourly-text").innerText="Change to hourly mode";
            UI.displayCityCardsDaily(cityCardsData);
        }
    }

    static expandAccordion(e){
        if(e.target.classList.contains("accordion-button") && e.target.classList.contains("collapsed")){
            e.target.classList.remove("collapsed");
            e.target.parentNode.parentNode.children[1].classList.add("show");
        }else if(e.target.classList.contains("accordion-button") && !e.target.classList.contains("collapsed")){
            e.target.classList.add("collapsed");
            e.target.parentNode.parentNode.children[1].classList.remove("show");
        }else if(e.target.classList.contains("location-img-accordion") && e.target.parentNode.classList.contains("collapsed")){
            e.target.parentNode.classList.remove("collapsed");
            e.target.parentNode.parentNode.parentNode.children[1].classList.add("show");
        }else if(e.target.classList.contains("location-img-accordion") && !e.target.parentNode.classList.contains("collapsed")){
            e.target.parentNode.classList.add("collapsed");
            e.target.parentNode.parentNode.parentNode.children[1].classList.remove("show");
        }
    }

    static showCard(e){
        let cardDate;
        if(e.target.classList.contains("fa-caret-left")){
            cardDate=e.target.parentNode.parentNode.parentNode.children[0].children[0].textContent.substring(0,3);
        }else{
            cardDate=e.target.parentNode.parentNode.children[0].children[0].textContent.substring(0,3);
        }
        
        for(let i = 0;i<cityCardsData.daily.length-1;i++){

            let date = (new Date(cityCardsData.daily[i].dt*1000));
            var options = {weekday: 'short'};
            var options2 = {month:'short', weekday: 'short',day:"numeric"};
            let dateTxt2 = (new Intl.DateTimeFormat('en-US', options2).format(date));
            let dateTxt = (new Intl.DateTimeFormat('en-US', options).format(date));

            if(dateTxt===cardDate){
                document.querySelector("#all-cities-modal-label").innerText=cityData.name + ", " + cityData.sys.country + " - " + dateTxt2;
                let modalDiv = document.querySelector("#all-cities-modal-body");
                modalDiv.innerHTML="";

                let img = document.createElement("img");
                img.setAttribute("src",`http://openweathermap.org/img/wn/${cityCardsData.daily[i].weather[0].icon}@2x.png`);
                if(document.querySelector("#color-mode").classList.contains("btn-outline-primary")){
                    img.classList="col-4 weather-icon-teal-modal medium-img-size-accordion";
                }else{
                    img.classList="col-4 img-outline-modal medium-img-size-accordion";
                }
                img.setAttribute("id","location-card-modal-img-info");
                

                let basicTemp = document.createElement("p");
                basicTemp.classList = "col-8 lead location-card-modal-description";
                basicTemp.innerHTML = "<b>Description: " +cityCardsData.daily[i].weather[0].description + "<br><b>The high will be " + cityCardsData.daily[i].temp.max  
                + "°C, the low will be " + cityCardsData.daily[i].temp.min + "°C";

                let clouds = document.createElement("p");
                clouds.classList = "col-3 parameters-modal";
                clouds.innerHTML = "<i class='fas fa-cloud'></i> " + cityCardsData.daily[i].clouds + "%";

                let wind = document.createElement("p");
                wind.classList = "col-4 parameters-modal";
                wind.innerHTML = "<i class='fas fa-wind'></i> " + cityCardsData.daily[i].wind_speed + "m/s";

                let pressure = document.createElement("p");
                pressure.classList = "col-5 parameters-modal";
                pressure.innerHTML = "<i class='fab fa-cloudscale'></i> " + cityCardsData.daily[i].pressure + "hPa";

                let humidity = document.createElement("p");
                humidity.classList = "col-3 parameters-modal";
                humidity.innerHTML = "<i class='fas fa-tint'></i><i class='fas fa-thermometer'></i> " + cityCardsData.daily[i].humidity + "%";

                let uv = document.createElement("p");
                uv.classList = "col-4 parameters-modal";
                uv.innerHTML = "UV - " + cityCardsData.daily[i].uvi;

                let dewPoint = document.createElement("p");
                dewPoint.classList = "col-5 parameters-modal";
                dewPoint.innerHTML = "Dew point - " + cityCardsData.daily[i].dew_point + "°C";

                let tempHead = document.createElement("p");
                tempHead.classList = "col-12 parameters-modal";
                tempHead.innerText = "Temperature - Morning  |  Day  |  Evening  |  Night";

                let temp = document.createElement("p");
                temp.classList = "col-12 parameters-modal lead text-info";
                temp.innerText = cityCardsData.daily[i].temp.morn + "°C | " + cityCardsData.daily[i].temp.day + "°C | " 
                + cityCardsData.daily[i].temp.eve + "°C | " + cityCardsData.daily[i].temp.night+ "°C";

                let feels = document.createElement("p");
                feels.classList = "col-12 parameters-modal";
                feels.innerText = "Feels like";

                let Ftemp = document.createElement("p");
                Ftemp.classList = "col-12 parameters-modal lead text-info";
                Ftemp.innerText = cityCardsData.daily[i].feels_like.morn + "°C | " + cityCardsData.daily[i].feels_like.day + "°C | " 
                + cityCardsData.daily[i].feels_like.eve + "°C | " + cityCardsData.daily[i].feels_like.night+ "°C";

                var options = {hour: 'numeric', minute: 'numeric'};

                let dateSunrise = (new Date(cityCardsData.daily[i].sunrise*1000));
                let dateTxtSunrise = (new Intl.DateTimeFormat('en-US', options).format(dateSunrise));

                let dateSunset = (new Date(cityCardsData.daily[i].sunset*1000));
                let dateTxtSunset = (new Intl.DateTimeFormat('en-US', options).format(dateSunset));

                let sunrise = document.createElement("p");
                sunrise.classList = "col-6 parameters-modal text-dark";
                sunrise.innerText = "Sunrise - " + dateTxtSunrise;

                let sunset = document.createElement("p");
                sunset.classList = "col-6 parameters-modal text-dark";
                sunset.innerText = "Sunset - " + dateTxtSunset;
                
                modalDiv.appendChild(img);
                modalDiv.appendChild(basicTemp);
                modalDiv.appendChild(clouds);
                modalDiv.appendChild(wind);
                modalDiv.appendChild(pressure);
                modalDiv.appendChild(humidity);
                modalDiv.appendChild(uv);
                modalDiv.appendChild(dewPoint);
                modalDiv.appendChild(tempHead);
                modalDiv.appendChild(temp);
                modalDiv.appendChild(feels);
                modalDiv.appendChild(Ftemp);
                modalDiv.appendChild(sunrise);
                modalDiv.appendChild(sunset);
            }
        } 
    }

    static async showCities(){
        let modalBody = document.querySelector("#all-cities-modal-body");
        modalBody.innerHTML ="";
        document.querySelector("#all-cities-modal-label").innerText="For Example";
        const countries = await Fetch.fetchCities();
        countries.data.forEach(i => {
            let country = document.createElement("h6");
            country.innerText=i.country;
            country.classList="country-bold"
            modalBody.appendChild(country);
            let citiesP = document.createElement("p");
            let hr = document.createElement("hr");
            modalBody.appendChild(hr);
    
            if(i.cities[0]===undefined){
                citiesP.innerText = "No Cities!"
            }else{
                for (let j = 0; j < 3; j++) {
                    if(i.cities[j]===undefined){
                        break;
                    }
                    citiesP.innerText+= i.cities[j] + ", "
                }
            }
            citiesP.innerText+="..."
            citiesP.classList="mb-5"
            modalBody.appendChild(citiesP);
        });
    }

    static async searchCity(e){
        e.preventDefault();
        let cityName = document.querySelector("#city").value;
        let city = await Fetch.fetchCityWeather(cityName);

        let input = document.querySelector("#city");
        input.value="";

        if(!city){
            input.classList.add("is-invalid");

            let invalidText = document.createElement("div");
            invalidText.classList="invalid-feedback";
            invalidText.innerText="Can't find city, please enter a city that exists!";

            insertAfter(invalidText,input);
            setTimeout(()=>{
                input.classList.remove("is-invalid");
                document.querySelector(".invalid-feedback").remove();
            },2000);
        }else{
            UI.displayCity(city);
        }
        
    }

    static async showCurrentPosition(position) {
        let x = "Latitude: " + position.coords.latitude +
        " Longitude: " + position.coords.longitude;
        console.log(x);
        const city = await Fetch.fetchLocationWithCoordiantes(position.coords.latitude,position.coords.longitude);
        UI.displayCity(city);
    }

    static colorMode(){
        let button = document.querySelector("#color-mode");
        if(button.classList.contains("btn-outline-primary")){
            button.classList="btn btn-outline-light btn-sm justify-content-end";
            document.getElementsByTagName("body")[0].style.backgroundColor="rgba(34,34,34)";

            document.querySelector("#container-upper").classList="container text-light";

            document.querySelector("#city").classList.add("color-mode-text-background");
            document.querySelector("#search").classList.add("btn-outline-teal");

            document.querySelector("#location-icon").classList="img-outline";

            document.querySelector(".modal-content").classList.add("modal-content-color-mode");

            //document.querySelector(".accordion").classList.add("accordion-bg-black");
            
            let cards = document.getElementsByClassName("location-card-info");
            for(let i = 0;i<cards.length;i++){
                cards[i].classList.add("color-mode-text-background");
                cards[i].children[1].children[0].classList="img-outline-card";
            }
            
            
            
        }else{
            button.classList="btn btn-outline-primary btn-sm justify-content-end";
            document.getElementsByTagName("body")[0].style.backgroundColor="#FFF";
            document.querySelector("#container-upper").classList="container text-primary";
            document.querySelector("#city").classList.remove("color-mode-text-background");
            document.querySelector("#search").classList.remove("btn-outline-teal");

            document.querySelector("#location-icon").classList="weather-icon-teal";
            document.querySelector(".modal-content").classList.remove("modal-content-color-mode");

            //document.querySelector(".accordion").classList.remove("accordion-bg-black");

            let cards = document.getElementsByClassName("location-card-info");
            for(let i = 0;i<cards.length;i++){
                cards[i].classList.remove("color-mode-text-background");
                cards[i].children[1].children[0].classList="weather-icon-teal-light";
            }
        }
    }
}

document.querySelector("#show-cities").addEventListener("click",UI.showCities);
document.querySelector("#search").addEventListener("click",UI.searchCity);
window.addEventListener("load",Fetch.fetchCoordiantes);
document.querySelector("#color-mode").addEventListener("click",UI.colorMode);
document.addEventListener('click',function(e){
    if(e.target.classList.contains("fa-caret-left") || e.target.classList.contains("weather-card-button")){
        UI.showCard(e);
    }
    if(e.target.classList.contains("accordion-button") || e.target.classList.contains("location-img-accordion")){
        UI.expandAccordion(e)
    }
});
document.querySelector("#location-switch-daily-hourly").addEventListener("click",UI.changeCardView);

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}