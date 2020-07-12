window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let tempDegree = document.querySelector('.temperature-degree');
    let location = document.querySelector('.location-timezone');
    let tempSection = document.querySelector('.temperature');
    let tempSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ebbba3c34b305988df247c86684ecc0f`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                tempDegree.textContent = (data.main.temp - 273, 15).toFixed(1);
                tempDescription.textContent = data.weather[0].description;
                location.textContent = data.name;
                
                setIcons(data.weather[0].main, document.querySelector('.icon'));

                // Change temperature to Celsius/Farenheit

                tempSection.addEventListener('click', () => {
                    if(tempSpan.textContent === "F"){
                        tempSpan.textContent = "°C";
                        tempDegree.textContent = Number(tempDegree.textContent) - 32;
                    } else {
                        tempSpan.textContent = "F";
                        tempDegree.textContent = Number(tempDegree.textContent) + 32;
                    }
                });

            });
        });
    } else {
        h1.textContent = "To start this application you need enable GPS location in your browser. Please google how."
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/ /g, "_").toUpperCase();
        console.log(currentIcon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});