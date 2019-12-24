function getWeather() {

    var enteredCity = document.getElementById('userCity').value;

    var xhr = new XMLHttpRequest();
    var serchlink = 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCity + '&appid=62f9557ec5538f764b5db71ca76f9a13';
    xhr.open('GET', serchlink, false);
    xhr.send();

    if (xhr.status !== 200) {
        var pagefnerror = doT.template(document.getElementById('errortmpl').text, undefined);
        var error = {}
        if (xhr.status == 404) {
            error = {
                text: xhr.statusText,
                picurl: "https://linux-notes.org/wp-content/uploads/2015/11/Nastrojka-oshibki-404-v-.htaccess-.png",
                code: xhr.status
            }
        } else {
            error = {
                text: xhr.statusText,
                picurl: "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png",
                code: xhr.status

            }
        }

        document.getElementById('content').innerHTML = pagefnerror(error);

    } else {
        var response = JSON.parse(xhr.responseText);
        var data = {
            city: response.name,
            temp: (response.main.temp - 273.15).toFixed(2),
            windSpeed: response.wind.speed,
            sky: response.weather[0].description,
            pressure: response.main.pressure,
            humidity: response.main.humidity,
        }

        var pagefn = doT.template(document.getElementById('pagetmpl').text, undefined);
        document.getElementById('content').innerHTML = pagefn(data);

    }


}