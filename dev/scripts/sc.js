function getWeather(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=62f9557ec5538f764b5db71ca76f9a13&units=metric`)
        .then(data => data.json())
        .then(data => {
            const weather = data.list[0];
            return {
                city: data.city.name,
                date: Date(weather.dt),
                temperature: weather.main.temp,
                humidity: weather.main.humidity,
                pressure: weather.main.pressure,
                wind: weather.wind.speed,
            };
        })
        .catch(reason => {
            return null;
        })
}

function update() {
    getWeather(document.getElementById('input').value)
        .then(context => {
            var source;
            if (context == null)
                source = document.getElementById('error').innerHTML;
            else
                source = document.getElementById('city').innerHTML;
            const template = Handlebars.compile(source);
            document.getElementById('result').innerHTML = template(context);
        })
}